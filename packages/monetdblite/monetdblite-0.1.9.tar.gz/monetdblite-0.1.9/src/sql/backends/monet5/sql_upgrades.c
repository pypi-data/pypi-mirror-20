/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0.  If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright 1997 - July 2008 CWI, August 2008 - 2017 MonetDB B.V.
 */

/*
 * SQL upgrade code
 * N. Nes, M.L. Kersten, S. Mullender
 */
#include "monetdb_config.h"
#include "mal_backend.h"
#include "sql_scenario.h"
#include "sql_mvc.h"
#include <mtime.h>
#include <unistd.h>
#include "sql_upgrades.h"

#ifdef HAVE_EMBEDDED
#define printf(fmt,...) ((void) 0)
#endif

static str
sql_update_epoch(Client c, mvc *m)
{
	size_t bufsize = 1000, pos = 0;
	char *buf = GDKmalloc(bufsize), *err = NULL;
	char *schema = stack_get_string(m, "current_schema");
	sql_subtype tp;
	int n = 0;
	sql_schema *s = mvc_bind_schema(m, "sys");

	pos += snprintf(buf + pos, bufsize - pos, "set schema \"sys\";\n");

	sql_find_subtype(&tp, "bigint", 0, 0);
	if (!sql_bind_func(m->sa, s, "epoch", &tp, NULL, F_FUNC)) {
		n++;
		pos += snprintf(buf + pos, bufsize - pos, "\
create function sys.\"epoch\"(sec BIGINT) returns TIMESTAMP external name timestamp.\"epoch\";\n");
	}
	sql_find_subtype(&tp, "int", 0, 0);
	if (!sql_bind_func(m->sa, s, "epoch", &tp, NULL, F_FUNC)) {
		n++;
		pos += snprintf(buf + pos, bufsize - pos, "\
create function sys.\"epoch\"(sec INT) returns TIMESTAMP external name timestamp.\"epoch\";\n");
	}
	sql_find_subtype(&tp, "timestamp", 0, 0);
	if (!sql_bind_func(m->sa, s, "epoch", &tp, NULL, F_FUNC)) {
		n++;
		pos += snprintf(buf + pos, bufsize - pos, "\
create function sys.\"epoch\"(ts TIMESTAMP) returns INT external name timestamp.\"epoch\";\n");
	}
	sql_find_subtype(&tp, "timestamptz", 0, 0);
	if (!sql_bind_func(m->sa, s, "epoch", &tp, NULL, F_FUNC)) {
		n++;
		pos += snprintf(buf + pos, bufsize - pos, "\
create function sys.\"epoch\"(ts TIMESTAMP WITH TIME ZONE) returns INT external name timestamp.\"epoch\";\n");
	}
	pos += snprintf(buf + pos, bufsize - pos,
			"insert into sys.systemfunctions (select id from sys.functions where name = 'epoch' and schema_id = (select id from sys.schemas where name = 'sys') and id not in (select function_id from sys.systemfunctions));\n");

	if (schema) 
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);

	assert(pos < bufsize);
	if (n) {
		printf("Running database upgrade commands:\n%s\n", buf);
		err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	}
	GDKfree(buf);
	return err;		/* usually MAL_SUCCEED */
}

static str
sql_update_jun2016(Client c, mvc *sql)
{
	size_t bufsize = 1000000, pos = 0;
	char *buf = GDKmalloc(bufsize), *err = NULL;
	char *schema = stack_get_string(sql, "current_schema");
	node *n;
	sql_schema *s;

	s = mvc_bind_schema(sql, "sys");
	pos += snprintf(buf + pos, bufsize - pos, "set schema \"sys\";\n");

	pos += snprintf(buf + pos, bufsize - pos, "delete from sys.dependencies where id < 2000;\n");
	pos += snprintf(buf + pos, bufsize - pos, "delete from sys.types where id < 2000;\n");
	for (n = types->h; n; n = n->next) {
		sql_type *t = n->data;

		if (t->base.id >= 2000)
			continue;

		pos += snprintf(buf + pos, bufsize - pos, "insert into sys.types values (%d, '%s', '%s', %u, %u, %d, %d, %d);\n", t->base.id, t->base.name, t->sqlname, t->digits, t->scale, t->radix, t->eclass, t->s ? t->s->base.id : s->base.id);
	}
	pos += snprintf(buf + pos, bufsize - pos, "delete from sys.functions where id < 2000;\n");
	pos += snprintf(buf + pos, bufsize - pos, "delete from sys.args where func_id not in (select id from sys.functions);\n");
	for (n = funcs->h; n; n = n->next) {
		sql_func *f = n->data;
		int number = 0;
		sql_arg *a;
		node *m;

		if (f->base.id >= 2000)
			continue;

		pos += snprintf(buf + pos, bufsize - pos, "insert into sys.functions values (%d, '%s', '%s', '%s', %d, %d, %s, %s, %s, %d);\n", f->base.id, f->base.name, f->imp, f->mod, FUNC_LANG_INT, f->type, f->side_effect ? "true" : "false", f->varres ? "true" : "false", f->vararg ? "true" : "false", f->s ? f->s->base.id : s->base.id);
		if (f->res) {
			for (m = f->res->h; m; m = m->next, number++) {
				a = m->data;
				pos += snprintf(buf + pos, bufsize - pos, "insert into sys.args values (%d, %d, 'res_%d', '%s', %u, %u, %d, %d);\n", store_next_oid(), f->base.id, number, a->type.type->sqlname, a->type.digits, a->type.scale, a->inout, number);
			}
		}
		for (m = f->ops->h; m; m = m->next, number++) {
			a = m->data;
			if (a->name)
				pos += snprintf(buf + pos, bufsize - pos, "insert into sys.args values (%d, %d, '%s', '%s', %u, %u, %d, %d);\n", store_next_oid(), f->base.id, a->name, a->type.type->sqlname, a->type.digits, a->type.scale, a->inout, number);
			else
				pos += snprintf(buf + pos, bufsize - pos, "insert into sys.args values (%d, %d, 'arg_%d', '%s', %u, %u, %d, %d);\n", store_next_oid(), f->base.id, number, a->type.type->sqlname, a->type.digits, a->type.scale, a->inout, number);
		}
	}
	for (n = aggrs->h; n; n = n->next) {
		sql_func *aggr = n->data;
		sql_arg *arg;

		if (aggr->base.id >= 2000)
			continue;

		pos += snprintf(buf + pos, bufsize - pos, "insert into sys.functions values (%d, '%s', '%s', '%s', %d, %d, false, %s, %s, %d);\n", aggr->base.id, aggr->base.name, aggr->imp, aggr->mod, FUNC_LANG_INT, aggr->type, aggr->varres ? "true" : "false", aggr->vararg ? "true" : "false", aggr->s ? aggr->s->base.id : s->base.id);
		arg = aggr->res->h->data;
		pos += snprintf(buf + pos, bufsize - pos, "insert into sys.args values (%d, %d, 'res', '%s', %u, %u, %d, 0);\n", store_next_oid(), aggr->base.id, arg->type.type->sqlname, arg->type.digits, arg->type.scale, arg->inout);
		if (aggr->ops->h) {
			arg = aggr->ops->h->data;

			pos += snprintf(buf + pos, bufsize - pos, "insert into sys.args values (%d, %d, 'arg', '%s', %u, %u, %d, 1);\n", store_next_oid(), aggr->base.id, arg->type.type->sqlname, arg->type.digits, arg->type.scale, arg->inout);
		}
	}
	pos += snprintf(buf + pos, bufsize - pos, "insert into sys.systemfunctions (select id from sys.functions where id < 2000 and id not in (select function_id from sys.systemfunctions));\n");

	pos += snprintf(buf + pos, bufsize - pos, "grant execute on filter function \"like\"(string, string, string) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on filter function \"ilike\"(string, string, string) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on filter function \"like\"(string, string) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on filter function \"ilike\"(string, string) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function degrees to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function radians to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on procedure times to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function str_to_date to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function date_to_str to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function str_to_time to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function time_to_str to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function str_to_timestamp to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function timestamp_to_str to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function sys.\"epoch\"(BIGINT) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function sys.\"epoch\"(INT) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function sys.\"epoch\"(TIMESTAMP) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function sys.\"epoch\"(TIMESTAMP WITH TIME ZONE) to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function MS_STUFF to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function MS_TRUNC to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function MS_ROUND to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function MS_STR to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function alpha to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function zorder_encode to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function zorder_decode_x to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function zorder_decode_y to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function rejects to public;\n");
	pos += snprintf(buf + pos, bufsize - pos, "grant execute on function md5 to public;\n");

	/* 16_tracelog.sql */
	pos += snprintf(buf + pos, bufsize - pos, "drop procedure sys.profiler_openstream(string, int);\n");
	pos += snprintf(buf + pos, bufsize - pos, "drop procedure sys.profiler_stethoscope(int);\n");

	/* 25_debug.sql */
	pos += snprintf(buf + pos, bufsize - pos, "drop function sys.bbp();\n");
	pos += snprintf(buf + pos, bufsize - pos,
		"create function sys.bbp ()\n"
		"returns table (id int, name string,\n"
		"ttype string, count BIGINT, refcnt int, lrefcnt int,\n"
		"location string, heat int, dirty string,\n"
		"status string, kind string)\n"
		"external name bbp.get;\n");
	pos += snprintf(buf + pos, bufsize - pos,
		"create function sys.malfunctions()\n"
		"returns table(\"signature\" string, \"address\" string, \"comment\" string)\n"
		"external name \"manual\".\"functions\";\n");
	pos += snprintf(buf + pos, bufsize - pos,
		"create procedure sys.flush_log ()\n"
		"external name sql.\"flush_log\";\n");
	pos += snprintf(buf + pos, bufsize - pos,
		"create function sys.debug(debug int) returns integer\n"
		"external name mdb.\"setDebug\";\n");
	pos += snprintf(buf + pos, bufsize - pos,
		"insert into sys.systemfunctions (select id from sys.functions where name in ('bbp', 'malfunctions', 'flush_log', 'debug') and schema_id = (select id from sys.schemas where name = 'sys') and id not in (select function_id from sys.systemfunctions));\n");

	/* 45_uuid.sql */
	{
		/* in previous updates, the functions
		 * sys.isauuid(string) was not created, so we can't
		 * always drop it here */
		sql_subtype tp;
		sql_find_subtype(&tp, "clob", 0, 0);
		if (sql_bind_func(sql->sa, s, "isauuid", &tp, NULL, F_FUNC))
			pos += snprintf(buf + pos, bufsize - pos,
					"drop function sys.isaUUID(string);\n");
	}
	pos += snprintf(buf + pos, bufsize - pos,
			"drop function sys.isaUUID(uuid);\n"
			"create function sys.isaUUID(s string)\n"
			"returns boolean external name uuid.\"isaUUID\";\n"
			"insert into sys.systemfunctions (select id from sys.functions where name = 'isauuid' and schema_id = (select id from sys.schemas where name = 'sys') and id not in (select function_id from sys.systemfunctions));\n");

	/* 46_profiler.sql */
	pos += snprintf(buf + pos, bufsize - pos,
		"create schema profiler;\n"
		"create procedure profiler.start() external name profiler.\"start\";\n"
		"create procedure profiler.stop() external name profiler.stop;\n"
		"create procedure profiler.setheartbeat(beat int) external name profiler.setheartbeat;\n"
		"create procedure profiler.setpoolsize(poolsize int) external name profiler.setpoolsize;\n"
		"create procedure profiler.setstream(host string, port int) external name profiler.setstream;\n");
	pos += snprintf(buf + pos, bufsize - pos,
		"update sys.schemas set system = true where name = 'profiler';\n"
		"insert into sys.systemfunctions (select id from sys.functions where name in ('start', 'stop', 'setheartbeat', 'setpoolsize', 'setstream') and schema_id = (select id from sys.schemas where name = 'profiler') and id not in (select function_id from sys.systemfunctions));\n");

	/* 51_sys_schema_extensions.sql */
	pos += snprintf(buf + pos, bufsize - pos,
		"delete from sys.keywords;\n"
		"insert into sys.keywords values\n"
		"('ADD'), ('ADMIN'), ('AFTER'), ('AGGREGATE'), ('ALL'), ('ALTER'), ('ALWAYS'), ('AND'), ('ANY'), ('ASC'), ('ASYMMETRIC'), ('ATOMIC'), ('AUTO_INCREMENT'),\n"
		"('BEFORE'), ('BEGIN'), ('BEST'), ('BETWEEN'), ('BIGINT'), ('BIGSERIAL'), ('BINARY'), ('BLOB'), ('BY'),\n"
		"('CALL'), ('CASCADE'), ('CASE'), ('CAST'), ('CHAIN'), ('CHAR'), ('CHARACTER'), ('CHECK'), ('CLOB'), ('COALESCE'), ('COMMIT'), ('COMMITTED'), ('CONSTRAINT'), ('CONVERT'), ('COPY'), ('CORRESPONDING'), ('CREATE'), ('CROSS'), ('CURRENT'), ('CURRENT_DATE'), ('CURRENT_ROLE'), ('CURRENT_TIME'), ('CURRENT_TIMESTAMP'), ('CURRENT_USER'),\n"
		"('DAY'), ('DEC'), ('DECIMAL'), ('DECLARE'), ('DEFAULT'), ('DELETE'), ('DELIMITERS'), ('DESC'), ('DO'), ('DOUBLE'), ('DROP'),\n"
		"('EACH'), ('EFFORT'), ('ELSE'), ('ELSEIF'), ('ENCRYPTED'), ('END'), ('ESCAPE'), ('EVERY'), ('EXCEPT'), ('EXCLUDE'), ('EXISTS'), ('EXTERNAL'), ('EXTRACT'),\n"
		"('FALSE'), ('FLOAT'), ('FOLLOWING'), ('FOR'), ('FOREIGN'), ('FROM'), ('FULL'), ('FUNCTION'),\n"
		"('GENERATED'), ('GLOBAL'), ('GRANT'), ('GROUP'),\n"
		"('HAVING'), ('HOUR'), ('HUGEINT'),\n"
		"('IDENTITY'), ('IF'), ('ILIKE'), ('IN'), ('INDEX'), ('INNER'), ('INSERT'), ('INT'), ('INTEGER'), ('INTERSECT'), ('INTO'), ('IS'), ('ISOLATION'),\n"
		"('JOIN'),\n"
		"('LEFT'), ('LIKE'), ('LIMIT'), ('LOCAL'), ('LOCALTIME'), ('LOCALTIMESTAMP'), ('LOCKED'),\n"
		"('MEDIUMINT'), ('MERGE'), ('MINUTE'), ('MONTH'),\n"
		"('NATURAL'), ('NEW'), ('NEXT'), ('NOCYCLE'), ('NOMAXVALUE'), ('NOMINVALUE'), ('NOT'), ('NOW'), ('NULL'), ('NULLIF'), ('NUMERIC'),\n"
		"('OF'), ('OFFSET'), ('OLD'), ('ON'), ('ONLY'), ('OPTION'), ('OR'), ('ORDER'), ('OTHERS'), ('OUTER'), ('OVER'),\n"
		"('PARTIAL'), ('PARTITION'), ('POSITION'), ('PRECEDING'), ('PRESERVE'), ('PRIMARY'), ('PRIVILEGES'), ('PROCEDURE'), ('PUBLIC'),\n"
		"('RANGE'), ('READ'), ('REAL'), ('RECORDS'), ('REFERENCES'), ('REFERENCING'), ('REMOTE'), ('RENAME'), ('REPEATABLE'), ('REPLICA'), ('RESTART'), ('RESTRICT'), ('RETURN'), ('RETURNS'), ('REVOKE'), ('RIGHT'), ('ROLLBACK'), ('ROWS'),\n"
		"('SAMPLE'), ('SAVEPOINT'), ('SECOND'), ('SELECT'), ('SEQUENCE'), ('SERIAL'), ('SERIALIZABLE'), ('SESSION_USER'), ('SET'), ('SIMPLE'), ('SMALLINT'), ('SOME'), ('SPLIT_PART'), ('STDIN'), ('STDOUT'), ('STORAGE'), ('STREAM'), ('STRING'), ('SUBSTRING'), ('SYMMETRIC'),\n"
		"('THEN'), ('TIES'), ('TINYINT'), ('TO'), ('TRANSACTION'), ('TRIGGER'), ('TRUE'),\n"
		"('UNBOUNDED'), ('UNCOMMITTED'), ('UNENCRYPTED'), ('UNION'), ('UNIQUE'), ('UPDATE'), ('USER'), ('USING'),\n"
		"('VALUES'), ('VARCHAR'), ('VARYING'), ('VIEW'),\n"
		"('WHEN'), ('WHERE'), ('WHILE'), ('WITH'), ('WORK'), ('WRITE'),\n"
		"('XMLAGG'), ('XMLATTRIBUTES'), ('XMLCOMMENT'), ('XMLCONCAT'), ('XMLDOCUMENT'), ('XMLELEMENT'), ('XMLFOREST'), ('XMLNAMESPACES'), ('XMLPARSE'), ('XMLPI'), ('XMLQUERY'), ('XMLSCHEMA'), ('XMLTEXT'), ('XMLVALIDATE');\n");

	// Add new dependency_type 15 to table sys.dependency_types
	pos += snprintf(buf + pos, bufsize - pos,
		"insert into sys.dependency_types (dependency_type_id, dependency_type_name)\n"
		" select 15 as id, 'TYPE' as name where 15 not in (select dependency_type_id from sys.dependency_types);\n");

	// Add 46 missing sys.dependencies rows for new dependency_type: 15
	pos += snprintf(buf + pos, bufsize - pos,
		"insert into sys.dependencies (id, depend_id, depend_type)\n"
		" select distinct types.id as type_id, args.func_id, 15 as depend_type from sys.args join sys.types on types.systemname = args.type where args.type in ('inet', 'json', 'url', 'uuid')\n"
		" except\n"
		" select distinct id, depend_id, depend_type from sys.dependencies where depend_type = 15;\n");

	// Add the new storage inspection functions.
	pos += snprintf(buf + pos, bufsize - pos,
		"create function sys.\"storage\"( sname string)\n"
		"returns table (\n"
		"    \"schema\" string,\n"
		"    \"table\" string,\n"
		"    \"column\" string,\n"
		"    \"type\" string,\n"
		"    \"mode\" string,\n"
		"    location string,\n"
		"    \"count\" bigint,\n"
		"    typewidth int,\n"
		"    columnsize bigint,\n"
		"    heapsize bigint,\n"
		"    hashes bigint,\n"
		"    phash boolean,\n"
		"    imprints bigint,\n"
		"    sorted boolean\n"
		")\n"
		"external name sql.\"storage\";\n"
		"\n"
		"create function sys.\"storage\"( sname string, tname string)\n"
		"returns table (\n"
		"    \"schema\" string,\n"
		"    \"table\" string,\n"
		"    \"column\" string,\n"
		"    \"type\" string,\n"
		"    \"mode\" string,\n"
		"    location string,\n"
		"    \"count\" bigint,\n"
		"    typewidth int,\n"
		"    columnsize bigint,\n"
		"    heapsize bigint,\n"
		"    hashes bigint,\n"
		"    phash boolean,\n"
		"    imprints bigint,\n"
		"    sorted boolean\n"
		")\n"
		"external name sql.\"storage\";\n"
		"\n"
		"create function sys.\"storage\"( sname string, tname string, cname string)\n"
		"returns table (\n"
		"    \"schema\" string,\n"
		"    \"table\" string,\n"
		"    \"column\" string,\n"
		"    \"type\" string,\n"
		"    \"mode\" string,\n"
		"    location string,\n"
		"    \"count\" bigint,\n"
		"    typewidth int,\n"
		"    columnsize bigint,\n"
		"    heapsize bigint,\n"
		"    hashes bigint,\n"
		"    phash boolean,\n"
		"    imprints bigint,\n"
		"    sorted boolean\n"
		")\n"
		"external name sql.\"storage\";\n"
	);
	pos += snprintf(buf + pos, bufsize - pos,
			"insert into sys.systemfunctions (select id from sys.functions where name = 'storage' and schema_id = (select id from sys.schemas where name = 'sys') and id not in (select function_id from sys.systemfunctions));\n");

	/* change to 99_system.sql: correct invalid FK schema ids, set
	 * them to schema id 2000 (the "sys" schema) */
	pos += snprintf(buf + pos, bufsize - pos,
			"UPDATE sys.types SET schema_id = (SELECT id FROM sys.schemas WHERE name = 'sys') WHERE schema_id = 0 AND schema_id NOT IN (SELECT id from sys.schemas);\n"
			"UPDATE sys.functions SET schema_id = (SELECT id FROM sys.schemas WHERE name = 'sys') WHERE schema_id = 0 AND schema_id NOT IN (SELECT id from sys.schemas);\n");

	pos += snprintf(buf + pos, bufsize - pos,
			"delete from sys.systemfunctions where function_id not in (select id from sys.functions);\n");

	if (schema) 
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);

	assert(pos < bufsize);
	printf("Running database upgrade commands:\n%s\n", buf);
	err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	GDKfree(buf);
	return err;		/* usually MAL_SUCCEED */
}

static str
sql_update_geom(Client c, mvc *sql, int olddb)
{
	size_t bufsize, pos = 0;
	char *buf, *err = NULL;
	char *geomupgrade;
	char *schema = stack_get_string(sql, "current_schema");
	geomsqlfix_fptr fixfunc;
	node *n;
	sql_schema *s = mvc_bind_schema(sql, "sys");

	if ((fixfunc = geomsqlfix_get()) == NULL)
		return NULL;

	geomupgrade = (*fixfunc)(olddb);
	bufsize = strlen(geomupgrade) + 512;
	buf = GDKmalloc(bufsize);
	pos += snprintf(buf + pos, bufsize - pos, "set schema \"sys\";\n");
	pos += snprintf(buf + pos, bufsize - pos, "%s", geomupgrade);
	GDKfree(geomupgrade);

	pos += snprintf(buf + pos, bufsize - pos, "delete from sys.types where systemname in ('mbr', 'wkb', 'wkba');\n");
	for (n = types->h; n; n = n->next) {
		sql_type *t = n->data;

		if (t->base.id < 2000 &&
		    (strcmp(t->base.name, "mbr") == 0 ||
		     strcmp(t->base.name, "wkb") == 0 ||
		     strcmp(t->base.name, "wkba") == 0))
			pos += snprintf(buf + pos, bufsize - pos, "insert into sys.types values (%d, '%s', '%s', %u, %u, %d, %d, %d);\n", t->base.id, t->base.name, t->sqlname, t->digits, t->scale, t->radix, t->eclass, t->s ? t->s->base.id : s->base.id);
	}

	if (schema) 
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);

	assert(pos < bufsize);
	printf("Running database upgrade commands:\n%s\n", buf);
	err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	GDKfree(buf);
	return err;		/* usually MAL_SUCCEED */
}

static str
sql_update_default(Client c, mvc *sql)
{
	size_t bufsize = 10240, pos = 0;
	char *buf = GDKmalloc(bufsize), *err = NULL;
	char *schema = stack_get_string(sql, "current_schema");
	sql_schema *s;

	s = mvc_bind_schema(sql, "sys");
	pos += snprintf(buf + pos, bufsize - pos, "set schema \"sys\";\n");

	{
		sql_table *t;

		if ((t = mvc_bind_table(sql, s, "storagemodel")) != NULL)
			t->system = 0;
		if ((t = mvc_bind_table(sql, s, "storagemodelinput")) != NULL)
			t->system = 0;
		if ((t = mvc_bind_table(sql, s, "storage")) != NULL)
			t->system = 0;
		if ((t = mvc_bind_table(sql, s, "tablestoragemodel")) != NULL)
			t->system = 0;
	}

	/* 18_index.sql */
	pos += snprintf(buf + pos, bufsize - pos,
			"create procedure sys.createorderindex(sys string, tab string, col string)\n"
			"external name sql.createorderindex;\n"
			"create procedure sys.droporderindex(sys string, tab string, col string)\n"
			"external name sql.droporderindex;\n");

	/* 24_zorder.sql */
	pos += snprintf(buf + pos, bufsize - pos,
			"drop function sys.zorder_decode_y;\n"
			"drop function sys.zorder_decode_x;\n"
			"drop function sys.zorder_encode;\n");

	/* 75_storagemodel.sql */
	pos += snprintf(buf + pos, bufsize - pos,
			"drop view sys.tablestoragemodel;\n"
			"drop view sys.storagemodel;\n"
			"drop function sys.storagemodel();\n"
			"drop procedure sys.storagemodelinit();\n"
			"drop function sys.\"storage\"(string, string, string);\n"
			"drop function sys.\"storage\"(string, string);\n"
			"drop function sys.\"storage\"(string);\n"
			"drop view sys.\"storage\";\n"
			"drop function sys.\"storage\"();\n"
			"alter table sys.storagemodelinput add column \"revsorted\" boolean;\n"
			"alter table sys.storagemodelinput add column \"unique\" boolean;\n"
			"alter table sys.storagemodelinput add column \"orderidx\" bigint;\n"
			"create function sys.\"storage\"()\n"
			"returns table (\n"
			" \"schema\" string,\n"
			" \"table\" string,\n"
			" \"column\" string,\n"
			" \"type\" string,\n"
			" \"mode\" string,\n"
			" location string,\n"
			" \"count\" bigint,\n"
			" typewidth int,\n"
			" columnsize bigint,\n"
			" heapsize bigint,\n"
			" hashes bigint,\n"
			" phash boolean,\n"
			" \"imprints\" bigint,\n"
			" sorted boolean,\n"
			" revsorted boolean,\n"
			" \"unique\" boolean,\n"
			" orderidx bigint\n"
			")\n"
			"external name sql.\"storage\";\n"
			"create view sys.\"storage\" as select * from sys.\"storage\"();\n"
			"create function sys.\"storage\"( sname string)\n"
			"returns table (\n"
			" \"schema\" string,\n"
			" \"table\" string,\n"
			" \"column\" string,\n"
			" \"type\" string,\n"
			" \"mode\" string,\n"
			" location string,\n"
			" \"count\" bigint,\n"
			" typewidth int,\n"
			" columnsize bigint,\n"
			" heapsize bigint,\n"
			" hashes bigint,\n"
			" phash boolean,\n"
			" \"imprints\" bigint,\n"
			" sorted boolean,\n"
			" revsorted boolean,\n"
			" \"unique\" boolean,\n"
			" orderidx bigint\n"
			")\n"
			"external name sql.\"storage\";\n"
			"create function sys.\"storage\"( sname string, tname string)\n"
			"returns table (\n"
			" \"schema\" string,\n"
			" \"table\" string,\n"
			" \"column\" string,\n"
			" \"type\" string,\n"
			" \"mode\" string,\n"
			" location string,\n"
			" \"count\" bigint,\n"
			" typewidth int,\n"
			" columnsize bigint,\n"
			" heapsize bigint,\n"
			" hashes bigint,\n"
			" phash boolean,\n"
			" \"imprints\" bigint,\n"
			" sorted boolean,\n"
			" revsorted boolean,\n"
			" \"unique\" boolean,\n"
			" orderidx bigint\n"
			")\n"
			"external name sql.\"storage\";\n"
			"create function sys.\"storage\"( sname string, tname string, cname string)\n"
			"returns table (\n"
			" \"schema\" string,\n"
			" \"table\" string,\n"
			" \"column\" string,\n"
			" \"type\" string,\n"
			" \"mode\" string,\n"
			" location string,\n"
			" \"count\" bigint,\n"
			" typewidth int,\n"
			" columnsize bigint,\n"
			" heapsize bigint,\n"
			" hashes bigint,\n"
			" phash boolean,\n"
			" \"imprints\" bigint,\n"
			" sorted boolean,\n"
			" revsorted boolean,\n"
			" \"unique\" boolean,\n"
			" orderidx bigint\n"
			")\n");
	pos += snprintf(buf + pos, bufsize - pos,
			"external name sql.\"storage\";\n"
			"create procedure sys.storagemodelinit()\n"
			"begin\n"
			" delete from sys.storagemodelinput;\n"
			" insert into sys.storagemodelinput\n"
			" select X.\"schema\", X.\"table\", X.\"column\", X.\"type\", X.typewidth, X.count, 0, X.typewidth, false, X.sorted, X.revsorted, X.\"unique\", X.orderidx from sys.\"storage\"() X;\n"
			" update sys.storagemodelinput\n"
			" set reference = true\n"
			" where concat(concat(\"schema\",\"table\"), \"column\") in (\n"
			"  SELECT concat( concat(\"fkschema\".\"name\", \"fktable\".\"name\"), \"fkkeycol\".\"name\" )\n"
			"  FROM \"sys\".\"keys\" AS    \"fkkey\",\n"
			"    \"sys\".\"objects\" AS \"fkkeycol\",\n"
			"    \"sys\".\"tables\" AS  \"fktable\",\n"
			"    \"sys\".\"schemas\" AS \"fkschema\"\n"
			"  WHERE   \"fktable\".\"id\" = \"fkkey\".\"table_id\"\n"
			"   AND \"fkkey\".\"id\" = \"fkkeycol\".\"id\"\n"
			"   AND \"fkschema\".\"id\" = \"fktable\".\"schema_id\"\n"
			"   AND \"fkkey\".\"rkey\" > -1);\n"
			" update sys.storagemodelinput\n"
			" set \"distinct\" = \"count\"\n"
			" where \"type\" = 'varchar' or \"type\"='clob';\n"
			"end;\n"
			"create function sys.storagemodel()\n"
			"returns table (\n"
			" \"schema\" string,\n"
			" \"table\" string,\n"
			" \"column\" string,\n"
			" \"type\" string,\n"
			" \"count\" bigint,\n"
			" columnsize bigint,\n"
			" heapsize bigint,\n"
			" hashes bigint,\n"
			" \"imprints\" bigint,\n"
			" sorted boolean,\n"
			" revsorted boolean,\n"
			" \"unique\" boolean,\n"
			" orderidx bigint)\n"
			"begin\n"
			" return select I.\"schema\", I.\"table\", I.\"column\", I.\"type\", I.\"count\",\n"
			" columnsize(I.\"type\", I.count, I.\"distinct\"),\n"
			" heapsize(I.\"type\", I.\"distinct\", I.\"atomwidth\"),\n"
			" hashsize(I.\"reference\", I.\"count\"),\n"
			" imprintsize(I.\"count\",I.\"type\"),\n"
			" I.sorted, I.revsorted, I.\"unique\", I.orderidx\n"
			" from sys.storagemodelinput I;\n"
			"end;\n"
			"create view sys.storagemodel as select * from sys.storagemodel();\n"
			"create view sys.tablestoragemodel\n"
			"as select \"schema\",\"table\",max(count) as \"count\",\n"
			" sum(columnsize) as columnsize,\n"
			" sum(heapsize) as heapsize,\n"
			" sum(hashes) as hashes,\n"
			" sum(\"imprints\") as \"imprints\",\n"
			" sum(case when sorted = false then 8 * count else 0 end) as auxiliary\n"
			"from sys.storagemodel() group by \"schema\",\"table\";\n"
			"update sys._tables set system = true where name in ('storage', 'storagemodel', 'tablestoragemodel') and schema_id = (select id from sys.schemas where name = 'sys');\n");

	/* 80_statistics.sql */
	pos += snprintf(buf + pos, bufsize - pos,
			"alter table sys.statistics add column \"revsorted\" boolean;\n");

	pos += snprintf(buf + pos, bufsize - pos,
			"insert into sys.systemfunctions (select f.id from sys.functions f, sys.schemas s where f.name in ('storage', 'storagemodel') and f.type = %d and f.schema_id = s.id and s.name = 'sys');\n",
			F_UNION);
	pos += snprintf(buf + pos, bufsize - pos,
			"insert into sys.systemfunctions (select f.id from sys.functions f, sys.schemas s where f.name in ('createorderindex', 'droporderindex', 'storagemodelinit') and f.type = %d and f.schema_id = s.id and s.name = 'sys');\n",
			F_PROC);
	pos += snprintf(buf + pos, bufsize - pos,
			"delete from systemfunctions where function_id not in (select id from functions);\n");

	if (schema) 
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);

	assert(pos < bufsize);
	printf("Running database upgrade commands:\n%s\n", buf);
	err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	GDKfree(buf);
	return err;		/* usually MAL_SUCCEED */
}

static str
sql_update_nowrd(Client c, mvc *sql)
{
	size_t bufsize = 10240, pos = 0;
	char *buf = GDKmalloc(bufsize), *err = NULL;
	char *schema = stack_get_string(sql, "current_schema");
	sql_schema *s;

	s = mvc_bind_schema(sql, "sys");
	pos += snprintf(buf + pos, bufsize - pos, "set schema \"sys\";\n");

	{
		sql_table *t;

		if ((t = mvc_bind_table(sql, s, "querylog_calls")) != NULL)
			t->system = 0;
		if ((t = mvc_bind_table(sql, s, "querylog_history")) != NULL)
			t->system = 0;
	}

	/* 15_querylog.sql */
	pos += snprintf(buf + pos, bufsize - pos,
			"drop view sys.querylog_history;\n"
			"drop view sys.querylog_calls;\n"
			"drop function sys.querylog_calls();\n"
			"create function sys.querylog_calls()\n"
			"returns table(\n"
			" id oid,\n"
			" \"start\" timestamp,\n"
			" \"stop\" timestamp,\n"
			" arguments string,\n"
			" tuples bigint,\n"
			" run bigint,\n"
			" ship bigint,\n"
			" cpu int,\n"
			" io int\n"
			")\n"
			"external name sql.querylog_calls;\n"
			"create view sys.querylog_calls as select * from sys.querylog_calls();\n"
			"create view sys.querylog_history as\n"
			"select qd.*, ql.\"start\",ql.\"stop\", ql.arguments, ql.tuples, ql.run, ql.ship, ql.cpu, ql.io\n"
			"from sys.querylog_catalog() qd, sys.querylog_calls() ql\n"
			"where qd.id = ql.id and qd.owner = user;\n"
			"update _tables set system = true where name in ('querylog_calls', 'querylog_history') and schema_id = (select id from schemas where name = 'sys');\n");

	/* 39_analytics.sql */
	pos += snprintf(buf + pos, bufsize - pos,
			"drop aggregate sys.stddev_pop(wrd);\n"
			"drop aggregate sys.stddev_samp(wrd);\n"
			"drop aggregate sys.var_pop(wrd);\n"
			"drop aggregate sys.var_samp(wrd);\n"
			"drop aggregate sys.median(wrd);\n"
			"drop aggregate sys.quantile(wrd, double);\n"
			"drop aggregate sys.corr(wrd, wrd);\n");

	pos += snprintf(buf + pos, bufsize - pos,
			"insert into sys.systemfunctions (select f.id from sys.functions f, sys.schemas s where f.name in ('querylog_calls') and f.type = %d and f.schema_id = s.id and s.name = 'sys');\n",
			F_UNION);
	pos += snprintf(buf + pos, bufsize - pos,
			"delete from systemfunctions where function_id not in (select id from functions);\n");

	if (schema) 
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);

	assert(pos < bufsize);
	printf("Running database upgrade commands:\n%s\n", buf);
	err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	GDKfree(buf);
	return err;		/* usually MAL_SUCCEED */
}

/* older databases may have sys.median and sys.quantile aggregates on
 * decimal(1) which doesn't match plain decimal: fix those */
static str
sql_update_median(Client c, mvc *sql)
{
	char *q1 = "select id from sys.args where func_id in (select id from sys.functions where name = 'median' and schema_id = (select id from sys.schemas where name = 'sys')) and type = 'decimal' and type_digits = 1 and type_scale = 0 and number = 1;\n";
	char *q2 = "select id from sys.args where func_id in (select id from sys.functions where name = 'median' and schema_id = (select id from sys.schemas where name = 'sys')) and type = 'date' and number = 1;\n";
	size_t bufsize = 5000, pos = 0;
	char *buf = GDKmalloc(bufsize), *err = NULL;
	char *schema = stack_get_string(sql, "current_schema");
	res_table *output;
	BAT *b;
	int needed = 0;

	pos += snprintf(buf + pos, bufsize - pos,
			"set schema \"sys\";\n");
	err = SQLstatementIntern(c, &q1, "update", 1, 0, &output);
	if (err) {
		GDKfree(buf);
		return err;
	}
	b = BATdescriptor(output->cols[0].b);
	if (b) {
		if (BATcount(b) > 0) {
			pos += snprintf(buf + pos, bufsize - pos,
					"drop aggregate median(decimal(1));\n"
					"create aggregate median(val DECIMAL) returns DECIMAL"
					" external name \"aggr\".\"median\";\n"
					"drop aggregate quantile(decimal(1), double);\n"
					"create aggregate quantile(val DECIMAL, q DOUBLE) returns DECIMAL"
					" external name \"aggr\".\"quantile\";\n");
			needed = 1;
		}
		BBPunfix(b->batCacheid);
	}
	res_tables_destroy(output);
	err = SQLstatementIntern(c, &q2, "update", 1, 0, &output);
	if (err) {
		GDKfree(buf);
		return err;
	}
	b = BATdescriptor(output->cols[0].b);
	if (b) {
		if (BATcount(b) == 0) {
			pos += snprintf(buf + pos, bufsize - pos,
					"create aggregate median(val DATE) returns DATE"
					" external name \"aggr\".\"median\";\n"
					"create aggregate median(val TIME) returns TIME"
					" external name \"aggr\".\"median\";\n"
					"create aggregate median(val TIMESTAMP) returns TIMESTAMP"
					" external name \"aggr\".\"median\";\n"
/*#if 0
					"create aggregate quantile(val DATE, q DOUBLE) returns DATE"
					" external name \"aggr\".\"quantile\";\n"
					"create aggregate quantile(val TIME, q DOUBLE) returns TIME"
					" external name \"aggr\".\"quantile\";\n"
					"create aggregate quantile(val TIMESTAMP, q DOUBLE) returns TIMESTAMP"
					" external name \"aggr\".\"quantile\";\n"
#endif*/
		);
			needed = 1;
		}
		BBPunfix(b->batCacheid);
	}
	res_tables_destroy(output);
	pos += snprintf(buf + pos, bufsize - pos,
			"insert into sys.systemfunctions (select id from sys.functions where name in ('median', 'quantile') and schema_id = (select id from sys.schemas where name = 'sys') and id not in (select function_id from sys.systemfunctions));\n");
	if (schema)
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);
	assert(pos < bufsize);
	if (needed) {
		printf("Running database upgrade commands:\n%s\n", buf);
		err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	}

	GDKfree(buf);

	return err;		/* usually MAL_SUCCEED */
}

static str
sql_update_jun2016_sp2(Client c, mvc *sql)
{
	size_t bufsize = 1000000, pos = 0;
	char *buf = GDKmalloc(bufsize), *err = NULL;
	char *schema = stack_get_string(sql, "current_schema");

	pos += snprintf(buf + pos, bufsize - pos, "set schema \"sys\";\n");

	pos += snprintf(buf + pos, bufsize - pos,
			"GRANT EXECUTE ON FUNCTION sys.getAnchor(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getBasename(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getContent(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getContext(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getDomain(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getExtension(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getFile(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getHost(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getPort(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getProtocol(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getQuery(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getUser(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.getRobotURL(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.isaURL(url) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.newurl(STRING, STRING, INT, STRING) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.newurl(STRING, STRING, STRING) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"broadcast\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"host\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"masklen\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"setmasklen\"(inet, int) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"netmask\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"hostmask\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"network\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"text\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"abbrev\"(inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"left_shift\"(inet, inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"right_shift\"(inet, inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"left_shift_assign\"(inet, inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.\"right_shift_assign\"(inet, inet) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(TINYINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(SMALLINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(INTEGER) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(BIGINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(REAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(DATE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(TIME) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(TIMESTAMP) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(TINYINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(SMALLINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(INTEGER) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(BIGINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(REAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(DATE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(TIME) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(TIMESTAMP) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(TINYINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(SMALLINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(INTEGER) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(BIGINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(REAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(DATE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(TIME) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_samp(TIMESTAMP) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(TINYINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(SMALLINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(INTEGER) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(BIGINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(REAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(DATE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(TIME) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.var_pop(TIMESTAMP) TO PUBLIC;\n");
	pos += snprintf(buf + pos, bufsize - pos,
			"GRANT EXECUTE ON AGGREGATE sys.median(TINYINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(SMALLINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(INTEGER) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(BIGINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(DECIMAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(REAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(DATE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(TIME) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.median(TIMESTAMP) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(TINYINT, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(SMALLINT, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(INTEGER, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(BIGINT, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(DECIMAL, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(REAL, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(DOUBLE, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(DATE, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(TIME, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.quantile(TIMESTAMP, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.corr(TINYINT, TINYINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.corr(SMALLINT, SMALLINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.corr(INTEGER, INTEGER) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.corr(BIGINT, BIGINT) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.corr(REAL, REAL) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE sys.corr(DOUBLE, DOUBLE) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.filter(json, string) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.filter(json, tinyint) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.filter(json, integer) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.filter(json, bigint) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.text(json, string) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.number(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.\"integer\"(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.isvalid(string) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.isobject(string) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.isarray(string) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.isvalid(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.isobject(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.isarray(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.length(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.keyarray(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.valuearray(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.text(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.text(string) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION json.text(int) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE json.output(json) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE json.tojsonarray(string) TO PUBLIC;\n"
			"GRANT EXECUTE ON AGGREGATE json.tojsonarray(double) TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.uuid() TO PUBLIC;\n"
			"GRANT EXECUTE ON FUNCTION sys.isaUUID(string) TO PUBLIC;\n");
#ifdef HAVE_HGE
	if (have_hge) {
		pos += snprintf(buf + pos, bufsize - pos,
				"GRANT EXECUTE ON AGGREGATE sys.stddev_samp(HUGEINT) TO PUBLIC;\n"
				"GRANT EXECUTE ON AGGREGATE sys.stddev_pop(HUGEINT) TO PUBLIC;\n"
				"GRANT EXECUTE ON AGGREGATE sys.var_samp(HUGEINT) TO PUBLIC;\n"
				"GRANT EXECUTE ON AGGREGATE sys.var_pop(HUGEINT) TO PUBLIC;\n"
				"GRANT EXECUTE ON AGGREGATE sys.median(HUGEINT) TO PUBLIC;\n"
				"GRANT EXECUTE ON AGGREGATE sys.quantile(HUGEINT, DOUBLE) TO PUBLIC;\n"
				"GRANT EXECUTE ON AGGREGATE sys.corr(HUGEINT, HUGEINT) TO PUBLIC;\n"
				"GRANT EXECUTE ON FUNCTION json.filter(json, hugeint) TO PUBLIC;\n");
	}
#endif

	if (schema)
		pos += snprintf(buf + pos, bufsize - pos, "set schema \"%s\";\n", schema);

	assert(pos < bufsize);
	printf("Running database upgrade commands:\n%s\n", buf);
	err = SQLstatementIntern(c, &buf, "update", 1, 0, NULL);
	GDKfree(buf);
	return err;		/* usually MAL_SUCCEED */
}

void
SQLupgrades(Client c, mvc *m)
{
	sql_subtype tp;
	sql_subfunc *f;
	char *err;
	sql_schema *s = mvc_bind_schema(m, "sys");

#ifndef HAVE_EMBEDDED

	/* if function sys.md5(str) does not exist, we need to
	 * update */
	sql_find_subtype(&tp, "clob", 0, 0);
	if (!sql_bind_func(m->sa, s, "md5", &tp, NULL, F_FUNC)) {
		if ((err = sql_update_oct2014(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}
	/* if table returning function sys.environment() does not
	 * exist, we need to update from oct2014->sp1 */
	if (!sql_bind_func(m->sa, s, "environment", NULL, NULL, F_UNION)) {
		if ((err = sql_update_oct2014_sp1(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}
	/* if sys.tablestoragemodel.auxillary exists, we need
	 * to update (note, the proper spelling is auxiliary) */
	if (mvc_bind_column(m, mvc_bind_table(m, s, "tablestoragemodel"), "auxillary")) {
		if ((err = sql_update_oct2014_sp2(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}

	/* if function sys.<<(inet,inet) does not exist, we need to
	 * update */
	sql_init_subtype(&tp, find_sql_type(s, "inet"), 0, 0);
	if (!sql_bind_func(m->sa, s, "left_shift", &tp, &tp, F_FUNC)) {
		if ((err = sql_update_oct2014_sp3(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}

#ifdef HAVE_HGE
	if (have_hge) {
		sql_find_subtype(&tp, "hugeint", 0, 0);
		if (!sql_bind_aggr(m->sa, s, "var_pop", &tp)) {
			if ((err = sql_update_hugeint(c, m)) != NULL) {
				fprintf(stderr, "!%s\n", err);
				GDKfree(err);
			}
		}
	}
#endif

	/* add missing features needed beyond Oct 2014 */
	sql_find_subtype(&tp, "clob", 0, 0);
	if (!sql_bind_func(m->sa, s, "like", &tp, &tp, F_FILT)) {
		if ((err = sql_update_jul2015(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}
#endif


	/* add missing epoch functions */
	if ((err = sql_update_epoch(c, m)) != NULL) {
		fprintf(stderr, "!%s\n", err);
		GDKfree(err);
	}

	sql_find_subtype(&tp, "clob", 0, 0);
	if (!sql_bind_func(m->sa, s, "storage", &tp, NULL, F_UNION)) {
		if ((err = sql_update_jun2016(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}

	f = sql_bind_func_(m->sa, s, "env", NULL, F_UNION);
	if (f && sql_privilege(m, ROLE_PUBLIC, f->func->base.id, PRIV_EXECUTE, 0) != PRIV_EXECUTE) {
		sql_table *privs = find_sql_table(s, "privileges");
		int pub = ROLE_PUBLIC, p = PRIV_EXECUTE, zero = 0;

		table_funcs.table_insert(m->session->tr, privs, &f->func->base.id, &pub, &p, &zero, &zero);
	}

	/* If the point type exists, but the geometry type does not
	 * exist any more at the "sys" schema (i.e., the first part of
	 * the upgrade has been completed succesfully), then move on
	 * to the second part */
	if (find_sql_type(s, "point") != NULL) {
		/* type sys.point exists: this is an old geom-enabled
		 * database */
		if ((err = sql_update_geom(c, m, 1)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	} else if (geomsqlfix_get() != NULL) {
		/* the geom module is loaded... */
		sql_find_subtype(&tp, "clob", 0, 0);
		if (!sql_bind_func(m->sa, s, "st_wkttosql",
				   &tp, NULL, F_FUNC)) {
			/* ... but the database is not geom-enabled */
			if ((err = sql_update_geom(c, m, 0)) != NULL) {
				fprintf(stderr, "!%s\n", err);
				GDKfree(err);
			}
		}
	}

	if ((err = sql_update_median(c, m)) != NULL) {
		fprintf(stderr, "!%s\n", err);
		GDKfree(err);
	}


	if ((f = sql_bind_func(m->sa, s, "uuid", NULL, NULL, F_FUNC)) != NULL &&
	    sql_privilege(m, ROLE_PUBLIC, f->func->base.id, PRIV_EXECUTE, 0) != PRIV_EXECUTE) {
		if ((err = sql_update_jun2016_sp2(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}

	sql_find_subtype(&tp, "clob", 0, 0);
	if (!sql_bind_func3(m->sa, s, "createorderindex", &tp, &tp, &tp, F_PROC)) {
		if ((err = sql_update_default(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}

	sql_find_subtype(&tp, "wrd", 0, 0);
	if (sql_bind_func(m->sa, s, "median", &tp, NULL, F_AGGR)) {
		if ((err = sql_update_nowrd(c, m)) != NULL) {
			fprintf(stderr, "!%s\n", err);
			GDKfree(err);
		}
	}
}
