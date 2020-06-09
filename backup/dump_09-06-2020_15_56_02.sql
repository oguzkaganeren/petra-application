--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--





--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Debian 12.1-1.pgdg100+1)
-- Dumped by pg_dump version 12.1 (Debian 12.1-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Debian 12.1-1.pgdg100+1)
-- Dumped by pg_dump version 12.1 (Debian 12.1-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO postgres;

--
-- Name: hdb_views; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_views;


ALTER SCHEMA hdb_views OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: hdb_schema_update_event_notifier(); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.hdb_schema_update_event_notifier() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    instance_id uuid;
    occurred_at timestamptz;
    curr_rec record;
  BEGIN
    instance_id = NEW.instance_id;
    occurred_at = NEW.occurred_at;
    PERFORM pg_notify('hasura_schema_update', json_build_object(
      'instance_id', instance_id,
      'occurred_at', occurred_at
      )::text);
    RETURN curr_rec;
  END;
$$;


ALTER FUNCTION hdb_catalog.hdb_schema_update_event_notifier() OWNER TO postgres;

--
-- Name: inject_table_defaults(text, text, text, text); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.inject_table_defaults(view_schema text, view_name text, tab_schema text, tab_name text) RETURNS void
    LANGUAGE plpgsql
    AS $$
    DECLARE
        r RECORD;
    BEGIN
      FOR r IN SELECT column_name, column_default FROM information_schema.columns WHERE table_schema = tab_schema AND table_name = tab_name AND column_default IS NOT NULL LOOP
          EXECUTE format('ALTER VIEW %I.%I ALTER COLUMN %I SET DEFAULT %s;', view_schema, view_name, r.column_name, r.column_default);
      END LOOP;
    END;
$$;


ALTER FUNCTION hdb_catalog.inject_table_defaults(view_schema text, view_name text, tab_schema text, tab_name text) OWNER TO postgres;

--
-- Name: insert_event_log(text, text, text, text, json); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.insert_event_log(schema_name text, table_name text, trigger_name text, op text, row_data json) RETURNS text
    LANGUAGE plpgsql
    AS $$
  DECLARE
    id text;
    payload json;
    session_variables json;
    server_version_num int;
  BEGIN
    id := gen_random_uuid();
    server_version_num := current_setting('server_version_num');
    IF server_version_num >= 90600 THEN
      session_variables := current_setting('hasura.user', 't');
    ELSE
      BEGIN
        session_variables := current_setting('hasura.user');
      EXCEPTION WHEN OTHERS THEN
                  session_variables := NULL;
      END;
    END IF;
    payload := json_build_object(
      'op', op,
      'data', row_data,
      'session_variables', session_variables
    );
    INSERT INTO hdb_catalog.event_log
                (id, schema_name, table_name, trigger_name, payload)
    VALUES
    (id, schema_name, table_name, trigger_name, payload);
    RETURN id;
  END;
$$;


ALTER FUNCTION hdb_catalog.insert_event_log(schema_name text, table_name text, trigger_name text, op text, row_data json) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.event_invocation_logs (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.event_invocation_logs OWNER TO postgres;

--
-- Name: event_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.event_log (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    schema_name text NOT NULL,
    table_name text NOT NULL,
    trigger_name text NOT NULL,
    payload jsonb NOT NULL,
    delivered boolean DEFAULT false NOT NULL,
    error boolean DEFAULT false NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    locked boolean DEFAULT false NOT NULL,
    next_retry_at timestamp without time zone,
    archived boolean DEFAULT false NOT NULL
);


ALTER TABLE hdb_catalog.event_log OWNER TO postgres;

--
-- Name: event_triggers; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.event_triggers (
    name text NOT NULL,
    type text NOT NULL,
    schema_name text NOT NULL,
    table_name text NOT NULL,
    configuration json,
    comment text
);


ALTER TABLE hdb_catalog.event_triggers OWNER TO postgres;

--
-- Name: hdb_allowlist; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_allowlist (
    collection_name text
);


ALTER TABLE hdb_catalog.hdb_allowlist OWNER TO postgres;

--
-- Name: hdb_check_constraint; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_check_constraint AS
 SELECT (n.nspname)::text AS table_schema,
    (ct.relname)::text AS table_name,
    (r.conname)::text AS constraint_name,
    pg_get_constraintdef(r.oid, true) AS "check"
   FROM ((pg_constraint r
     JOIN pg_class ct ON ((r.conrelid = ct.oid)))
     JOIN pg_namespace n ON ((ct.relnamespace = n.oid)))
  WHERE (r.contype = 'c'::"char");


ALTER TABLE hdb_catalog.hdb_check_constraint OWNER TO postgres;

--
-- Name: hdb_foreign_key_constraint; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_foreign_key_constraint AS
 SELECT (q.table_schema)::text AS table_schema,
    (q.table_name)::text AS table_name,
    (q.constraint_name)::text AS constraint_name,
    (min(q.constraint_oid))::integer AS constraint_oid,
    min((q.ref_table_table_schema)::text) AS ref_table_table_schema,
    min((q.ref_table)::text) AS ref_table,
    json_object_agg(ac.attname, afc.attname) AS column_mapping,
    min((q.confupdtype)::text) AS on_update,
    min((q.confdeltype)::text) AS on_delete,
    json_agg(ac.attname) AS columns,
    json_agg(afc.attname) AS ref_columns
   FROM ((( SELECT ctn.nspname AS table_schema,
            ct.relname AS table_name,
            r.conrelid AS table_id,
            r.conname AS constraint_name,
            r.oid AS constraint_oid,
            cftn.nspname AS ref_table_table_schema,
            cft.relname AS ref_table,
            r.confrelid AS ref_table_id,
            r.confupdtype,
            r.confdeltype,
            unnest(r.conkey) AS column_id,
            unnest(r.confkey) AS ref_column_id
           FROM ((((pg_constraint r
             JOIN pg_class ct ON ((r.conrelid = ct.oid)))
             JOIN pg_namespace ctn ON ((ct.relnamespace = ctn.oid)))
             JOIN pg_class cft ON ((r.confrelid = cft.oid)))
             JOIN pg_namespace cftn ON ((cft.relnamespace = cftn.oid)))
          WHERE (r.contype = 'f'::"char")) q
     JOIN pg_attribute ac ON (((q.column_id = ac.attnum) AND (q.table_id = ac.attrelid))))
     JOIN pg_attribute afc ON (((q.ref_column_id = afc.attnum) AND (q.ref_table_id = afc.attrelid))))
  GROUP BY q.table_schema, q.table_name, q.constraint_name;


ALTER TABLE hdb_catalog.hdb_foreign_key_constraint OWNER TO postgres;

--
-- Name: hdb_primary_key; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_primary_key AS
 SELECT tc.table_schema,
    tc.table_name,
    tc.constraint_name,
    json_agg(constraint_column_usage.column_name) AS columns
   FROM (information_schema.table_constraints tc
     JOIN ( SELECT x.tblschema AS table_schema,
            x.tblname AS table_name,
            x.colname AS column_name,
            x.cstrname AS constraint_name
           FROM ( SELECT DISTINCT nr.nspname,
                    r.relname,
                    a.attname,
                    c.conname
                   FROM pg_namespace nr,
                    pg_class r,
                    pg_attribute a,
                    pg_depend d,
                    pg_namespace nc,
                    pg_constraint c
                  WHERE ((nr.oid = r.relnamespace) AND (r.oid = a.attrelid) AND (d.refclassid = ('pg_class'::regclass)::oid) AND (d.refobjid = r.oid) AND (d.refobjsubid = a.attnum) AND (d.classid = ('pg_constraint'::regclass)::oid) AND (d.objid = c.oid) AND (c.connamespace = nc.oid) AND (c.contype = 'c'::"char") AND (r.relkind = ANY (ARRAY['r'::"char", 'p'::"char"])) AND (NOT a.attisdropped))
                UNION ALL
                 SELECT nr.nspname,
                    r.relname,
                    a.attname,
                    c.conname
                   FROM pg_namespace nr,
                    pg_class r,
                    pg_attribute a,
                    pg_namespace nc,
                    pg_constraint c
                  WHERE ((nr.oid = r.relnamespace) AND (r.oid = a.attrelid) AND (nc.oid = c.connamespace) AND (r.oid =
                        CASE c.contype
                            WHEN 'f'::"char" THEN c.confrelid
                            ELSE c.conrelid
                        END) AND (a.attnum = ANY (
                        CASE c.contype
                            WHEN 'f'::"char" THEN c.confkey
                            ELSE c.conkey
                        END)) AND (NOT a.attisdropped) AND (c.contype = ANY (ARRAY['p'::"char", 'u'::"char", 'f'::"char"])) AND (r.relkind = ANY (ARRAY['r'::"char", 'p'::"char"])))) x(tblschema, tblname, colname, cstrname)) constraint_column_usage ON ((((tc.constraint_name)::text = (constraint_column_usage.constraint_name)::text) AND ((tc.table_schema)::text = (constraint_column_usage.table_schema)::text) AND ((tc.table_name)::text = (constraint_column_usage.table_name)::text))))
  WHERE ((tc.constraint_type)::text = 'PRIMARY KEY'::text)
  GROUP BY tc.table_schema, tc.table_name, tc.constraint_name;


ALTER TABLE hdb_catalog.hdb_primary_key OWNER TO postgres;

--
-- Name: hdb_column; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_column AS
 WITH primary_key_references AS (
         SELECT fkey.table_schema AS src_table_schema,
            fkey.table_name AS src_table_name,
            (fkey.columns ->> 0) AS src_column_name,
            json_agg(json_build_object('schema', fkey.ref_table_table_schema, 'name', fkey.ref_table)) AS ref_tables
           FROM (hdb_catalog.hdb_foreign_key_constraint fkey
             JOIN hdb_catalog.hdb_primary_key pkey ON ((((pkey.table_schema)::name = fkey.ref_table_table_schema) AND ((pkey.table_name)::name = fkey.ref_table) AND ((pkey.columns)::jsonb = (fkey.ref_columns)::jsonb))))
          WHERE (json_array_length(fkey.columns) = 1)
          GROUP BY fkey.table_schema, fkey.table_name, (fkey.columns ->> 0)
        )
 SELECT columns.table_schema,
    columns.table_name,
    columns.column_name AS name,
    columns.udt_name AS type,
    columns.is_nullable,
    columns.ordinal_position,
    COALESCE(pkey_refs.ref_tables, '[]'::json) AS primary_key_references,
    col_description(pg_class.oid, (columns.ordinal_position)::integer) AS description
   FROM (((information_schema.columns
     JOIN pg_class ON ((pg_class.relname = (columns.table_name)::name)))
     JOIN pg_namespace ON (((pg_namespace.oid = pg_class.relnamespace) AND (pg_namespace.nspname = (columns.table_schema)::name))))
     LEFT JOIN primary_key_references pkey_refs ON ((((columns.table_schema)::name = pkey_refs.src_table_schema) AND ((columns.table_name)::name = pkey_refs.src_table_name) AND ((columns.column_name)::name = pkey_refs.src_column_name))));


ALTER TABLE hdb_catalog.hdb_column OWNER TO postgres;

--
-- Name: hdb_computed_field; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_computed_field (
    table_schema text NOT NULL,
    table_name text NOT NULL,
    computed_field_name text NOT NULL,
    definition jsonb NOT NULL,
    comment text
);


ALTER TABLE hdb_catalog.hdb_computed_field OWNER TO postgres;

--
-- Name: hdb_computed_field_function; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_computed_field_function AS
 SELECT hdb_computed_field.table_schema,
    hdb_computed_field.table_name,
    hdb_computed_field.computed_field_name,
        CASE
            WHEN (((hdb_computed_field.definition -> 'function'::text) ->> 'name'::text) IS NULL) THEN (hdb_computed_field.definition ->> 'function'::text)
            ELSE ((hdb_computed_field.definition -> 'function'::text) ->> 'name'::text)
        END AS function_name,
        CASE
            WHEN (((hdb_computed_field.definition -> 'function'::text) ->> 'schema'::text) IS NULL) THEN 'public'::text
            ELSE ((hdb_computed_field.definition -> 'function'::text) ->> 'schema'::text)
        END AS function_schema
   FROM hdb_catalog.hdb_computed_field;


ALTER TABLE hdb_catalog.hdb_computed_field_function OWNER TO postgres;

--
-- Name: hdb_function; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_function (
    function_schema text NOT NULL,
    function_name text NOT NULL,
    configuration jsonb DEFAULT '{}'::jsonb NOT NULL,
    is_system_defined boolean DEFAULT false
);


ALTER TABLE hdb_catalog.hdb_function OWNER TO postgres;

--
-- Name: hdb_function_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_function_agg AS
 SELECT (p.proname)::text AS function_name,
    (pn.nspname)::text AS function_schema,
    pd.description,
        CASE
            WHEN (p.provariadic = (0)::oid) THEN false
            ELSE true
        END AS has_variadic,
        CASE
            WHEN ((p.provolatile)::text = ('i'::character(1))::text) THEN 'IMMUTABLE'::text
            WHEN ((p.provolatile)::text = ('s'::character(1))::text) THEN 'STABLE'::text
            WHEN ((p.provolatile)::text = ('v'::character(1))::text) THEN 'VOLATILE'::text
            ELSE NULL::text
        END AS function_type,
    pg_get_functiondef(p.oid) AS function_definition,
    (rtn.nspname)::text AS return_type_schema,
    (rt.typname)::text AS return_type_name,
    (rt.typtype)::text AS return_type_type,
    p.proretset AS returns_set,
    ( SELECT COALESCE(json_agg(json_build_object('schema', q.schema, 'name', q.name, 'type', q.type)), '[]'::json) AS "coalesce"
           FROM ( SELECT pt.typname AS name,
                    pns.nspname AS schema,
                    pt.typtype AS type,
                    pat.ordinality
                   FROM ((unnest(COALESCE(p.proallargtypes, (p.proargtypes)::oid[])) WITH ORDINALITY pat(oid, ordinality)
                     LEFT JOIN pg_type pt ON ((pt.oid = pat.oid)))
                     LEFT JOIN pg_namespace pns ON ((pt.typnamespace = pns.oid)))
                  ORDER BY pat.ordinality) q) AS input_arg_types,
    to_json(COALESCE(p.proargnames, ARRAY[]::text[])) AS input_arg_names,
    p.pronargdefaults AS default_args,
    (p.oid)::integer AS function_oid
   FROM ((((pg_proc p
     JOIN pg_namespace pn ON ((pn.oid = p.pronamespace)))
     JOIN pg_type rt ON ((rt.oid = p.prorettype)))
     JOIN pg_namespace rtn ON ((rtn.oid = rt.typnamespace)))
     LEFT JOIN pg_description pd ON ((p.oid = pd.objoid)))
  WHERE (((pn.nspname)::text !~~ 'pg_%'::text) AND ((pn.nspname)::text <> ALL (ARRAY['information_schema'::text, 'hdb_catalog'::text, 'hdb_views'::text])) AND (NOT (EXISTS ( SELECT 1
           FROM pg_aggregate
          WHERE ((pg_aggregate.aggfnoid)::oid = p.oid)))));


ALTER TABLE hdb_catalog.hdb_function_agg OWNER TO postgres;

--
-- Name: hdb_function_info_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_function_info_agg AS
 SELECT hdb_function_agg.function_name,
    hdb_function_agg.function_schema,
    row_to_json(( SELECT e.*::record AS e
           FROM ( SELECT hdb_function_agg.description,
                    hdb_function_agg.has_variadic,
                    hdb_function_agg.function_type,
                    hdb_function_agg.return_type_schema,
                    hdb_function_agg.return_type_name,
                    hdb_function_agg.return_type_type,
                    hdb_function_agg.returns_set,
                    hdb_function_agg.input_arg_types,
                    hdb_function_agg.input_arg_names,
                    hdb_function_agg.default_args,
                    (EXISTS ( SELECT 1
                           FROM information_schema.tables
                          WHERE (((tables.table_schema)::name = hdb_function_agg.return_type_schema) AND ((tables.table_name)::name = hdb_function_agg.return_type_name)))) AS returns_table) e)) AS function_info
   FROM hdb_catalog.hdb_function_agg;


ALTER TABLE hdb_catalog.hdb_function_info_agg OWNER TO postgres;

--
-- Name: hdb_permission; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_permission (
    table_schema text NOT NULL,
    table_name text NOT NULL,
    role_name text NOT NULL,
    perm_type text NOT NULL,
    perm_def jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false,
    CONSTRAINT hdb_permission_perm_type_check CHECK ((perm_type = ANY (ARRAY['insert'::text, 'select'::text, 'update'::text, 'delete'::text])))
);


ALTER TABLE hdb_catalog.hdb_permission OWNER TO postgres;

--
-- Name: hdb_permission_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_permission_agg AS
 SELECT hdb_permission.table_schema,
    hdb_permission.table_name,
    hdb_permission.role_name,
    json_object_agg(hdb_permission.perm_type, hdb_permission.perm_def) AS permissions
   FROM hdb_catalog.hdb_permission
  GROUP BY hdb_permission.table_schema, hdb_permission.table_name, hdb_permission.role_name;


ALTER TABLE hdb_catalog.hdb_permission_agg OWNER TO postgres;

--
-- Name: hdb_query_collection; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_query_collection (
    collection_name text NOT NULL,
    collection_defn jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false
);


ALTER TABLE hdb_catalog.hdb_query_collection OWNER TO postgres;

--
-- Name: hdb_relationship; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_relationship (
    table_schema text NOT NULL,
    table_name text NOT NULL,
    rel_name text NOT NULL,
    rel_type text,
    rel_def jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false,
    CONSTRAINT hdb_relationship_rel_type_check CHECK ((rel_type = ANY (ARRAY['object'::text, 'array'::text])))
);


ALTER TABLE hdb_catalog.hdb_relationship OWNER TO postgres;

--
-- Name: hdb_schema_update_event; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_schema_update_event (
    instance_id uuid NOT NULL,
    occurred_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE hdb_catalog.hdb_schema_update_event OWNER TO postgres;

--
-- Name: hdb_table; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_table (
    table_schema text NOT NULL,
    table_name text NOT NULL,
    configuration jsonb,
    is_system_defined boolean DEFAULT false,
    is_enum boolean DEFAULT false NOT NULL
);


ALTER TABLE hdb_catalog.hdb_table OWNER TO postgres;

--
-- Name: hdb_table_info_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_table_info_agg AS
 SELECT tables.table_name,
    tables.table_schema,
    descriptions.description,
    COALESCE(columns.columns, '[]'::json) AS columns,
    COALESCE(pk.columns, '[]'::json) AS primary_key_columns,
    COALESCE(constraints.constraints, '[]'::json) AS constraints,
    COALESCE(views.view_info, 'null'::json) AS view_info
   FROM (((((information_schema.tables tables
     LEFT JOIN ( SELECT c.table_name,
            c.table_schema,
            json_agg(json_build_object('name', c.name, 'type', c.type, 'is_nullable', (c.is_nullable)::boolean, 'references', c.primary_key_references, 'description', c.description)) AS columns
           FROM hdb_catalog.hdb_column c
          GROUP BY c.table_schema, c.table_name) columns ON ((((tables.table_schema)::name = (columns.table_schema)::name) AND ((tables.table_name)::name = (columns.table_name)::name))))
     LEFT JOIN ( SELECT hdb_primary_key.table_schema,
            hdb_primary_key.table_name,
            hdb_primary_key.constraint_name,
            hdb_primary_key.columns
           FROM hdb_catalog.hdb_primary_key) pk ON ((((tables.table_schema)::name = (pk.table_schema)::name) AND ((tables.table_name)::name = (pk.table_name)::name))))
     LEFT JOIN ( SELECT c.table_schema,
            c.table_name,
            json_agg(c.constraint_name) AS constraints
           FROM information_schema.table_constraints c
          WHERE (((c.constraint_type)::text = 'UNIQUE'::text) OR ((c.constraint_type)::text = 'PRIMARY KEY'::text))
          GROUP BY c.table_schema, c.table_name) constraints ON ((((tables.table_schema)::name = (constraints.table_schema)::name) AND ((tables.table_name)::name = (constraints.table_name)::name))))
     LEFT JOIN ( SELECT v.table_schema,
            v.table_name,
            json_build_object('is_updatable', ((v.is_updatable)::boolean OR (v.is_trigger_updatable)::boolean), 'is_deletable', ((v.is_updatable)::boolean OR (v.is_trigger_deletable)::boolean), 'is_insertable', ((v.is_insertable_into)::boolean OR (v.is_trigger_insertable_into)::boolean)) AS view_info
           FROM information_schema.views v) views ON ((((tables.table_schema)::name = (views.table_schema)::name) AND ((tables.table_name)::name = (views.table_name)::name))))
     LEFT JOIN ( SELECT pc.relname AS table_name,
            pn.nspname AS table_schema,
            pd.description
           FROM ((pg_class pc
             LEFT JOIN pg_namespace pn ON ((pn.oid = pc.relnamespace)))
             LEFT JOIN pg_description pd ON ((pd.objoid = pc.oid)))
          WHERE (pd.objsubid = 0)) descriptions ON ((((tables.table_schema)::name = descriptions.table_schema) AND ((tables.table_name)::name = descriptions.table_name))));


ALTER TABLE hdb_catalog.hdb_table_info_agg OWNER TO postgres;

--
-- Name: hdb_unique_constraint; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_unique_constraint AS
 SELECT tc.table_name,
    tc.constraint_schema AS table_schema,
    tc.constraint_name,
    json_agg(kcu.column_name) AS columns
   FROM (information_schema.table_constraints tc
     JOIN information_schema.key_column_usage kcu USING (constraint_schema, constraint_name))
  WHERE ((tc.constraint_type)::text = 'UNIQUE'::text)
  GROUP BY tc.table_name, tc.constraint_schema, tc.constraint_name;


ALTER TABLE hdb_catalog.hdb_unique_constraint OWNER TO postgres;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO postgres;

--
-- Name: remote_schemas; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.remote_schemas (
    id bigint NOT NULL,
    name text,
    definition json,
    comment text
);


ALTER TABLE hdb_catalog.remote_schemas OWNER TO postgres;

--
-- Name: remote_schemas_id_seq; Type: SEQUENCE; Schema: hdb_catalog; Owner: postgres
--

CREATE SEQUENCE hdb_catalog.remote_schemas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hdb_catalog.remote_schemas_id_seq OWNER TO postgres;

--
-- Name: remote_schemas_id_seq; Type: SEQUENCE OWNED BY; Schema: hdb_catalog; Owner: postgres
--

ALTER SEQUENCE hdb_catalog.remote_schemas_id_seq OWNED BY hdb_catalog.remote_schemas.id;


--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    "addressID" integer NOT NULL,
    address text NOT NULL,
    "districtID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "cityID" integer NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- Name: Address_addressID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Address_addressID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Address_addressID_seq" OWNER TO postgres;

--
-- Name: Address_addressID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Address_addressID_seq" OWNED BY public."Address"."addressID";


--
-- Name: ArchSite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSite" (
    "archSiteID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "locationID" integer NOT NULL,
    name text NOT NULL,
    description text,
    age integer,
    period text,
    altitude real,
    diameter real,
    destruction text,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "averageTime" integer
);


ALTER TABLE public."ArchSite" OWNER TO postgres;

--
-- Name: ArchSiteComment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteComment" (
    "archSiteCommentID" integer NOT NULL,
    "archSiteID" integer NOT NULL,
    "userID" integer NOT NULL,
    content text NOT NULL,
    date timestamp with time zone NOT NULL,
    star real DEFAULT 0 NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteComment" OWNER TO postgres;

--
-- Name: ArchSiteComment_archSiteCommentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteComment_archSiteCommentID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteComment_archSiteCommentID_seq" OWNER TO postgres;

--
-- Name: ArchSiteComment_archSiteCommentID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteComment_archSiteCommentID_seq" OWNED BY public."ArchSiteComment"."archSiteCommentID";


--
-- Name: ArchSiteEntranceType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteEntranceType" (
    "archSiteEntranceTypeID" integer NOT NULL,
    content text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteEntranceType" OWNER TO postgres;

--
-- Name: ArchSiteEntranceType_archSiteEntranceTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteEntranceType_archSiteEntranceTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteEntranceType_archSiteEntranceTypeID_seq" OWNER TO postgres;

--
-- Name: ArchSiteEntranceType_archSiteEntranceTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteEntranceType_archSiteEntranceTypeID_seq" OWNED BY public."ArchSiteEntranceType"."archSiteEntranceTypeID";


--
-- Name: ArchSitePrice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSitePrice" (
    "archSitePriceID" integer NOT NULL,
    price real NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "finishDate" timestamp with time zone NOT NULL,
    "archSiteID" integer NOT NULL,
    "archSiteEntranceTypeID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSitePrice" OWNER TO postgres;

--
-- Name: ArchSitePrice_archSitePriceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSitePrice_archSitePriceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSitePrice_archSitePriceID_seq" OWNER TO postgres;

--
-- Name: ArchSitePrice_archSitePriceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSitePrice_archSitePriceID_seq" OWNED BY public."ArchSitePrice"."archSitePriceID";


--
-- Name: ArchSiteType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteType" (
    "archSiteTypeID" integer NOT NULL,
    name text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteType" OWNER TO postgres;

--
-- Name: ArchSiteTypeArchSite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteTypeArchSite" (
    "archSiteTypeArchSiteID" integer NOT NULL,
    "archSiteTypeID" integer NOT NULL,
    "archSiteID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteTypeArchSite" OWNER TO postgres;

--
-- Name: ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq" OWNER TO postgres;

--
-- Name: ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq" OWNED BY public."ArchSiteTypeArchSite"."archSiteTypeArchSiteID";


--
-- Name: ArchSiteType_archSiteTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteType_archSiteTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteType_archSiteTypeID_seq" OWNER TO postgres;

--
-- Name: ArchSiteType_archSiteTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteType_archSiteTypeID_seq" OWNED BY public."ArchSiteType"."archSiteTypeID";


--
-- Name: ArchSiteWorkingDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteWorkingDay" (
    "archSiteWorkingDayID" integer NOT NULL,
    "openHour" time with time zone NOT NULL,
    "closeHour" time with time zone NOT NULL,
    "dayID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteWorkingDay" OWNER TO postgres;

--
-- Name: ArchSiteWorkingDaySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteWorkingDaySchedule" (
    "archSiteWorkingDayScheduleID" integer NOT NULL,
    "archSiteWorkingDayID" integer NOT NULL,
    "archSiteWorkingScheduleID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteWorkingDaySchedule" OWNER TO postgres;

--
-- Name: ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq" OWNER TO postgres;

--
-- Name: ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq" OWNED BY public."ArchSiteWorkingDaySchedule"."archSiteWorkingDayScheduleID";


--
-- Name: ArchSiteWorkingDay_archSiteWorkingDayID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteWorkingDay_archSiteWorkingDayID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteWorkingDay_archSiteWorkingDayID_seq" OWNER TO postgres;

--
-- Name: ArchSiteWorkingDay_archSiteWorkingDayID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteWorkingDay_archSiteWorkingDayID_seq" OWNED BY public."ArchSiteWorkingDay"."archSiteWorkingDayID";


--
-- Name: ArchSiteWorkingSchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteWorkingSchedule" (
    "archSiteWorkingScheduleID" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "finishDate" timestamp with time zone NOT NULL,
    "archSiteID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArchSiteWorkingSchedule" OWNER TO postgres;

--
-- Name: ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq" OWNER TO postgres;

--
-- Name: ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq" OWNED BY public."ArchSiteWorkingSchedule"."archSiteWorkingScheduleID";


--
-- Name: ArchSite_archSiteID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArchSite_archSiteID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArchSite_archSiteID_seq" OWNER TO postgres;

--
-- Name: ArchSite_archSiteID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArchSite_archSiteID_seq" OWNED BY public."ArchSite"."archSiteID";


--
-- Name: Article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Article" (
    "articleID" integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "publishDate" timestamp with time zone NOT NULL,
    "editDate" timestamp with time zone NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "imageUrl" text
);


ALTER TABLE public."Article" OWNER TO postgres;

--
-- Name: ArticleTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArticleTag" (
    "articleTagID" integer NOT NULL,
    "articleID" integer NOT NULL,
    "tagID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArticleTag" OWNER TO postgres;

--
-- Name: ArticleTag_articleTagID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArticleTag_articleTagID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArticleTag_articleTagID_seq" OWNER TO postgres;

--
-- Name: ArticleTag_articleTagID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArticleTag_articleTagID_seq" OWNED BY public."ArticleTag"."articleTagID";


--
-- Name: ArticleUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArticleUser" (
    "articleUserID" integer NOT NULL,
    "userID" integer NOT NULL,
    "articleID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ArticleUser" OWNER TO postgres;

--
-- Name: ArticleUser_articleUserID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ArticleUser_articleUserID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArticleUser_articleUserID_seq" OWNER TO postgres;

--
-- Name: ArticleUser_articleUserID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ArticleUser_articleUserID_seq" OWNED BY public."ArticleUser"."articleUserID";


--
-- Name: Article_articleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Article_articleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Article_articleID_seq" OWNER TO postgres;

--
-- Name: Article_articleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Article_articleID_seq" OWNED BY public."Article"."articleID";


--
-- Name: City; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."City" (
    "cityID" integer NOT NULL,
    city text NOT NULL,
    "countryID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    description text,
    "imageUrl" text,
    "locationID" integer,
    "regionID" integer
);


ALTER TABLE public."City" OWNER TO postgres;

--
-- Name: City_cityID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."City_cityID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."City_cityID_seq" OWNER TO postgres;

--
-- Name: City_cityID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."City_cityID_seq" OWNED BY public."City"."cityID";


--
-- Name: Company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Company" (
    "companyID" integer NOT NULL,
    name text NOT NULL,
    "taxNumber" text NOT NULL,
    mail text NOT NULL,
    "registerDate" timestamp with time zone NOT NULL,
    "logoUrl" text,
    description text,
    "locationID" integer NOT NULL,
    "faxNumber" text,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Company" OWNER TO postgres;

--
-- Name: CompanyContact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompanyContact" (
    "companyContactID" integer NOT NULL,
    "compantUserID" integer NOT NULL,
    authority text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."CompanyContact" OWNER TO postgres;

--
-- Name: CompanyContact_companyContactID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CompanyContact_companyContactID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CompanyContact_companyContactID_seq" OWNER TO postgres;

--
-- Name: CompanyContact_companyContactID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CompanyContact_companyContactID_seq" OWNED BY public."CompanyContact"."companyContactID";


--
-- Name: CompanyPhone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompanyPhone" (
    "companyPhoneID" integer NOT NULL,
    "phoneID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."CompanyPhone" OWNER TO postgres;

--
-- Name: CompanyPhone_companyPhoneID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CompanyPhone_companyPhoneID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CompanyPhone_companyPhoneID_seq" OWNER TO postgres;

--
-- Name: CompanyPhone_companyPhoneID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CompanyPhone_companyPhoneID_seq" OWNED BY public."CompanyPhone"."companyPhoneID";


--
-- Name: CompanyUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompanyUser" (
    "companyUserID" integer NOT NULL,
    "userID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."CompanyUser" OWNER TO postgres;

--
-- Name: CompanyUser_companyUserID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CompanyUser_companyUserID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CompanyUser_companyUserID_seq" OWNER TO postgres;

--
-- Name: CompanyUser_companyUserID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CompanyUser_companyUserID_seq" OWNED BY public."CompanyUser"."companyUserID";


--
-- Name: Company_companyID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Company_companyID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Company_companyID_seq" OWNER TO postgres;

--
-- Name: Company_companyID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Company_companyID_seq" OWNED BY public."Company"."companyID";


--
-- Name: Country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Country" (
    "countryID" integer NOT NULL,
    country text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Country" OWNER TO postgres;

--
-- Name: Country_countryID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Country_countryID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Country_countryID_seq" OWNER TO postgres;

--
-- Name: Country_countryID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Country_countryID_seq" OWNED BY public."Country"."countryID";


--
-- Name: Day; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Day" (
    "dayID" integer NOT NULL,
    name text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Day" OWNER TO postgres;

--
-- Name: Day_dayID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Day_dayID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Day_dayID_seq" OWNER TO postgres;

--
-- Name: Day_dayID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Day_dayID_seq" OWNED BY public."Day"."dayID";


--
-- Name: District; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."District" (
    "districtID" integer NOT NULL,
    district text NOT NULL,
    "cityID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."District" OWNER TO postgres;

--
-- Name: District_districtID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."District_districtID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."District_districtID_seq" OWNER TO postgres;

--
-- Name: District_districtID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."District_districtID_seq" OWNED BY public."District"."districtID";


--
-- Name: Hotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hotel" (
    "hotelID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "locationID" integer NOT NULL,
    name text NOT NULL,
    description text,
    star real DEFAULT 0,
    "taxNumber" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Hotel" OWNER TO postgres;

--
-- Name: HotelComment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HotelComment" (
    "hotelCommentID" integer NOT NULL,
    "hotelID" integer NOT NULL,
    "userID" integer NOT NULL,
    content text NOT NULL,
    date timestamp with time zone NOT NULL,
    star real DEFAULT 0 NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."HotelComment" OWNER TO postgres;

--
-- Name: HotelComment_hotelCommentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HotelComment_hotelCommentID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HotelComment_hotelCommentID_seq" OWNER TO postgres;

--
-- Name: HotelComment_hotelCommentID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HotelComment_hotelCommentID_seq" OWNED BY public."HotelComment"."hotelCommentID";


--
-- Name: HotelRoom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HotelRoom" (
    "hotelRoomID" integer NOT NULL,
    "hotelID" integer NOT NULL,
    "roomID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."HotelRoom" OWNER TO postgres;

--
-- Name: HotelRoom_hotelRoomID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HotelRoom_hotelRoomID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HotelRoom_hotelRoomID_seq" OWNER TO postgres;

--
-- Name: HotelRoom_hotelRoomID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HotelRoom_hotelRoomID_seq" OWNED BY public."HotelRoom"."hotelRoomID";


--
-- Name: HotelService; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HotelService" (
    "hotelServiceHotelID" integer NOT NULL,
    "hotelID" integer NOT NULL,
    "hotelServicePropertyID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."HotelService" OWNER TO postgres;

--
-- Name: HotelServiceProperty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HotelServiceProperty" (
    "hotelServicePropertyID" integer NOT NULL,
    content text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."HotelServiceProperty" OWNER TO postgres;

--
-- Name: HotelServiceProperty_hotelServicePropertyID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HotelServiceProperty_hotelServicePropertyID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HotelServiceProperty_hotelServicePropertyID_seq" OWNER TO postgres;

--
-- Name: HotelServiceProperty_hotelServicePropertyID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HotelServiceProperty_hotelServicePropertyID_seq" OWNED BY public."HotelServiceProperty"."hotelServicePropertyID";


--
-- Name: HotelService_hotelServiceHotelID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HotelService_hotelServiceHotelID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HotelService_hotelServiceHotelID_seq" OWNER TO postgres;

--
-- Name: HotelService_hotelServiceHotelID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HotelService_hotelServiceHotelID_seq" OWNED BY public."HotelService"."hotelServiceHotelID";


--
-- Name: Hotel_hotelID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Hotel_hotelID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Hotel_hotelID_seq" OWNER TO postgres;

--
-- Name: Hotel_hotelID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Hotel_hotelID_seq" OWNED BY public."Hotel"."hotelID";


--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    "locationID" integer NOT NULL,
    latitude real NOT NULL,
    longtitude real NOT NULL,
    "addressID" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: Location_locationID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Location_locationID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Location_locationID_seq" OWNER TO postgres;

--
-- Name: Location_locationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Location_locationID_seq" OWNED BY public."Location"."locationID";


--
-- Name: LoginType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LoginType" (
    "loginTypeID" integer NOT NULL,
    type text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."LoginType" OWNER TO postgres;

--
-- Name: LoginType_loginTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LoginType_loginTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LoginType_loginTypeID_seq" OWNER TO postgres;

--
-- Name: LoginType_loginTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LoginType_loginTypeID_seq" OWNED BY public."LoginType"."loginTypeID";


--
-- Name: Museum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Museum" (
    "museumID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "locationID" integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "averageTime" integer
);


ALTER TABLE public."Museum" OWNER TO postgres;

--
-- Name: MuseumComment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumComment" (
    "museumCommentID" integer NOT NULL,
    "museumID" integer NOT NULL,
    "userID" integer NOT NULL,
    content text NOT NULL,
    date timestamp with time zone NOT NULL,
    star real DEFAULT 0 NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumComment" OWNER TO postgres;

--
-- Name: MuseumComment_museumCommentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumComment_museumCommentID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumComment_museumCommentID_seq" OWNER TO postgres;

--
-- Name: MuseumComment_museumCommentID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumComment_museumCommentID_seq" OWNED BY public."MuseumComment"."museumCommentID";


--
-- Name: MuseumEntranceType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumEntranceType" (
    "museumEntranceTypeID" integer NOT NULL,
    content text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumEntranceType" OWNER TO postgres;

--
-- Name: MuseumEntranceType_museumEntranceTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumEntranceType_museumEntranceTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumEntranceType_museumEntranceTypeID_seq" OWNER TO postgres;

--
-- Name: MuseumEntranceType_museumEntranceTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumEntranceType_museumEntranceTypeID_seq" OWNED BY public."MuseumEntranceType"."museumEntranceTypeID";


--
-- Name: MuseumPrice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumPrice" (
    "museumPriceID" integer NOT NULL,
    price real NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "finishDate" timestamp with time zone NOT NULL,
    "museumID" integer NOT NULL,
    "entranceTypeID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumPrice" OWNER TO postgres;

--
-- Name: MuseumPrice_museumPriceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumPrice_museumPriceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumPrice_museumPriceID_seq" OWNER TO postgres;

--
-- Name: MuseumPrice_museumPriceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumPrice_museumPriceID_seq" OWNED BY public."MuseumPrice"."museumPriceID";


--
-- Name: MuseumType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumType" (
    "museumTypeID" integer NOT NULL,
    type text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumType" OWNER TO postgres;

--
-- Name: MuseumTypeMuseum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumTypeMuseum" (
    "museumTypeMuseumID" integer NOT NULL,
    "museumID" integer NOT NULL,
    "museumTypeID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumTypeMuseum" OWNER TO postgres;

--
-- Name: MuseumTypeMuseum_museumTypeMuseumID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumTypeMuseum_museumTypeMuseumID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumTypeMuseum_museumTypeMuseumID_seq" OWNER TO postgres;

--
-- Name: MuseumTypeMuseum_museumTypeMuseumID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumTypeMuseum_museumTypeMuseumID_seq" OWNED BY public."MuseumTypeMuseum"."museumTypeMuseumID";


--
-- Name: MuseumType_museumTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumType_museumTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumType_museumTypeID_seq" OWNER TO postgres;

--
-- Name: MuseumType_museumTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumType_museumTypeID_seq" OWNED BY public."MuseumType"."museumTypeID";


--
-- Name: MuseumWorkingDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumWorkingDay" (
    "museumWorkingDayID" integer NOT NULL,
    "openHour" time with time zone NOT NULL,
    "closeHour" time with time zone NOT NULL,
    "dayID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumWorkingDay" OWNER TO postgres;

--
-- Name: MuseumWorkingDaySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumWorkingDaySchedule" (
    "museumWorkingDayScheduleID" integer NOT NULL,
    "museumWorkingDayID" integer NOT NULL,
    "museumWorkingScheduleID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumWorkingDaySchedule" OWNER TO postgres;

--
-- Name: MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq" OWNER TO postgres;

--
-- Name: MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq" OWNED BY public."MuseumWorkingDaySchedule"."museumWorkingDayScheduleID";


--
-- Name: MuseumWorkingDay_museumWorkingDayID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumWorkingDay_museumWorkingDayID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumWorkingDay_museumWorkingDayID_seq" OWNER TO postgres;

--
-- Name: MuseumWorkingDay_museumWorkingDayID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumWorkingDay_museumWorkingDayID_seq" OWNED BY public."MuseumWorkingDay"."museumWorkingDayID";


--
-- Name: MuseumWorkingSchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumWorkingSchedule" (
    "museumWorkingScheduleID" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "finishDate" timestamp with time zone NOT NULL,
    "museumID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MuseumWorkingSchedule" OWNER TO postgres;

--
-- Name: MuseumWorkingSchedule_museumWorkingScheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuseumWorkingSchedule_museumWorkingScheduleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MuseumWorkingSchedule_museumWorkingScheduleID_seq" OWNER TO postgres;

--
-- Name: MuseumWorkingSchedule_museumWorkingScheduleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuseumWorkingSchedule_museumWorkingScheduleID_seq" OWNED BY public."MuseumWorkingSchedule"."museumWorkingScheduleID";


--
-- Name: Museum_museumID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Museum_museumID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Museum_museumID_seq" OWNER TO postgres;

--
-- Name: Museum_museumID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Museum_museumID_seq" OWNED BY public."Museum"."museumID";


--
-- Name: Phone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Phone" (
    "phoneID" integer NOT NULL,
    phone text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Phone" OWNER TO postgres;

--
-- Name: Phone_phoneID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Phone_phoneID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Phone_phoneID_seq" OWNER TO postgres;

--
-- Name: Phone_phoneID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Phone_phoneID_seq" OWNED BY public."Phone"."phoneID";


--
-- Name: Region; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Region" (
    "regionID" integer NOT NULL,
    region text NOT NULL
);


ALTER TABLE public."Region" OWNER TO postgres;

--
-- Name: Region_regionID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Region_regionID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Region_regionID_seq" OWNER TO postgres;

--
-- Name: Region_regionID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Region_regionID_seq" OWNED BY public."Region"."regionID";


--
-- Name: Restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Restaurant" (
    "restaurantID" integer NOT NULL,
    name text NOT NULL,
    "restaurantTypeID" integer NOT NULL,
    "ISO" text,
    since date NOT NULL,
    star real DEFAULT 0,
    "locationID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "taxNumber" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Restaurant" OWNER TO postgres;

--
-- Name: RestaurantAndCuisineType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantAndCuisineType" (
    "restaurantAndCuisineTypeID" integer NOT NULL,
    "restaurantID" integer NOT NULL,
    "restaurantCuisineTypeID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantAndCuisineType" OWNER TO postgres;

--
-- Name: RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq" OWNER TO postgres;

--
-- Name: RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq" OWNED BY public."RestaurantAndCuisineType"."restaurantAndCuisineTypeID";


--
-- Name: RestaurantComment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantComment" (
    "restaurantCommentID" integer NOT NULL,
    "restaurantID" integer NOT NULL,
    "userID" integer NOT NULL,
    content text NOT NULL,
    date timestamp with time zone NOT NULL,
    star real DEFAULT 0 NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantComment" OWNER TO postgres;

--
-- Name: RestaurantComment_restaurantCommentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantComment_restaurantCommentID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantComment_restaurantCommentID_seq" OWNER TO postgres;

--
-- Name: RestaurantComment_restaurantCommentID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantComment_restaurantCommentID_seq" OWNED BY public."RestaurantComment"."restaurantCommentID";


--
-- Name: RestaurantCuisineType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantCuisineType" (
    "restaurantCuisineTypeID" integer NOT NULL,
    name text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantCuisineType" OWNER TO postgres;

--
-- Name: RestaurantCuisineType_restaurantCuisineTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantCuisineType_restaurantCuisineTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantCuisineType_restaurantCuisineTypeID_seq" OWNER TO postgres;

--
-- Name: RestaurantCuisineType_restaurantCuisineTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantCuisineType_restaurantCuisineTypeID_seq" OWNED BY public."RestaurantCuisineType"."restaurantCuisineTypeID";


--
-- Name: RestaurantFood; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantFood" (
    "restaurantFoodID" integer NOT NULL,
    name text NOT NULL,
    "restaurantFoodTypeID" integer NOT NULL,
    price real,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantFood" OWNER TO postgres;

--
-- Name: RestaurantFoodType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantFoodType" (
    "restaurantFoodTypeID" integer NOT NULL,
    type text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantFoodType" OWNER TO postgres;

--
-- Name: RestaurantFoodType_restaurantFoodTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantFoodType_restaurantFoodTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantFoodType_restaurantFoodTypeID_seq" OWNER TO postgres;

--
-- Name: RestaurantFoodType_restaurantFoodTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantFoodType_restaurantFoodTypeID_seq" OWNED BY public."RestaurantFoodType"."restaurantFoodTypeID";


--
-- Name: RestaurantFood_restaurantFoodID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantFood_restaurantFoodID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantFood_restaurantFoodID_seq" OWNER TO postgres;

--
-- Name: RestaurantFood_restaurantFoodID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantFood_restaurantFoodID_seq" OWNED BY public."RestaurantFood"."restaurantFoodID";


--
-- Name: RestaurantMenu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantMenu" (
    "restaurantMenuID" integer NOT NULL,
    name text NOT NULL,
    "restaurantID" integer NOT NULL,
    price real NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantMenu" OWNER TO postgres;

--
-- Name: RestaurantMenuFood; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantMenuFood" (
    "restaurantMenuFoodID" integer NOT NULL,
    "restaurantMenuID" integer NOT NULL,
    "restaurantFoodID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantMenuFood" OWNER TO postgres;

--
-- Name: RestaurantMenuFood_restaurantMenuFoodID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantMenuFood_restaurantMenuFoodID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantMenuFood_restaurantMenuFoodID_seq" OWNER TO postgres;

--
-- Name: RestaurantMenuFood_restaurantMenuFoodID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantMenuFood_restaurantMenuFoodID_seq" OWNED BY public."RestaurantMenuFood"."restaurantMenuFoodID";


--
-- Name: RestaurantMenu_restaurantMenuID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantMenu_restaurantMenuID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantMenu_restaurantMenuID_seq" OWNER TO postgres;

--
-- Name: RestaurantMenu_restaurantMenuID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantMenu_restaurantMenuID_seq" OWNED BY public."RestaurantMenu"."restaurantMenuID";


--
-- Name: RestaurantType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantType" (
    "restaurantTypeID" integer NOT NULL,
    type text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantType" OWNER TO postgres;

--
-- Name: RestaurantType_restaurantTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantType_restaurantTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantType_restaurantTypeID_seq" OWNER TO postgres;

--
-- Name: RestaurantType_restaurantTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantType_restaurantTypeID_seq" OWNED BY public."RestaurantType"."restaurantTypeID";


--
-- Name: RestaurantWorkingDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantWorkingDay" (
    "restaurantWorkingDayID" integer NOT NULL,
    "openHour" time with time zone NOT NULL,
    "closeHour" time with time zone NOT NULL,
    "dayID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantWorkingDay" OWNER TO postgres;

--
-- Name: RestaurantWorkingDaySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantWorkingDaySchedule" (
    "restaurantWorkingDaySchedule" integer NOT NULL,
    "restaurantWorkingDayID" integer NOT NULL,
    "restaurantWorkingScheduleID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantWorkingDaySchedule" OWNER TO postgres;

--
-- Name: RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq" OWNER TO postgres;

--
-- Name: RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq" OWNED BY public."RestaurantWorkingDaySchedule"."restaurantWorkingDaySchedule";


--
-- Name: RestaurantWorkingDay_restaurantWorkingDayID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantWorkingDay_restaurantWorkingDayID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantWorkingDay_restaurantWorkingDayID_seq" OWNER TO postgres;

--
-- Name: RestaurantWorkingDay_restaurantWorkingDayID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantWorkingDay_restaurantWorkingDayID_seq" OWNED BY public."RestaurantWorkingDay"."restaurantWorkingDayID";


--
-- Name: RestaurantWorkingSchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantWorkingSchedule" (
    "restaurantWorkingScheduleID" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "finishDate" timestamp with time zone NOT NULL,
    "restaurantID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RestaurantWorkingSchedule" OWNER TO postgres;

--
-- Name: RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq" OWNER TO postgres;

--
-- Name: RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq" OWNED BY public."RestaurantWorkingSchedule"."restaurantWorkingScheduleID";


--
-- Name: Restaurant_restaurantID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Restaurant_restaurantID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Restaurant_restaurantID_seq" OWNER TO postgres;

--
-- Name: Restaurant_restaurantID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Restaurant_restaurantID_seq" OWNED BY public."Restaurant"."restaurantID";


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    "roomID" integer NOT NULL,
    "roomNo" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: RoomPicture; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomPicture" (
    "roomPictureID" integer NOT NULL,
    url text NOT NULL,
    "addDate" timestamp with time zone NOT NULL,
    "roomID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RoomPicture" OWNER TO postgres;

--
-- Name: RoomPicture_roomPictureID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RoomPicture_roomPictureID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RoomPicture_roomPictureID_seq" OWNER TO postgres;

--
-- Name: RoomPicture_roomPictureID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RoomPicture_roomPictureID_seq" OWNED BY public."RoomPicture"."roomPictureID";


--
-- Name: RoomPrice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomPrice" (
    "roomPriceID" integer NOT NULL,
    price real NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "finishDate" timestamp with time zone NOT NULL,
    "roomID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RoomPrice" OWNER TO postgres;

--
-- Name: RoomPrice_roomPriceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RoomPrice_roomPriceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RoomPrice_roomPriceID_seq" OWNER TO postgres;

--
-- Name: RoomPrice_roomPriceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RoomPrice_roomPriceID_seq" OWNED BY public."RoomPrice"."roomPriceID";


--
-- Name: RoomProperty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomProperty" (
    "roomPropertyID" integer NOT NULL,
    content text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RoomProperty" OWNER TO postgres;

--
-- Name: RoomPropertyRoom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomPropertyRoom" (
    "roomPropertyRoomID" integer NOT NULL,
    "roomID" integer NOT NULL,
    "roomPropertyID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RoomPropertyRoom" OWNER TO postgres;

--
-- Name: RoomPropertyRoom_roomPropertyRoomID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RoomPropertyRoom_roomPropertyRoomID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RoomPropertyRoom_roomPropertyRoomID_seq" OWNER TO postgres;

--
-- Name: RoomPropertyRoom_roomPropertyRoomID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RoomPropertyRoom_roomPropertyRoomID_seq" OWNED BY public."RoomPropertyRoom"."roomPropertyRoomID";


--
-- Name: RoomProperty_roomPropertyID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RoomProperty_roomPropertyID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RoomProperty_roomPropertyID_seq" OWNER TO postgres;

--
-- Name: RoomProperty_roomPropertyID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RoomProperty_roomPropertyID_seq" OWNED BY public."RoomProperty"."roomPropertyID";


--
-- Name: Room_roomID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Room_roomID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Room_roomID_seq" OWNER TO postgres;

--
-- Name: Room_roomID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Room_roomID_seq" OWNED BY public."Room"."roomID";


--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    "tagID" integer NOT NULL,
    name text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: Tag_tagID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tag_tagID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tag_tagID_seq" OWNER TO postgres;

--
-- Name: Tag_tagID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tag_tagID_seq" OWNED BY public."Tag"."tagID";


--
-- Name: TravelGuide; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuide" (
    "travelGuideID" integer NOT NULL,
    "userID" integer NOT NULL,
    title text NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    cost real,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TravelGuide" OWNER TO postgres;

--
-- Name: TravelGuideArchSite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuideArchSite" (
    "travelGuideArchSiteID" integer NOT NULL,
    "travelGuideID" integer NOT NULL,
    "archSiteID" integer NOT NULL,
    note text,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TravelGuideArchSite" OWNER TO postgres;

--
-- Name: TravelGuideArchSite_travelGuideArchSiteID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelGuideArchSite_travelGuideArchSiteID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelGuideArchSite_travelGuideArchSiteID_seq" OWNER TO postgres;

--
-- Name: TravelGuideArchSite_travelGuideArchSiteID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelGuideArchSite_travelGuideArchSiteID_seq" OWNED BY public."TravelGuideArchSite"."travelGuideArchSiteID";


--
-- Name: TravelGuideHotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuideHotel" (
    "travelGuideHotel" integer NOT NULL,
    "travelGuideID" integer NOT NULL,
    "hotelID" integer NOT NULL,
    note text,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TravelGuideHotel" OWNER TO postgres;

--
-- Name: TravelGuideHotel_travelGuideHotel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelGuideHotel_travelGuideHotel_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelGuideHotel_travelGuideHotel_seq" OWNER TO postgres;

--
-- Name: TravelGuideHotel_travelGuideHotel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelGuideHotel_travelGuideHotel_seq" OWNED BY public."TravelGuideHotel"."travelGuideHotel";


--
-- Name: TravelGuideLocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuideLocation" (
    "travelGuideLocationID" integer NOT NULL,
    "travelGuideID" integer NOT NULL,
    "locationID" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TravelGuideLocation" OWNER TO postgres;

--
-- Name: TravelGuideLocation_travelGuideLocationID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelGuideLocation_travelGuideLocationID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelGuideLocation_travelGuideLocationID_seq" OWNER TO postgres;

--
-- Name: TravelGuideLocation_travelGuideLocationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelGuideLocation_travelGuideLocationID_seq" OWNED BY public."TravelGuideLocation"."travelGuideLocationID";


--
-- Name: TravelGuideMuseum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuideMuseum" (
    "travelGuideMuseumID" integer NOT NULL,
    "travelGuideID" integer NOT NULL,
    "museumID" integer NOT NULL,
    note text,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TravelGuideMuseum" OWNER TO postgres;

--
-- Name: TravelGuideMuseum_travelGuideMuseumID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelGuideMuseum_travelGuideMuseumID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelGuideMuseum_travelGuideMuseumID_seq" OWNER TO postgres;

--
-- Name: TravelGuideMuseum_travelGuideMuseumID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelGuideMuseum_travelGuideMuseumID_seq" OWNED BY public."TravelGuideMuseum"."travelGuideMuseumID";


--
-- Name: TravelGuideRestaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuideRestaurant" (
    "travelGuideRestaurantID" integer NOT NULL,
    "travelGuideID" integer NOT NULL,
    "restaurantID" integer NOT NULL,
    note text,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TravelGuideRestaurant" OWNER TO postgres;

--
-- Name: TravelGuideRestaurant_travelGuideRestaurantID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelGuideRestaurant_travelGuideRestaurantID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelGuideRestaurant_travelGuideRestaurantID_seq" OWNER TO postgres;

--
-- Name: TravelGuideRestaurant_travelGuideRestaurantID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelGuideRestaurant_travelGuideRestaurantID_seq" OWNED BY public."TravelGuideRestaurant"."travelGuideRestaurantID";


--
-- Name: TravelGuide_travelGuide_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelGuide_travelGuide_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelGuide_travelGuide_seq" OWNER TO postgres;

--
-- Name: TravelGuide_travelGuide_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelGuide_travelGuide_seq" OWNED BY public."TravelGuide"."travelGuideID";


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "userID" integer NOT NULL,
    name text NOT NULL,
    surname text,
    mail text NOT NULL,
    "birthDate" date,
    "registerDate" timestamp with time zone NOT NULL,
    "loginDate" timestamp with time zone NOT NULL,
    "loginIP" inet NOT NULL,
    "loginTypeID" integer DEFAULT 1 NOT NULL,
    "profileImageUrl" text,
    "userTypeID" integer DEFAULT 1 NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "phoneID" integer,
    "accessToken" text,
    "isDeleted" boolean DEFAULT false NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserType" (
    "userTypeID" integer NOT NULL,
    type text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."UserType" OWNER TO postgres;

--
-- Name: UserType_userTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserType_userTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserType_userTypeID_seq" OWNER TO postgres;

--
-- Name: UserType_userTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserType_userTypeID_seq" OWNED BY public."UserType"."userTypeID";


--
-- Name: User_userID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_userID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_userID_seq" OWNER TO postgres;

--
-- Name: User_userID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_userID_seq" OWNED BY public."User"."userID";


--
-- Name: remote_schemas id; Type: DEFAULT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.remote_schemas ALTER COLUMN id SET DEFAULT nextval('hdb_catalog.remote_schemas_id_seq'::regclass);


--
-- Name: Address addressID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address" ALTER COLUMN "addressID" SET DEFAULT nextval('public."Address_addressID_seq"'::regclass);


--
-- Name: ArchSite archSiteID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSite" ALTER COLUMN "archSiteID" SET DEFAULT nextval('public."ArchSite_archSiteID_seq"'::regclass);


--
-- Name: ArchSiteComment archSiteCommentID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteComment" ALTER COLUMN "archSiteCommentID" SET DEFAULT nextval('public."ArchSiteComment_archSiteCommentID_seq"'::regclass);


--
-- Name: ArchSiteEntranceType archSiteEntranceTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteEntranceType" ALTER COLUMN "archSiteEntranceTypeID" SET DEFAULT nextval('public."ArchSiteEntranceType_archSiteEntranceTypeID_seq"'::regclass);


--
-- Name: ArchSitePrice archSitePriceID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSitePrice" ALTER COLUMN "archSitePriceID" SET DEFAULT nextval('public."ArchSitePrice_archSitePriceID_seq"'::regclass);


--
-- Name: ArchSiteType archSiteTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteType" ALTER COLUMN "archSiteTypeID" SET DEFAULT nextval('public."ArchSiteType_archSiteTypeID_seq"'::regclass);


--
-- Name: ArchSiteTypeArchSite archSiteTypeArchSiteID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteTypeArchSite" ALTER COLUMN "archSiteTypeArchSiteID" SET DEFAULT nextval('public."ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq"'::regclass);


--
-- Name: ArchSiteWorkingDay archSiteWorkingDayID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDay" ALTER COLUMN "archSiteWorkingDayID" SET DEFAULT nextval('public."ArchSiteWorkingDay_archSiteWorkingDayID_seq"'::regclass);


--
-- Name: ArchSiteWorkingDaySchedule archSiteWorkingDayScheduleID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDaySchedule" ALTER COLUMN "archSiteWorkingDayScheduleID" SET DEFAULT nextval('public."ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq"'::regclass);


--
-- Name: ArchSiteWorkingSchedule archSiteWorkingScheduleID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingSchedule" ALTER COLUMN "archSiteWorkingScheduleID" SET DEFAULT nextval('public."ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq"'::regclass);


--
-- Name: Article articleID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article" ALTER COLUMN "articleID" SET DEFAULT nextval('public."Article_articleID_seq"'::regclass);


--
-- Name: ArticleTag articleTagID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleTag" ALTER COLUMN "articleTagID" SET DEFAULT nextval('public."ArticleTag_articleTagID_seq"'::regclass);


--
-- Name: ArticleUser articleUserID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleUser" ALTER COLUMN "articleUserID" SET DEFAULT nextval('public."ArticleUser_articleUserID_seq"'::regclass);


--
-- Name: City cityID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City" ALTER COLUMN "cityID" SET DEFAULT nextval('public."City_cityID_seq"'::regclass);


--
-- Name: Company companyID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company" ALTER COLUMN "companyID" SET DEFAULT nextval('public."Company_companyID_seq"'::regclass);


--
-- Name: CompanyContact companyContactID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyContact" ALTER COLUMN "companyContactID" SET DEFAULT nextval('public."CompanyContact_companyContactID_seq"'::regclass);


--
-- Name: CompanyPhone companyPhoneID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyPhone" ALTER COLUMN "companyPhoneID" SET DEFAULT nextval('public."CompanyPhone_companyPhoneID_seq"'::regclass);


--
-- Name: CompanyUser companyUserID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyUser" ALTER COLUMN "companyUserID" SET DEFAULT nextval('public."CompanyUser_companyUserID_seq"'::regclass);


--
-- Name: Country countryID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country" ALTER COLUMN "countryID" SET DEFAULT nextval('public."Country_countryID_seq"'::regclass);


--
-- Name: Day dayID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Day" ALTER COLUMN "dayID" SET DEFAULT nextval('public."Day_dayID_seq"'::regclass);


--
-- Name: District districtID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District" ALTER COLUMN "districtID" SET DEFAULT nextval('public."District_districtID_seq"'::regclass);


--
-- Name: Hotel hotelID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel" ALTER COLUMN "hotelID" SET DEFAULT nextval('public."Hotel_hotelID_seq"'::regclass);


--
-- Name: HotelComment hotelCommentID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelComment" ALTER COLUMN "hotelCommentID" SET DEFAULT nextval('public."HotelComment_hotelCommentID_seq"'::regclass);


--
-- Name: HotelRoom hotelRoomID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelRoom" ALTER COLUMN "hotelRoomID" SET DEFAULT nextval('public."HotelRoom_hotelRoomID_seq"'::regclass);


--
-- Name: HotelService hotelServiceHotelID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelService" ALTER COLUMN "hotelServiceHotelID" SET DEFAULT nextval('public."HotelService_hotelServiceHotelID_seq"'::regclass);


--
-- Name: HotelServiceProperty hotelServicePropertyID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelServiceProperty" ALTER COLUMN "hotelServicePropertyID" SET DEFAULT nextval('public."HotelServiceProperty_hotelServicePropertyID_seq"'::regclass);


--
-- Name: Location locationID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location" ALTER COLUMN "locationID" SET DEFAULT nextval('public."Location_locationID_seq"'::regclass);


--
-- Name: LoginType loginTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginType" ALTER COLUMN "loginTypeID" SET DEFAULT nextval('public."LoginType_loginTypeID_seq"'::regclass);


--
-- Name: Museum museumID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Museum" ALTER COLUMN "museumID" SET DEFAULT nextval('public."Museum_museumID_seq"'::regclass);


--
-- Name: MuseumComment museumCommentID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumComment" ALTER COLUMN "museumCommentID" SET DEFAULT nextval('public."MuseumComment_museumCommentID_seq"'::regclass);


--
-- Name: MuseumEntranceType museumEntranceTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumEntranceType" ALTER COLUMN "museumEntranceTypeID" SET DEFAULT nextval('public."MuseumEntranceType_museumEntranceTypeID_seq"'::regclass);


--
-- Name: MuseumPrice museumPriceID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumPrice" ALTER COLUMN "museumPriceID" SET DEFAULT nextval('public."MuseumPrice_museumPriceID_seq"'::regclass);


--
-- Name: MuseumType museumTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumType" ALTER COLUMN "museumTypeID" SET DEFAULT nextval('public."MuseumType_museumTypeID_seq"'::regclass);


--
-- Name: MuseumTypeMuseum museumTypeMuseumID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumTypeMuseum" ALTER COLUMN "museumTypeMuseumID" SET DEFAULT nextval('public."MuseumTypeMuseum_museumTypeMuseumID_seq"'::regclass);


--
-- Name: MuseumWorkingDay museumWorkingDayID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDay" ALTER COLUMN "museumWorkingDayID" SET DEFAULT nextval('public."MuseumWorkingDay_museumWorkingDayID_seq"'::regclass);


--
-- Name: MuseumWorkingDaySchedule museumWorkingDayScheduleID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDaySchedule" ALTER COLUMN "museumWorkingDayScheduleID" SET DEFAULT nextval('public."MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq"'::regclass);


--
-- Name: MuseumWorkingSchedule museumWorkingScheduleID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingSchedule" ALTER COLUMN "museumWorkingScheduleID" SET DEFAULT nextval('public."MuseumWorkingSchedule_museumWorkingScheduleID_seq"'::regclass);


--
-- Name: Phone phoneID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Phone" ALTER COLUMN "phoneID" SET DEFAULT nextval('public."Phone_phoneID_seq"'::regclass);


--
-- Name: Region regionID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Region" ALTER COLUMN "regionID" SET DEFAULT nextval('public."Region_regionID_seq"'::regclass);


--
-- Name: Restaurant restaurantID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Restaurant" ALTER COLUMN "restaurantID" SET DEFAULT nextval('public."Restaurant_restaurantID_seq"'::regclass);


--
-- Name: RestaurantAndCuisineType restaurantAndCuisineTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantAndCuisineType" ALTER COLUMN "restaurantAndCuisineTypeID" SET DEFAULT nextval('public."RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq"'::regclass);


--
-- Name: RestaurantComment restaurantCommentID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantComment" ALTER COLUMN "restaurantCommentID" SET DEFAULT nextval('public."RestaurantComment_restaurantCommentID_seq"'::regclass);


--
-- Name: RestaurantCuisineType restaurantCuisineTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantCuisineType" ALTER COLUMN "restaurantCuisineTypeID" SET DEFAULT nextval('public."RestaurantCuisineType_restaurantCuisineTypeID_seq"'::regclass);


--
-- Name: RestaurantFood restaurantFoodID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantFood" ALTER COLUMN "restaurantFoodID" SET DEFAULT nextval('public."RestaurantFood_restaurantFoodID_seq"'::regclass);


--
-- Name: RestaurantFoodType restaurantFoodTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantFoodType" ALTER COLUMN "restaurantFoodTypeID" SET DEFAULT nextval('public."RestaurantFoodType_restaurantFoodTypeID_seq"'::regclass);


--
-- Name: RestaurantMenu restaurantMenuID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenu" ALTER COLUMN "restaurantMenuID" SET DEFAULT nextval('public."RestaurantMenu_restaurantMenuID_seq"'::regclass);


--
-- Name: RestaurantMenuFood restaurantMenuFoodID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenuFood" ALTER COLUMN "restaurantMenuFoodID" SET DEFAULT nextval('public."RestaurantMenuFood_restaurantMenuFoodID_seq"'::regclass);


--
-- Name: RestaurantType restaurantTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantType" ALTER COLUMN "restaurantTypeID" SET DEFAULT nextval('public."RestaurantType_restaurantTypeID_seq"'::regclass);


--
-- Name: RestaurantWorkingDay restaurantWorkingDayID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDay" ALTER COLUMN "restaurantWorkingDayID" SET DEFAULT nextval('public."RestaurantWorkingDay_restaurantWorkingDayID_seq"'::regclass);


--
-- Name: RestaurantWorkingDaySchedule restaurantWorkingDaySchedule; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDaySchedule" ALTER COLUMN "restaurantWorkingDaySchedule" SET DEFAULT nextval('public."RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq"'::regclass);


--
-- Name: RestaurantWorkingSchedule restaurantWorkingScheduleID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingSchedule" ALTER COLUMN "restaurantWorkingScheduleID" SET DEFAULT nextval('public."RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq"'::regclass);


--
-- Name: Room roomID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room" ALTER COLUMN "roomID" SET DEFAULT nextval('public."Room_roomID_seq"'::regclass);


--
-- Name: RoomPicture roomPictureID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPicture" ALTER COLUMN "roomPictureID" SET DEFAULT nextval('public."RoomPicture_roomPictureID_seq"'::regclass);


--
-- Name: RoomPrice roomPriceID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPrice" ALTER COLUMN "roomPriceID" SET DEFAULT nextval('public."RoomPrice_roomPriceID_seq"'::regclass);


--
-- Name: RoomProperty roomPropertyID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomProperty" ALTER COLUMN "roomPropertyID" SET DEFAULT nextval('public."RoomProperty_roomPropertyID_seq"'::regclass);


--
-- Name: RoomPropertyRoom roomPropertyRoomID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPropertyRoom" ALTER COLUMN "roomPropertyRoomID" SET DEFAULT nextval('public."RoomPropertyRoom_roomPropertyRoomID_seq"'::regclass);


--
-- Name: Tag tagID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN "tagID" SET DEFAULT nextval('public."Tag_tagID_seq"'::regclass);


--
-- Name: TravelGuide travelGuideID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuide" ALTER COLUMN "travelGuideID" SET DEFAULT nextval('public."TravelGuide_travelGuide_seq"'::regclass);


--
-- Name: TravelGuideArchSite travelGuideArchSiteID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideArchSite" ALTER COLUMN "travelGuideArchSiteID" SET DEFAULT nextval('public."TravelGuideArchSite_travelGuideArchSiteID_seq"'::regclass);


--
-- Name: TravelGuideHotel travelGuideHotel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideHotel" ALTER COLUMN "travelGuideHotel" SET DEFAULT nextval('public."TravelGuideHotel_travelGuideHotel_seq"'::regclass);


--
-- Name: TravelGuideLocation travelGuideLocationID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideLocation" ALTER COLUMN "travelGuideLocationID" SET DEFAULT nextval('public."TravelGuideLocation_travelGuideLocationID_seq"'::regclass);


--
-- Name: TravelGuideMuseum travelGuideMuseumID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideMuseum" ALTER COLUMN "travelGuideMuseumID" SET DEFAULT nextval('public."TravelGuideMuseum_travelGuideMuseumID_seq"'::regclass);


--
-- Name: TravelGuideRestaurant travelGuideRestaurantID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideRestaurant" ALTER COLUMN "travelGuideRestaurantID" SET DEFAULT nextval('public."TravelGuideRestaurant_travelGuideRestaurantID_seq"'::regclass);


--
-- Name: User userID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN "userID" SET DEFAULT nextval('public."User_userID_seq"'::regclass);


--
-- Name: UserType userTypeID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserType" ALTER COLUMN "userTypeID" SET DEFAULT nextval('public."UserType_userTypeID_seq"'::regclass);


--
-- Data for Name: event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: event_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_log (id, schema_name, table_name, trigger_name, payload, delivered, error, tries, created_at, locked, next_retry_at, archived) FROM stdin;
\.


--
-- Data for Name: event_triggers; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_triggers (name, type, schema_name, table_name, configuration, comment) FROM stdin;
\.


--
-- Data for Name: hdb_allowlist; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_allowlist (collection_name) FROM stdin;
\.


--
-- Data for Name: hdb_computed_field; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_computed_field (table_schema, table_name, computed_field_name, definition, comment) FROM stdin;
\.


--
-- Data for Name: hdb_function; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_function (function_schema, function_name, configuration, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_permission; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_permission (table_schema, table_name, role_name, perm_type, perm_def, comment, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_query_collection; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_query_collection (collection_name, collection_defn, comment, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_relationship; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) FROM stdin;
hdb_catalog	hdb_table	detail	object	{"manual_configuration": {"remote_table": {"name": "tables", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	primary_key	object	{"manual_configuration": {"remote_table": {"name": "hdb_primary_key", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	columns	array	{"manual_configuration": {"remote_table": {"name": "columns", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	foreign_key_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_foreign_key_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	relationships	array	{"manual_configuration": {"remote_table": {"name": "hdb_relationship", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	permissions	array	{"manual_configuration": {"remote_table": {"name": "hdb_permission_agg", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	check_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_check_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	unique_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_unique_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	event_log	trigger	object	{"manual_configuration": {"remote_table": {"name": "event_triggers", "schema": "hdb_catalog"}, "column_mapping": {"trigger_name": "name"}}}	\N	t
hdb_catalog	event_triggers	events	array	{"manual_configuration": {"remote_table": {"name": "event_log", "schema": "hdb_catalog"}, "column_mapping": {"name": "trigger_name"}}}	\N	t
hdb_catalog	event_invocation_logs	event	object	{"foreign_key_constraint_on": "event_id"}	\N	t
hdb_catalog	event_log	logs	array	{"foreign_key_constraint_on": {"table": {"name": "event_invocation_logs", "schema": "hdb_catalog"}, "column": "event_id"}}	\N	t
hdb_catalog	hdb_function_agg	return_table_info	object	{"manual_configuration": {"remote_table": {"name": "hdb_table", "schema": "hdb_catalog"}, "column_mapping": {"return_type_name": "table_name", "return_type_schema": "table_schema"}}}	\N	t
public	Address	City	object	{"foreign_key_constraint_on": "cityID"}	\N	f
public	Address	District	object	{"foreign_key_constraint_on": "districtID"}	\N	f
public	Address	Locations	array	{"foreign_key_constraint_on": {"table": "Location", "column": "addressID"}}	\N	f
public	ArchSite	Company	object	{"foreign_key_constraint_on": "companyID"}	\N	f
public	ArchSite	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	ArchSite	ArchSiteComments	array	{"foreign_key_constraint_on": {"table": "ArchSiteComment", "column": "archSiteID"}}	\N	f
public	ArchSite	ArchSitePrices	array	{"foreign_key_constraint_on": {"table": "ArchSitePrice", "column": "archSiteID"}}	\N	f
public	ArchSite	ArchSiteTypeArchSites	array	{"foreign_key_constraint_on": {"table": "ArchSiteTypeArchSite", "column": "archSiteID"}}	\N	f
public	ArchSite	ArchSiteWorkingSchedules	array	{"foreign_key_constraint_on": {"table": "ArchSiteWorkingSchedule", "column": "archSiteID"}}	\N	f
public	ArchSite	TravelGuideArchSites	array	{"foreign_key_constraint_on": {"table": "TravelGuideArchSite", "column": "archSiteID"}}	\N	f
public	ArchSiteComment	ArchSite	object	{"foreign_key_constraint_on": "archSiteID"}	\N	f
public	ArchSiteComment	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	ArchSiteEntranceType	ArchSitePrices	array	{"foreign_key_constraint_on": {"table": "ArchSitePrice", "column": "archSiteEntranceTypeID"}}	\N	f
public	ArchSitePrice	ArchSite	object	{"foreign_key_constraint_on": "archSiteID"}	\N	f
public	ArchSitePrice	ArchSiteEntranceType	object	{"foreign_key_constraint_on": "archSiteEntranceTypeID"}	\N	f
public	ArchSiteType	ArchSiteTypeArchSites	array	{"foreign_key_constraint_on": {"table": "ArchSiteTypeArchSite", "column": "archSiteTypeID"}}	\N	f
public	ArchSiteTypeArchSite	ArchSite	object	{"foreign_key_constraint_on": "archSiteID"}	\N	f
public	ArchSiteTypeArchSite	ArchSiteType	object	{"foreign_key_constraint_on": "archSiteTypeID"}	\N	f
public	ArchSiteWorkingDay	Day	object	{"foreign_key_constraint_on": "dayID"}	\N	f
public	ArchSiteWorkingDay	ArchSiteWorkingDaySchedules	array	{"foreign_key_constraint_on": {"table": "ArchSiteWorkingDaySchedule", "column": "archSiteWorkingDayID"}}	\N	f
public	ArchSiteWorkingDaySchedule	ArchSiteWorkingDay	object	{"foreign_key_constraint_on": "archSiteWorkingDayID"}	\N	f
public	ArchSiteWorkingDaySchedule	ArchSiteWorkingSchedule	object	{"foreign_key_constraint_on": "archSiteWorkingScheduleID"}	\N	f
public	ArchSiteWorkingSchedule	ArchSite	object	{"foreign_key_constraint_on": "archSiteID"}	\N	f
public	ArchSiteWorkingSchedule	ArchSiteWorkingDaySchedules	array	{"foreign_key_constraint_on": {"table": "ArchSiteWorkingDaySchedule", "column": "archSiteWorkingScheduleID"}}	\N	f
public	Article	ArticleTags	array	{"foreign_key_constraint_on": {"table": "ArticleTag", "column": "articleID"}}	\N	f
public	Article	ArticleUsers	array	{"foreign_key_constraint_on": {"table": "ArticleUser", "column": "articleID"}}	\N	f
public	ArticleTag	Article	object	{"foreign_key_constraint_on": "articleID"}	\N	f
public	ArticleTag	Tag	object	{"foreign_key_constraint_on": "tagID"}	\N	f
public	ArticleUser	Article	object	{"foreign_key_constraint_on": "articleID"}	\N	f
public	ArticleUser	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	City	Country	object	{"foreign_key_constraint_on": "countryID"}	\N	f
public	City	Addresses	array	{"foreign_key_constraint_on": {"table": "Address", "column": "cityID"}}	\N	f
public	City	Districts	array	{"foreign_key_constraint_on": {"table": "District", "column": "cityID"}}	\N	f
public	Company	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	Company	ArchSites	array	{"foreign_key_constraint_on": {"table": "ArchSite", "column": "companyID"}}	\N	f
public	Company	CompanyPhones	array	{"foreign_key_constraint_on": {"table": "CompanyPhone", "column": "companyID"}}	\N	f
public	Company	CompanyUsers	array	{"foreign_key_constraint_on": {"table": "CompanyUser", "column": "companyID"}}	\N	f
public	Company	Hotels	array	{"foreign_key_constraint_on": {"table": "Hotel", "column": "companyID"}}	\N	f
public	Company	Museums	array	{"foreign_key_constraint_on": {"table": "Museum", "column": "companyID"}}	\N	f
public	Company	Restaurants	array	{"foreign_key_constraint_on": {"table": "Restaurant", "column": "companyID"}}	\N	f
public	CompanyContact	CompanyUser	object	{"foreign_key_constraint_on": "compantUserID"}	\N	f
public	CompanyPhone	Company	object	{"foreign_key_constraint_on": "companyID"}	\N	f
public	CompanyPhone	Phone	object	{"foreign_key_constraint_on": "phoneID"}	\N	f
public	CompanyUser	Company	object	{"foreign_key_constraint_on": "companyID"}	\N	f
public	CompanyUser	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	CompanyUser	CompanyContacts	array	{"foreign_key_constraint_on": {"table": "CompanyContact", "column": "compantUserID"}}	\N	f
public	Country	Cities	array	{"foreign_key_constraint_on": {"table": "City", "column": "countryID"}}	\N	f
public	Day	ArchSiteWorkingDays	array	{"foreign_key_constraint_on": {"table": "ArchSiteWorkingDay", "column": "dayID"}}	\N	f
public	Day	MuseumWorkingDays	array	{"foreign_key_constraint_on": {"table": "MuseumWorkingDay", "column": "dayID"}}	\N	f
public	Day	RestaurantWorkingDays	array	{"foreign_key_constraint_on": {"table": "RestaurantWorkingDay", "column": "dayID"}}	\N	f
public	District	City	object	{"foreign_key_constraint_on": "cityID"}	\N	f
public	District	Addresses	array	{"foreign_key_constraint_on": {"table": "Address", "column": "districtID"}}	\N	f
public	Hotel	Company	object	{"foreign_key_constraint_on": "companyID"}	\N	f
public	Hotel	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	Hotel	HotelComments	array	{"foreign_key_constraint_on": {"table": "HotelComment", "column": "hotelID"}}	\N	f
public	Hotel	HotelRooms	array	{"foreign_key_constraint_on": {"table": "HotelRoom", "column": "hotelID"}}	\N	f
public	Hotel	HotelServices	array	{"foreign_key_constraint_on": {"table": "HotelService", "column": "hotelID"}}	\N	f
public	Hotel	TravelGuideHotels	array	{"foreign_key_constraint_on": {"table": "TravelGuideHotel", "column": "hotelID"}}	\N	f
public	HotelComment	Hotel	object	{"foreign_key_constraint_on": "hotelID"}	\N	f
public	HotelComment	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	HotelRoom	Hotel	object	{"foreign_key_constraint_on": "hotelID"}	\N	f
public	HotelRoom	Room	object	{"foreign_key_constraint_on": "roomID"}	\N	f
public	HotelService	Hotel	object	{"foreign_key_constraint_on": "hotelID"}	\N	f
public	HotelService	HotelServiceProperty	object	{"foreign_key_constraint_on": "hotelServicePropertyID"}	\N	f
public	HotelServiceProperty	HotelServices	array	{"foreign_key_constraint_on": {"table": "HotelService", "column": "hotelServicePropertyID"}}	\N	f
public	Location	Address	object	{"foreign_key_constraint_on": "addressID"}	\N	f
public	Location	ArchSites	array	{"foreign_key_constraint_on": {"table": "ArchSite", "column": "locationID"}}	\N	f
public	Location	Companies	array	{"foreign_key_constraint_on": {"table": "Company", "column": "locationID"}}	\N	f
public	Location	Hotels	array	{"foreign_key_constraint_on": {"table": "Hotel", "column": "locationID"}}	\N	f
public	Location	Museums	array	{"foreign_key_constraint_on": {"table": "Museum", "column": "locationID"}}	\N	f
public	Location	Restaurants	array	{"foreign_key_constraint_on": {"table": "Restaurant", "column": "locationID"}}	\N	f
public	Location	TravelGuideLocations	array	{"foreign_key_constraint_on": {"table": "TravelGuideLocation", "column": "locationID"}}	\N	f
public	LoginType	Users	array	{"foreign_key_constraint_on": {"table": "User", "column": "loginTypeID"}}	\N	f
public	Museum	Company	object	{"foreign_key_constraint_on": "companyID"}	\N	f
public	Museum	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	Museum	MuseumComments	array	{"foreign_key_constraint_on": {"table": "MuseumComment", "column": "museumID"}}	\N	f
public	Museum	MuseumPrices	array	{"foreign_key_constraint_on": {"table": "MuseumPrice", "column": "museumID"}}	\N	f
public	Museum	MuseumTypeMuseums	array	{"foreign_key_constraint_on": {"table": "MuseumTypeMuseum", "column": "museumID"}}	\N	f
public	Museum	MuseumWorkingSchedules	array	{"foreign_key_constraint_on": {"table": "MuseumWorkingSchedule", "column": "museumID"}}	\N	f
public	Museum	TravelGuideMuseums	array	{"foreign_key_constraint_on": {"table": "TravelGuideMuseum", "column": "museumID"}}	\N	f
public	MuseumComment	Museum	object	{"foreign_key_constraint_on": "museumID"}	\N	f
public	MuseumComment	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	MuseumEntranceType	MuseumPrices	array	{"foreign_key_constraint_on": {"table": "MuseumPrice", "column": "entranceTypeID"}}	\N	f
public	MuseumPrice	Museum	object	{"foreign_key_constraint_on": "museumID"}	\N	f
public	MuseumPrice	MuseumEntranceType	object	{"foreign_key_constraint_on": "entranceTypeID"}	\N	f
public	MuseumType	MuseumTypeMuseums	array	{"foreign_key_constraint_on": {"table": "MuseumTypeMuseum", "column": "museumTypeID"}}	\N	f
public	MuseumTypeMuseum	Museum	object	{"foreign_key_constraint_on": "museumID"}	\N	f
public	MuseumTypeMuseum	MuseumType	object	{"foreign_key_constraint_on": "museumTypeID"}	\N	f
public	MuseumWorkingDay	Day	object	{"foreign_key_constraint_on": "dayID"}	\N	f
public	MuseumWorkingDay	MuseumWorkingDaySchedules	array	{"foreign_key_constraint_on": {"table": "MuseumWorkingDaySchedule", "column": "museumWorkingDayID"}}	\N	f
public	MuseumWorkingDaySchedule	MuseumWorkingDay	object	{"foreign_key_constraint_on": "museumWorkingDayID"}	\N	f
public	MuseumWorkingDaySchedule	MuseumWorkingSchedule	object	{"foreign_key_constraint_on": "museumWorkingScheduleID"}	\N	f
public	MuseumWorkingSchedule	Museum	object	{"foreign_key_constraint_on": "museumID"}	\N	f
public	MuseumWorkingSchedule	MuseumWorkingDaySchedules	array	{"foreign_key_constraint_on": {"table": "MuseumWorkingDaySchedule", "column": "museumWorkingScheduleID"}}	\N	f
public	Phone	CompanyPhones	array	{"foreign_key_constraint_on": {"table": "CompanyPhone", "column": "phoneID"}}	\N	f
public	Phone	Users	array	{"foreign_key_constraint_on": {"table": "User", "column": "phoneID"}}	\N	f
public	Restaurant	Company	object	{"foreign_key_constraint_on": "companyID"}	\N	f
public	Restaurant	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	Restaurant	RestaurantType	object	{"foreign_key_constraint_on": "restaurantTypeID"}	\N	f
public	Restaurant	RestaurantAndCuisineTypes	array	{"foreign_key_constraint_on": {"table": "RestaurantAndCuisineType", "column": "restaurantID"}}	\N	f
public	Restaurant	RestaurantComments	array	{"foreign_key_constraint_on": {"table": "RestaurantComment", "column": "restaurantID"}}	\N	f
public	Restaurant	RestaurantMenus	array	{"foreign_key_constraint_on": {"table": "RestaurantMenu", "column": "restaurantID"}}	\N	f
public	Restaurant	RestaurantWorkingSchedules	array	{"foreign_key_constraint_on": {"table": "RestaurantWorkingSchedule", "column": "restaurantID"}}	\N	f
public	Restaurant	TravelGuideRestaurants	array	{"foreign_key_constraint_on": {"table": "TravelGuideRestaurant", "column": "restaurantID"}}	\N	f
public	RestaurantAndCuisineType	Restaurant	object	{"foreign_key_constraint_on": "restaurantID"}	\N	f
public	RestaurantAndCuisineType	RestaurantCuisineType	object	{"foreign_key_constraint_on": "restaurantCuisineTypeID"}	\N	f
public	RestaurantComment	Restaurant	object	{"foreign_key_constraint_on": "restaurantID"}	\N	f
public	RestaurantComment	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	RestaurantCuisineType	RestaurantAndCuisineTypes	array	{"foreign_key_constraint_on": {"table": "RestaurantAndCuisineType", "column": "restaurantCuisineTypeID"}}	\N	f
public	RestaurantFood	RestaurantFoodType	object	{"foreign_key_constraint_on": "restaurantFoodTypeID"}	\N	f
public	RestaurantFood	RestaurantMenuFoods	array	{"foreign_key_constraint_on": {"table": "RestaurantMenuFood", "column": "restaurantFoodID"}}	\N	f
public	RestaurantFoodType	RestaurantFoods	array	{"foreign_key_constraint_on": {"table": "RestaurantFood", "column": "restaurantFoodTypeID"}}	\N	f
public	RestaurantMenu	Restaurant	object	{"foreign_key_constraint_on": "restaurantID"}	\N	f
public	RestaurantMenu	RestaurantMenuFoods	array	{"foreign_key_constraint_on": {"table": "RestaurantMenuFood", "column": "restaurantMenuID"}}	\N	f
public	RestaurantMenuFood	RestaurantFood	object	{"foreign_key_constraint_on": "restaurantFoodID"}	\N	f
public	RestaurantMenuFood	RestaurantMenu	object	{"foreign_key_constraint_on": "restaurantMenuID"}	\N	f
public	RestaurantType	Restaurants	array	{"foreign_key_constraint_on": {"table": "Restaurant", "column": "restaurantTypeID"}}	\N	f
public	RestaurantWorkingDay	Day	object	{"foreign_key_constraint_on": "dayID"}	\N	f
public	RestaurantWorkingDay	RestaurantWorkingDaySchedules	array	{"foreign_key_constraint_on": {"table": "RestaurantWorkingDaySchedule", "column": "restaurantWorkingDayID"}}	\N	f
public	RestaurantWorkingDaySchedule	RestaurantWorkingDay	object	{"foreign_key_constraint_on": "restaurantWorkingDayID"}	\N	f
public	RestaurantWorkingDaySchedule	RestaurantWorkingSchedule	object	{"foreign_key_constraint_on": "restaurantWorkingScheduleID"}	\N	f
public	RestaurantWorkingSchedule	Restaurant	object	{"foreign_key_constraint_on": "restaurantID"}	\N	f
public	RestaurantWorkingSchedule	RestaurantWorkingDaySchedules	array	{"foreign_key_constraint_on": {"table": "RestaurantWorkingDaySchedule", "column": "restaurantWorkingScheduleID"}}	\N	f
public	Room	HotelRooms	array	{"foreign_key_constraint_on": {"table": "HotelRoom", "column": "roomID"}}	\N	f
public	Room	RoomPictures	array	{"foreign_key_constraint_on": {"table": "RoomPicture", "column": "roomID"}}	\N	f
public	Room	RoomPrices	array	{"foreign_key_constraint_on": {"table": "RoomPrice", "column": "roomID"}}	\N	f
public	Room	RoomPropertyRooms	array	{"foreign_key_constraint_on": {"table": "RoomPropertyRoom", "column": "roomID"}}	\N	f
public	RoomPicture	Room	object	{"foreign_key_constraint_on": "roomID"}	\N	f
public	RoomPrice	Room	object	{"foreign_key_constraint_on": "roomID"}	\N	f
public	RoomProperty	RoomPropertyRooms	array	{"foreign_key_constraint_on": {"table": "RoomPropertyRoom", "column": "roomPropertyID"}}	\N	f
public	RoomPropertyRoom	Room	object	{"foreign_key_constraint_on": "roomID"}	\N	f
public	RoomPropertyRoom	RoomProperty	object	{"foreign_key_constraint_on": "roomPropertyID"}	\N	f
public	Tag	ArticleTags	array	{"foreign_key_constraint_on": {"table": "ArticleTag", "column": "tagID"}}	\N	f
public	TravelGuide	User	object	{"foreign_key_constraint_on": "userID"}	\N	f
public	TravelGuide	TravelGuideArchSites	array	{"foreign_key_constraint_on": {"table": "TravelGuideArchSite", "column": "travelGuideID"}}	\N	f
public	TravelGuide	TravelGuideHotels	array	{"foreign_key_constraint_on": {"table": "TravelGuideHotel", "column": "travelGuideID"}}	\N	f
public	TravelGuide	TravelGuideLocations	array	{"foreign_key_constraint_on": {"table": "TravelGuideLocation", "column": "travelGuideID"}}	\N	f
public	TravelGuide	TravelGuideMuseums	array	{"foreign_key_constraint_on": {"table": "TravelGuideMuseum", "column": "travelGuideID"}}	\N	f
public	TravelGuide	TravelGuideRestaurants	array	{"foreign_key_constraint_on": {"table": "TravelGuideRestaurant", "column": "travelGuideID"}}	\N	f
public	TravelGuideArchSite	ArchSite	object	{"foreign_key_constraint_on": "archSiteID"}	\N	f
public	TravelGuideArchSite	TravelGuide	object	{"foreign_key_constraint_on": "travelGuideID"}	\N	f
public	TravelGuideHotel	Hotel	object	{"foreign_key_constraint_on": "hotelID"}	\N	f
public	TravelGuideHotel	TravelGuide	object	{"foreign_key_constraint_on": "travelGuideID"}	\N	f
public	TravelGuideLocation	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	TravelGuideLocation	TravelGuide	object	{"foreign_key_constraint_on": "travelGuideID"}	\N	f
public	TravelGuideMuseum	Museum	object	{"foreign_key_constraint_on": "museumID"}	\N	f
public	TravelGuideMuseum	TravelGuide	object	{"foreign_key_constraint_on": "travelGuideID"}	\N	f
public	TravelGuideRestaurant	Restaurant	object	{"foreign_key_constraint_on": "restaurantID"}	\N	f
public	TravelGuideRestaurant	TravelGuide	object	{"foreign_key_constraint_on": "travelGuideID"}	\N	f
public	User	LoginType	object	{"foreign_key_constraint_on": "loginTypeID"}	\N	f
public	User	Phone	object	{"foreign_key_constraint_on": "phoneID"}	\N	f
public	User	ArchSiteComments	array	{"foreign_key_constraint_on": {"table": "ArchSiteComment", "column": "userID"}}	\N	f
public	User	ArticleUsers	array	{"foreign_key_constraint_on": {"table": "ArticleUser", "column": "userID"}}	\N	f
public	User	CompanyUsers	array	{"foreign_key_constraint_on": {"table": "CompanyUser", "column": "userID"}}	\N	f
public	User	HotelComments	array	{"foreign_key_constraint_on": {"table": "HotelComment", "column": "userID"}}	\N	f
public	User	MuseumComments	array	{"foreign_key_constraint_on": {"table": "MuseumComment", "column": "userID"}}	\N	f
public	User	RestaurantComments	array	{"foreign_key_constraint_on": {"table": "RestaurantComment", "column": "userID"}}	\N	f
public	User	TravelGuides	array	{"foreign_key_constraint_on": {"table": "TravelGuide", "column": "userID"}}	\N	f
public	City	Location	object	{"foreign_key_constraint_on": "locationID"}	\N	f
public	City	Region	object	{"foreign_key_constraint_on": "regionID"}	\N	f
public	Location	Cities	array	{"foreign_key_constraint_on": {"table": "City", "column": "locationID"}}	\N	f
public	Region	Cities	array	{"foreign_key_constraint_on": {"table": "City", "column": "regionID"}}	\N	f
\.


--
-- Data for Name: hdb_schema_update_event; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_update_event (instance_id, occurred_at) FROM stdin;
6c3d1d80-fb92-448c-af70-5b2b74ddb2d5	2020-06-09 10:01:44.40636+00
\.


--
-- Data for Name: hdb_table; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) FROM stdin;
hdb_catalog	hdb_table	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	tables	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	schemata	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	views	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_primary_key	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	columns	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_foreign_key_constraint	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_relationship	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_permission_agg	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_check_constraint	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_unique_constraint	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	event_triggers	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	event_log	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	event_invocation_logs	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_function_agg	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_function	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	remote_schemas	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_version	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_query_collection	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_allowlist	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
public	Country	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Day	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	District	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Hotel	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelRoom	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelService	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelServiceProperty	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Location	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	LoginType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Museum	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumEntranceType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumPrice	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumTypeMuseum	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumWorkingDay	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumWorkingDaySchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumWorkingSchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Phone	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Restaurant	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantAndCuisineType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantCuisineType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantFood	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantFoodType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantMenu	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantMenuFood	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantWorkingDay	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantWorkingDaySchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantWorkingSchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Room	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomPicture	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomPrice	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomProperty	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomPropertyRoom	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Tag	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuide	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideArchSite	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideHotel	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideLocation	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideMuseum	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideRestaurant	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	User	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	UserType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Address	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSite	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteEntranceType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSitePrice	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteTypeArchSite	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteWorkingDay	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteWorkingDaySchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteWorkingSchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Article	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArticleTag	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArticleUser	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	City	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Company	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CompanyContact	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CompanyPhone	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CompanyUser	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Region	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
4dca8f27-90da-4524-bea0-ec408b510735	28	2020-03-21 08:32:29.796323+00	{}	{"telemetryNotificationShown": true}
\.


--
-- Data for Name: remote_schemas; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.remote_schemas (id, name, definition, comment) FROM stdin;
\.


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" ("addressID", address, "districtID", "isDeleted", "cityID") FROM stdin;
3	sdfsad	1	f	1
4	sdfsad	1	f	1
5	sdfsad	1	f	1
6	sdfsad	1	f	1
10	sdfsad	1	f	1
11	sdfsad	1	f	1
2	sdfsad	1	f	1
12	test mah.	1	f	1
13	asfaasda	1	f	1
1	sdfsad	1	f	1
14	asdawdasaw  asdadaw w da	1	f	1
15	asdawdasdw	1	f	1
16	asdawda	1	f	1
17	asdafw	1	f	1
18	asdasd	1	f	1
19	Test mah.	1	f	1
20	asfasda	1	f	1
21	test mah.	1	f	1
22	adress	1	f	1
23	asdasd	1	f	1
24	aasda d wdawd awd	1	f	1
25	asdafadasd asd as d	1	f	1
26	adsasds	1	f	1
27	asdasfasd	1	f	1
28	1380 Sokak No:1, İzmir Türkiye	2	f	1
29	1380 Sokak No:1, İzmir Türkiye	2	f	1
30	Çapak Mahallesi Özgörkey Caddesi No:5/1, İzmir 35860 Türkiye	2	f	1
31	Çapak Mahallesi Özgörkey Caddesi No:5/1, İzmir 35860 Türkiye	2	f	1
32	Konak/Izmir	2	f	1
33	Bayraklı	4	f	1
34	Bornova	5	f	1
35	Konak	2	f	1
36	konak	2	f	1
37	Halit Rifat Pasa Caddesi 4. Konak, İzmir Türkiye	2	f	1
38	...........	2	f	1
39	Atatürk Cad. No:248 Alsancak, Konak, İzmir Türkiye	2	f	1
40	Halit Rifat Pasa Caddesi 4. Konak, İzmir Türkiye	2	f	1
41	adasfasdasfasd	3	f	1
42	asdasdasd	1	f	1
43	ggsdfsegs	1	f	1
\.


--
-- Data for Name: ArchSite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSite" ("archSiteID", "companyID", "locationID", name, description, age, period, altitude, diameter, destruction, "isDeleted", "averageTime") FROM stdin;
6	8	38	deneme arch	no description	20	no period	0	450	no dest	t	\N
5	6	34	arch test	test description	22	23212	22	12	asdasfaw	t	\N
8	7	42	asdas	sdawdawsd	23	231asdasd	22	12	asdawasda	t	\N
9	7	43	xzvzxc	asdawfad	0	asdawdawd	0	0	asdawd	t	\N
7	7	39	asd	asdawda	23	asdas	20	0	asdasdas	t	\N
10	16	49	TEPEKULE HÖYÜĞÜ	Homeros ünlü İlyada Destanı'nı, MÖ 700'lü yıllarda o tarihlerde günümüzdeki İzmir ilinin merkezi olan eski adıyla Smyrna yani Bayraklı'da yazdığı rivayet edilmektedir. Yapılan bilimsel çalışmaların sonucunda Smyrna'nın MÖ 7. yüzyılın ortalarından 6. yüzyılın son çeyreğine kadar kentin Akdeniz ticaretinde önemli bir liman kenti olduğu ortaya konulmuştur.	2500	.....	10	60	no dest.	f	\N
11	16	50	YEŞİLOVA HÖYÜĞÜ	Yeşilova Höyüğü İzmir'in en eski yerleşim birimidir. Yeşilova Höyük’teki ilk yerleşim günümüzden en az 8-9 bin yıl önce Cilalı Taş Dönemi olarak da adlandırılan Neolitik Çağ’da başlamıştır.	2500	no period	10	45	no dest.	f	\N
12	15	60	test	asdafawdasd	232	asdasf awd sd aw	22	23	asdawds w dwd 	f	25
\.


--
-- Data for Name: ArchSiteComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteComment" ("archSiteCommentID", "archSiteID", "userID", content, date, star, "isDeleted") FROM stdin;
\.


--
-- Data for Name: ArchSiteEntranceType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteEntranceType" ("archSiteEntranceTypeID", content, "isDeleted") FROM stdin;
1	Öğrenci	f
\.


--
-- Data for Name: ArchSitePrice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSitePrice" ("archSitePriceID", price, "startDate", "finishDate", "archSiteID", "archSiteEntranceTypeID", "isDeleted") FROM stdin;
4	10	2020-04-11 21:00:00+00	2020-04-23 21:00:00+00	5	1	f
5	20	2020-05-24 21:00:00+00	2020-05-30 21:00:00+00	5	1	f
6	20	2020-05-22 21:00:00+00	2020-06-05 21:00:00+00	7	1	f
7	12	2020-06-01 21:00:00+00	2020-06-29 21:00:00+00	10	1	f
8	15	2020-06-01 21:00:00+00	2020-06-29 21:00:00+00	11	1	f
9	10	2020-06-01 21:00:00+00	2020-06-29 21:00:00+00	10	1	f
\.


--
-- Data for Name: ArchSiteType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteType" ("archSiteTypeID", name, "isDeleted") FROM stdin;
3	arch type 1	f
4	Höyük	f
\.


--
-- Data for Name: ArchSiteTypeArchSite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteTypeArchSite" ("archSiteTypeArchSiteID", "archSiteTypeID", "archSiteID", "isDeleted") FROM stdin;
5	3	5	f
6	3	6	f
7	3	7	f
8	3	8	f
9	3	9	f
10	4	10	f
11	4	11	f
12	4	12	f
\.


--
-- Data for Name: ArchSiteWorkingDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteWorkingDay" ("archSiteWorkingDayID", "openHour", "closeHour", "dayID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: ArchSiteWorkingDaySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteWorkingDaySchedule" ("archSiteWorkingDayScheduleID", "archSiteWorkingDayID", "archSiteWorkingScheduleID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: ArchSiteWorkingSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteWorkingSchedule" ("archSiteWorkingScheduleID", "startDate", "finishDate", "archSiteID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Article" ("articleID", title, content, "publishDate", "editDate", "isDeleted", "imageUrl") FROM stdin;
2	Example article	Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.	2020-03-21 10:40:29.121+00	2020-03-21 10:40:29.121+00	f	https://i.hizliresim.com/uAb4j6.jpg
5	test	deneme	2020-06-06 07:51:55.746+00	2020-06-06 07:51:55.746+00	f	adadawe
4	Second Article	Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginia'daki Hampden-Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin bir kaynağa ulaşmıştır. Lorm Ipsum, Çiçero tarafından M.Ö. 45 tarihinde kaleme alınan "de Finibus Bonorum et Malorum" (İyi ve Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum pasajının ilk satırı olan "Lorem ipsum dolor sit amet" 1.10.32 sayılı bölümdeki bir satırdan gelmektedir.  1500'lerden beri kullanılmakta olan standard Lorem Ipsum metinleri ilgilenenler için yeniden üretilmiştir. Çiçero tarafından yazılan 1.10.32 ve 1.10.33 bölümleri de 1914 H. Rackham çevirisinden alınan İngilizce sürümleri eşliğinde özgün biçiminden yeniden üretilmiştir.	2020-06-06 07:49:11.212+00	2020-06-06 07:49:11.212+00	f	https://i.hizliresim.com/3WG0s2.jpg
\.


--
-- Data for Name: ArticleTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArticleTag" ("articleTagID", "articleID", "tagID", "isDeleted") FROM stdin;
1	2	2	f
2	2	1	f
3	4	2	f
4	5	1	f
\.


--
-- Data for Name: ArticleUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArticleUser" ("articleUserID", "userID", "articleID", "isDeleted") FROM stdin;
2	4	2	f
3	4	4	f
4	4	5	f
\.


--
-- Data for Name: City; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."City" ("cityID", city, "countryID", "isDeleted", description, "imageUrl", "locationID", "regionID") FROM stdin;
3	Denizli	1	f	Denizli is situated on the southwest of the Anatolian Peninsula; at the southeast part of the Aegean region and it is the passageway between the Aegean, Middle Anatolia and the Mediterranean regions. It is a growing industrial city in the eastern end of the alluvial valley formed by the river Büyük Menderes, where the plain reaches an elevation of about a hundred meters, in southwestern Turkey, in the country's Aegean Region. The city has a population of about 488,768 (2009 census) and is the capital city of Denizli Province. Denizli has achieved a remarkable economic development in the last decades based notably on textile production and export.   The province of Denizli is one of the tourism centres which attracts the tourists all year round with its rooster, well-known textile products, unique Pamukkale, white and red travertine, forests, botanical and ornithological tourism, 17 diverse thermal spas, slope parachute on Pamukkale, caves, about 30 ancient ruins, and tumuli in addition to them; mountaineering, trekking, plateau tourism, biking tours, rafting, faith tourism, congress tourism and the other alternative tourism opportunities.   The wide forests and numerous picnicking and camping areas here contribute to this natural and archaeological richness, while its position as a stopover between the major provinces like Izmir, Ankara and Antalya increases the tourist attraction of Denizli. The thermal resorts also attract visitors to the provinces with their spring waters of therapeutic effects; Gemezli, Cezmeli, Tekke and Kizildere are the main spa resorts, besides the thermal centres of Pamukkale and Karahayit.  Denizli is most famous for its Denizli rooster. Since ancient times, it has only ever been raised in Denizli. The rooster has adapted to harsh environmental conditions and has been resistant to contagious diseases from the beginning until today. The Agricultural Directory of Denizli Province has tried to conserve the Denizli rooster´s gene pool. During the first year of its life its crowing period lasts for about 20 seconds. This period gets longer as the rooster matures. However, the crowing quality is more important than the crowing period in a good Denizli rooster.	https://kusadasitours.com.tr/turresim/3171_b.jpg	5	1
1	İzmir	1	f	İzmir is one of the oldest cities of the Mediterranean world and has been of almost continuous historical importance during the last 5,000 years. Excavations indicate settlement contemporary with that of the first city of Troy, dating from the 3rd millennium bce. Greek settlement is first clearly attested by the presence of pottery dating from about 1000 bce. According to the Greek historian Herodotus, the Greek city was founded by Aeolians but soon was seized by Ionians. From modest beginnings, it grew into a stately city in the 7th century, with massive fortifications and blocks of two-storied houses.  Captured by Alyattes of Lydia about 600 bce, it ceased to exist as a city for about 300 years until it was refounded by either Alexander the Great or his lieutenants in the 4th century bce at a new site on and around Mount Pagus (modern Kadifekale; 540 feet [165 metres]). It soon emerged as one of the principal cities of Asia Minor (Anatolia) and was later the centre of a civil diocese in the Roman province of Asia, vying with Ephesus and Pergamum for the title “first city of Asia.” Roman emperors visited there, and it was celebrated for its wealth, beauty, library, school of medicine, and rhetorical tradition. The stream of Meles is associated in local tradition with Homer, who is reputed to have been born by its banks. Smyrna was one of the early seats of Christianity.  Capital of the naval theme (province) of Samos under the Byzantine emperors, Smyrna was taken by the Turkmen Aydın principality in the early 14th century ce. After being conquered in turn by the Crusaders sponsored by Pope Clement VI and by the Central Asian conqueror Timur (Tamerlane), it was annexed to the Ottoman Empire about 1425. Although severely damaged by earthquakes in 1688 and 1778, it remained a prosperous Ottoman port with a large European population.	https://www.aviontourism.com/images/1400-1200-fix/38a80612-8c85-4923-99b5-ce880c397256	1	1
2	Aydın	1	f	Aydin, is a city in and the seat of Aydın Province in Turkey's Aegean Region. The city is located at the heart of the lower valley of Büyük Menderes River (ancient Meander River) at a commanding position for the region extending from the uplands of the valley down to the seacoast. Its population was 188337 in 2010.  Aydin city is located along a region which was famous for its fertility and productivity since ancient times. Figs remain the province's best-known crop, although other agricultural products are also grown intensively and the city has some light industry. At the crossroads of a busy transport network of several types, a six-lane motorway connects Aydin to Izmir, Turkey's second port, in less than an hour, and in still less time to the international Adnan Menderes Airport, located along the road between the two cities.  A smaller airport, namely Aydin Airport, is located a few kilometers in the South-East of Aydin. The region of Aydin also pioneered the introduction of railways into Turkey in the 19th century and still has the densest railroad network. The province of Aydin is also where a number of internationally known historic sites and centers of tourism are concentrated. The weather is hot in summer, and warm all year round.	https://ucdn.tatilbudur.net/Otel/960x475/grand-blue-sky-hotel_287290.jpg	3	1
\.


--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Company" ("companyID", name, "taxNumber", mail, "registerDate", "logoUrl", description, "locationID", "faxNumber", "isDeleted") FROM stdin;
2	asd	tax	test	1999-01-08 04:05:06+00	\N	\N	1	\N	f
3	asd	1453	test@test.com	2016-07-20 12:00:15+00	\N	\N	2	\N	f
4	Test Company	23-231-232	oguz@oguz.com	2020-02-02 16:05:53+00	\N	\N	3	\N	f
6	grapq	1453	cc@test.com	2016-07-20 12:00:15+00	\N	\N	5	\N	t
12	test	213124	oguz@kagan.com	2020-04-12 21:10:40+00	\N	\N	29	\N	t
8	test compan	1230-123-222	oguz@deneme.com	2020-02-22 11:30:33+00	\N	\N	15	\N	t
13	test	2324123	adasd@adsa.com	2020-05-30 21:50:45+00	\N	\N	40	\N	t
7	mobile comp	23-123-53	oguz@eren.com	2020-02-02 16:18:25+00	\N	\N	6	\N	t
14	Arkas	878548548	arkas@arkas.com	2020-06-02 13:43:17+00	\N	\N	44	\N	f
15	Key Holding	231423242	key@keyholding.com	2020-06-02 13:47:31+00	\N	\N	46	\N	f
16	T.C. KÜLTÜR ve TURİZM BAKANLIĞI	87854844	iletisim@kulturbakanligi.com.tr	2020-06-02 13:50:55+00	\N	\N	48	\N	f
17	Visio	48457548	visio@visio.com	2020-06-02 14:20:06+00	\N	\N	52	\N	f
18	Esnaf	78458587	iletisim@esnaf.com	2020-06-02 14:37:07+00	\N	\N	54	\N	t
19	fdawfas	31412312412	sdasf@asda.com	2020-06-06 12:45:03+00	\N	\N	61	\N	f
\.


--
-- Data for Name: CompanyContact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyContact" ("companyContactID", "compantUserID", authority, "isDeleted") FROM stdin;
\.


--
-- Data for Name: CompanyPhone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyPhone" ("companyPhoneID", "phoneID", "companyID", "isDeleted") FROM stdin;
1	2	8	f
2	3	12	f
3	4	13	f
4	5	14	f
5	6	15	f
6	7	16	f
7	8	17	f
8	9	18	f
9	10	19	f
\.


--
-- Data for Name: CompanyUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyUser" ("companyUserID", "userID", "companyID", "isDeleted") FROM stdin;
1	4	6	f
2	4	7	f
3	4	8	f
4	4	12	f
5	4	13	f
6	4	14	f
7	4	15	f
8	4	16	f
9	4	17	f
10	4	18	f
11	4	19	f
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Country" ("countryID", country, "isDeleted") FROM stdin;
1	Turkiye	f
\.


--
-- Data for Name: Day; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Day" ("dayID", name, "isDeleted") FROM stdin;
1	Pazartesi	f
\.


--
-- Data for Name: District; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."District" ("districtID", district, "cityID", "isDeleted") FROM stdin;
1	Buca	1	f
2	Konak	1	f
3	Balçova	1	f
4	Bayraklı	1	f
5	Bornova	1	f
\.


--
-- Data for Name: Hotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hotel" ("hotelID", "companyID", "locationID", name, description, star, "taxNumber", "isDeleted") FROM stdin;
5	6	22	test12324a	\N	0	1231241	t
2	6	8	my otela	-etase	4	23123-2323	t
8	6	25	Test Hotel1	sdgswdasdw	5	241234123	t
6	6	23	description deneme	hello test	0	12312412	t
4	6	12	new test hotela	Açıklama	1	1230-123-2	t
7	6	24	star test	afawdasd	2	1231241	t
3	6	9	test2	bu kısımda otelin açıklaması gözükmektedir.	3	2332-23-21	t
9	17	53	Visio Otel	.......	5	745875848	f
10	18	56	My Hotel	.........	3	12457457	f
\.


--
-- Data for Name: HotelComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelComment" ("hotelCommentID", "hotelID", "userID", content, date, star, "isDeleted") FROM stdin;
1	3	4	test comment	2020-02-08 11:25:14.088+00	2	f
\.


--
-- Data for Name: HotelRoom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelRoom" ("hotelRoomID", "hotelID", "roomID", "isDeleted") FROM stdin;
1	2	2	f
2	2	3	f
3	3	4	f
4	3	5	f
5	8	6	f
6	8	7	f
7	9	8	f
\.


--
-- Data for Name: HotelService; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelService" ("hotelServiceHotelID", "hotelID", "hotelServicePropertyID", "isDeleted") FROM stdin;
1	3	1	f
2	4	1	f
3	5	1	f
4	6	1	f
5	7	1	f
6	8	2	f
7	8	3	f
8	8	1	f
9	9	4	f
10	9	5	f
11	9	6	f
12	10	5	f
13	10	1	f
\.


--
-- Data for Name: HotelServiceProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelServiceProperty" ("hotelServicePropertyID", content, "isDeleted") FROM stdin;
1	Kahvalti	f
2	service 1	f
3	Test prop	f
4	Klima	f
5	Sıcak Su	f
6	Otopark	f
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" ("locationID", latitude, longtitude, "addressID", "isDeleted") FROM stdin;
6	38.41998	27.14383	1	f
7	38.41998	27.14383	1	f
2	38.41998	27.14383	1	f
10	38.41998	27.14383	1	f
11	38.41998	27.14383	1	f
13	38.41998	27.14383	3	f
14	38.41998	27.14383	4	f
15	38.41998	27.14383	5	f
16	38.41998	27.14383	6	f
21	38.41998	27.14383	10	f
22	38.41998	27.14383	11	f
9	38.41998	27.14383	1	f
12	38.41998	27.14383	2	f
23	38.401775	27.184685	12	f
24	38.40384	27.100914	13	f
8	38.418453	27.157906	1	f
25	38.4085	27.13662	14	f
29	38.419216	27.13353	15	f
30	38.414642	27.137993	16	f
31	38.42379	27.13868	17	f
32	38.41841	27.14177	18	f
33	38.412045	27.128895	19	f
34	38.46623	27.194973	20	f
35	38.41675	27.181938	21	f
36	38.417557	27.139023	\N	f
37	38.42563	27.171982	\N	f
38	38.45756	27.21119	22	f
39	38.410908	27.139578	23	f
40	38.421864	27.143486	24	f
41	38.41245	27.13971	25	f
42	38.433113	27.149323	26	f
43	38.420876	27.14795	27	f
44	38.42778	27.138536	28	f
45	38.424587	27.131943	29	f
46	38.414818	27.124863	30	f
47	38.41253	27.133331	31	f
48	38.41863	27.138891	32	f
49	38.473606	27.134953	33	f
50	38.433075	27.150244	34	f
51	38.41433	27.136276	35	f
52	38.42966	27.14795	36	f
53	38.409756	27.125633	37	f
54	38.415943	27.128723	38	f
55	38.410564	27.148636	39	f
56	38.428318	27.140053	40	f
57	38.43047	27.142113	41	f
58	38.43719	27.170265	\N	f
59	38.41191	27.134903	\N	f
60	38.43262	27.14898	42	f
1	38.423733	27.142826	1	f
3	37.85	27.84	1	f
5	37.783333	29.094715	1	f
61	38.418903	27.145203	43	f
62	38.423733	27.142826	\N	f
63	37.783333	29.094715	\N	f
64	38.423733	27.142826	\N	f
65	37.783333	29.094715	\N	f
\.


--
-- Data for Name: LoginType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LoginType" ("loginTypeID", type, "isDeleted") FROM stdin;
1	mobile	f
2	web	f
\.


--
-- Data for Name: Museum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Museum" ("museumID", "companyID", "locationID", name, description, "isDeleted", "averageTime") FROM stdin;
4	12	35	deneme müze 1	asdasdsada	t	\N
3	6	33	Test Museum	test description	t	\N
5	14	45	Arkas Sanat Merkezi	Sanat galerisi	f	\N
6	15	47	KEY Museum	Araba Müzesi	f	\N
7	16	57	test	asdasfasdasfasd	f	\N
\.


--
-- Data for Name: MuseumComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumComment" ("museumCommentID", "museumID", "userID", content, date, star, "isDeleted") FROM stdin;
\.


--
-- Data for Name: MuseumEntranceType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumEntranceType" ("museumEntranceTypeID", content, "isDeleted") FROM stdin;
1	Öğrenci	f
\.


--
-- Data for Name: MuseumPrice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumPrice" ("museumPriceID", price, "startDate", "finishDate", "museumID", "entranceTypeID", "isDeleted") FROM stdin;
2	10	2020-04-11 21:00:00+00	2020-04-29 21:00:00+00	3	1	f
3	25	2020-04-12 21:00:00+00	2020-04-29 21:00:00+00	4	1	f
4	10	2020-06-01 21:00:00+00	2020-06-29 21:00:00+00	5	1	f
5	10	2020-06-01 21:00:00+00	2020-06-29 21:00:00+00	6	1	f
\.


--
-- Data for Name: MuseumType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumType" ("museumTypeID", type, "isDeleted") FROM stdin;
1	museum type 1	f
2	Sanat	f
\.


--
-- Data for Name: MuseumTypeMuseum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumTypeMuseum" ("museumTypeMuseumID", "museumID", "museumTypeID", "isDeleted") FROM stdin;
3	3	1	f
4	4	1	f
5	5	2	f
6	6	2	f
7	7	2	f
8	7	1	f
\.


--
-- Data for Name: MuseumWorkingDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumWorkingDay" ("museumWorkingDayID", "openHour", "closeHour", "dayID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: MuseumWorkingDaySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumWorkingDaySchedule" ("museumWorkingDayScheduleID", "museumWorkingDayID", "museumWorkingScheduleID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: MuseumWorkingSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumWorkingSchedule" ("museumWorkingScheduleID", "startDate", "finishDate", "museumID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: Phone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Phone" ("phoneID", phone, "isDeleted") FROM stdin;
1	231241	f
2	123122312	f
3	2324123	f
4	12312	f
5	506566000	f
6	2324223233	f
7	5559896587	f
8	23423123	f
9	86598548	f
10	23124123	f
\.


--
-- Data for Name: Region; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Region" ("regionID", region) FROM stdin;
1	Ege
2	Akdeniz
\.


--
-- Data for Name: Restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Restaurant" ("restaurantID", name, "restaurantTypeID", "ISO", since, star, "locationID", "companyID", "taxNumber", "isDeleted") FROM stdin;
3	asdawd	1	afawdas	2020-04-12	0	30	6	1234123	t
2	my rest22	1	yes	2020-02-22	0	14	6	123-123-2	t
4	test restaurant	1	asdasdaw	2020-05-30	0	41	7	123124	t
1	restR	1	yok	2020-02-17	0	11	6	123-12312	t
5	Arkas Balık Restaurant	4	yok	2020-06-02	0	51	14	8875488	f
6	Ailem Ev Yemekleri	5	yok	2020-06-02	0	55	18	87454154	f
\.


--
-- Data for Name: RestaurantAndCuisineType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantAndCuisineType" ("restaurantAndCuisineTypeID", "restaurantID", "restaurantCuisineTypeID", "isDeleted") FROM stdin;
1	1	1	f
2	2	1	f
3	3	1	f
4	4	1	f
5	5	2	f
6	6	1	f
\.


--
-- Data for Name: RestaurantComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantComment" ("restaurantCommentID", "restaurantID", "userID", content, date, star, "isDeleted") FROM stdin;
\.


--
-- Data for Name: RestaurantCuisineType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantCuisineType" ("restaurantCuisineTypeID", name, "isDeleted") FROM stdin;
2	Deniz Ürünleri	f
1	Ev Yemekleri	f
\.


--
-- Data for Name: RestaurantFood; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantFood" ("restaurantFoodID", name, "restaurantFoodTypeID", price, "isDeleted") FROM stdin;
2	balik	1	10	f
5	Balık Kızartma	1	15	f
6	Salata	3	10	f
7	Kola	7	10	f
1	Taze Fasulye	2	23	f
3	Sigara Böregi	1	2312	f
\.


--
-- Data for Name: RestaurantFoodType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantFoodType" ("restaurantFoodTypeID", type, "isDeleted") FROM stdin;
1	Kızartma	f
2	Sulu Yemek	f
3	Ara Sıcak	f
7	İçecek	f
\.


--
-- Data for Name: RestaurantMenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantMenu" ("restaurantMenuID", name, "restaurantID", price, "isDeleted") FROM stdin;
1	menum	1	20	f
2	Special Menu	5	40	f
3	Aile Menüsü	6	70	f
4	Akşam Menüsü	6	10	f
5	Öğrenci Menüsü	5	10	f
\.


--
-- Data for Name: RestaurantMenuFood; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantMenuFood" ("restaurantMenuFoodID", "restaurantMenuID", "restaurantFoodID", "isDeleted") FROM stdin;
1	1	1	f
2	1	2	f
3	2	6	f
4	2	7	f
5	2	5	f
6	3	6	f
7	3	7	f
8	3	3	f
9	3	1	f
10	4	2	f
11	4	7	f
12	5	6	f
13	5	3	f
\.


--
-- Data for Name: RestaurantType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantType" ("restaurantTypeID", type, "isDeleted") FROM stdin;
4	Balık	f
5	Ev Yemekleri	f
1	Aile	f
\.


--
-- Data for Name: RestaurantWorkingDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantWorkingDay" ("restaurantWorkingDayID", "openHour", "closeHour", "dayID", "isDeleted") FROM stdin;
1	10:55:41+00	11:55:44+00	1	f
\.


--
-- Data for Name: RestaurantWorkingDaySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantWorkingDaySchedule" ("restaurantWorkingDaySchedule", "restaurantWorkingDayID", "restaurantWorkingScheduleID", "isDeleted") FROM stdin;
1	1	1	f
\.


--
-- Data for Name: RestaurantWorkingSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantWorkingSchedule" ("restaurantWorkingScheduleID", "startDate", "finishDate", "restaurantID", "isDeleted") FROM stdin;
1	2020-02-23 21:00:00+00	2020-02-28 21:00:00+00	1	f
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" ("roomID", "roomNo", "isDeleted") FROM stdin;
1	2	f
2	42C	f
3	tes1	f
4	78-a	f
5	Test Room	f
6	458-C	f
7	45-A	f
8	k2n3	f
\.


--
-- Data for Name: RoomPicture; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomPicture" ("roomPictureID", url, "addDate", "roomID", "isDeleted") FROM stdin;
\.


--
-- Data for Name: RoomPrice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomPrice" ("roomPriceID", price, "startDate", "finishDate", "roomID", "isDeleted") FROM stdin;
4	50	2020-06-01 21:00:00+00	2020-06-29 21:00:00+00	8	f
\.


--
-- Data for Name: RoomProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomProperty" ("roomPropertyID", content, "isDeleted") FROM stdin;
1	banyo	f
2	kapi	f
3	test room prop	f
\.


--
-- Data for Name: RoomPropertyRoom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomPropertyRoom" ("roomPropertyRoomID", "roomID", "roomPropertyID", "isDeleted") FROM stdin;
1	1	1	f
2	1	2	f
3	2	1	f
4	2	2	f
5	3	2	f
6	3	1	f
7	4	1	f
8	4	2	f
9	4	3	f
10	5	1	f
11	5	2	f
12	5	3	f
13	6	1	f
14	6	2	f
15	7	1	f
16	8	1	f
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" ("tagID", name, "isDeleted") FROM stdin;
1	Tag1	f
2	Tag2	f
3	deneme tag	f
\.


--
-- Data for Name: TravelGuide; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuide" ("travelGuideID", "userID", title, "creationDate", cost, "isDeleted") FROM stdin;
8	4	My travel guide	2020-04-13 13:37:38.569+00	2500	f
9	4	test	2020-06-02 16:34:39.944+00	10	f
13	4	search test	2020-06-07 08:47:54.95+00	23	f
14	4	search test2	2020-06-07 12:10:37.844+00	25	f
15	4	search test	2020-06-08 07:54:15.328+00	25	f
16	4	my travel	2020-06-08 07:54:53.905+00	250	f
17	4	startendtest	2020-06-08 08:06:04.452+00	25	f
\.


--
-- Data for Name: TravelGuideArchSite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideArchSite" ("travelGuideArchSiteID", "travelGuideID", "archSiteID", note, "isDeleted") FROM stdin;
2	13	10	\N	f
3	14	10	\N	f
4	16	11	\N	f
\.


--
-- Data for Name: TravelGuideHotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideHotel" ("travelGuideHotel", "travelGuideID", "hotelID", note, "isDeleted") FROM stdin;
\.


--
-- Data for Name: TravelGuideLocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideLocation" ("travelGuideLocationID", "travelGuideID", "locationID", "isDeleted") FROM stdin;
2	8	36	f
3	8	37	f
4	9	58	f
5	9	59	f
6	14	62	f
7	14	63	f
8	17	64	f
9	17	65	f
\.


--
-- Data for Name: TravelGuideMuseum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideMuseum" ("travelGuideMuseumID", "travelGuideID", "museumID", note, "isDeleted") FROM stdin;
1	8	4	\N	f
2	9	6	\N	f
3	13	5	\N	f
4	14	5	\N	f
5	15	5	\N	f
6	15	6	\N	f
7	16	6	\N	f
8	17	5	\N	f
9	17	6	\N	f
\.


--
-- Data for Name: TravelGuideRestaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideRestaurant" ("travelGuideRestaurantID", "travelGuideID", "restaurantID", note, "isDeleted") FROM stdin;
1	8	2	\N	f
2	9	5	\N	f
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("userID", name, surname, mail, "birthDate", "registerDate", "loginDate", "loginIP", "loginTypeID", "profileImageUrl", "userTypeID", "isBlocked", "phoneID", "accessToken", "isDeleted", password) FROM stdin;
75	MUHAMMET SEFA	\N	muhammet.durmus@ceng.deu.edu.tr	\N	2020-02-08 09:20:43.678+00	2020-02-08 09:20:43.678+00	192.168.1.100	1	\N	1	f	\N	ya29.Il-9Bxbe7RJj7-02n1f7y01xPBrEmANV9D1YZX9WQu9UubJDYzkmWa0i2D9-KQqoeLE4tOVUp4Tk5pGc5JvfUAgJOTG0jWwk6KgLSYxHPNTeq8nZYo-9JVq-EoJnhW1PuQ	f	0
76	KÜBRA	\N	kubra.ozturk@ceng.deu.edu.tr	\N	2020-02-08 09:47:17.645+00	2020-02-08 09:47:17.645+00	192.168.1.104	1	\N	1	f	\N	ya29.Il-9B51Cjv2eANoXzbWsWNGFRv0UURHy9a7YnEQ_5R2p1-43YsyJzGAbV1rfE2PBnaqKtWeVqT5BOYndBKObtTUPBBcBJPhIRtd3ZNR61cS-GAVLrjUikbUlAe5Ztk7fSw	f	0
79	asda	asda	asd@asd.com	\N	2020-03-21 12:08:55.716+00	2020-03-21 12:08:55.716+00	127.0.0.1	1	\N	1	f	\N	\N	f	asdaqwe
4	OĞUZ	\N	oguz@eren.com	\N	2020-01-24 17:48:59.328+00	2020-06-09 12:54:22.458+00	127.0.0.1	2	\N	5	f	\N	ya29.Il-7B4QOklpVuY-vVSM8G9FA7PGy5J5IaUixP3rcVGOzK7fO4GhDuZ6Rc4dTCi9Wb5h3Sdy3hKH4Y2r5hUioE6_Ibv1ZoGcP_bLqadC3WSA3isBeDF-Rrh-fly0yQEv51w	f	12345
80	oguz	eren	oguz@oguz.com	\N	2020-03-21 12:10:47.581+00	2020-04-11 10:26:49.759+00	127.0.0.1	2	\N	1	f	\N	\N	f	12345
\.


--
-- Data for Name: UserType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserType" ("userTypeID", type, "isDeleted") FROM stdin;
1	normal	f
\.


--
-- Name: remote_schemas_id_seq; Type: SEQUENCE SET; Schema: hdb_catalog; Owner: postgres
--

SELECT pg_catalog.setval('hdb_catalog.remote_schemas_id_seq', 1, false);


--
-- Name: Address_addressID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Address_addressID_seq"', 43, true);


--
-- Name: ArchSiteComment_archSiteCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteComment_archSiteCommentID_seq"', 1, false);


--
-- Name: ArchSiteEntranceType_archSiteEntranceTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteEntranceType_archSiteEntranceTypeID_seq"', 9, true);


--
-- Name: ArchSitePrice_archSitePriceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSitePrice_archSitePriceID_seq"', 9, true);


--
-- Name: ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq"', 12, true);


--
-- Name: ArchSiteType_archSiteTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteType_archSiteTypeID_seq"', 4, true);


--
-- Name: ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq"', 2, true);


--
-- Name: ArchSiteWorkingDay_archSiteWorkingDayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteWorkingDay_archSiteWorkingDayID_seq"', 2, true);


--
-- Name: ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq"', 3, true);


--
-- Name: ArchSite_archSiteID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSite_archSiteID_seq"', 12, true);


--
-- Name: ArticleTag_articleTagID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArticleTag_articleTagID_seq"', 4, true);


--
-- Name: ArticleUser_articleUserID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArticleUser_articleUserID_seq"', 4, true);


--
-- Name: Article_articleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Article_articleID_seq"', 5, true);


--
-- Name: City_cityID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."City_cityID_seq"', 3, true);


--
-- Name: CompanyContact_companyContactID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyContact_companyContactID_seq"', 1, false);


--
-- Name: CompanyPhone_companyPhoneID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyPhone_companyPhoneID_seq"', 9, true);


--
-- Name: CompanyUser_companyUserID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyUser_companyUserID_seq"', 11, true);


--
-- Name: Company_companyID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Company_companyID_seq"', 19, true);


--
-- Name: Country_countryID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Country_countryID_seq"', 1, true);


--
-- Name: Day_dayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Day_dayID_seq"', 1, true);


--
-- Name: District_districtID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."District_districtID_seq"', 5, true);


--
-- Name: HotelComment_hotelCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelComment_hotelCommentID_seq"', 1, true);


--
-- Name: HotelRoom_hotelRoomID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelRoom_hotelRoomID_seq"', 7, true);


--
-- Name: HotelServiceProperty_hotelServicePropertyID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelServiceProperty_hotelServicePropertyID_seq"', 6, true);


--
-- Name: HotelService_hotelServiceHotelID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelService_hotelServiceHotelID_seq"', 13, true);


--
-- Name: Hotel_hotelID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hotel_hotelID_seq"', 10, true);


--
-- Name: Location_locationID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Location_locationID_seq"', 65, true);


--
-- Name: LoginType_loginTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LoginType_loginTypeID_seq"', 2, true);


--
-- Name: MuseumComment_museumCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumComment_museumCommentID_seq"', 1, false);


--
-- Name: MuseumEntranceType_museumEntranceTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumEntranceType_museumEntranceTypeID_seq"', 1, true);


--
-- Name: MuseumPrice_museumPriceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumPrice_museumPriceID_seq"', 5, true);


--
-- Name: MuseumTypeMuseum_museumTypeMuseumID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumTypeMuseum_museumTypeMuseumID_seq"', 8, true);


--
-- Name: MuseumType_museumTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumType_museumTypeID_seq"', 2, true);


--
-- Name: MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumWorkingDaySchedule_museumWorkingDayScheduleID_seq"', 1, false);


--
-- Name: MuseumWorkingDay_museumWorkingDayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumWorkingDay_museumWorkingDayID_seq"', 1, false);


--
-- Name: MuseumWorkingSchedule_museumWorkingScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumWorkingSchedule_museumWorkingScheduleID_seq"', 1, false);


--
-- Name: Museum_museumID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Museum_museumID_seq"', 7, true);


--
-- Name: Phone_phoneID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Phone_phoneID_seq"', 10, true);


--
-- Name: Region_regionID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Region_regionID_seq"', 2, true);


--
-- Name: RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq"', 6, true);


--
-- Name: RestaurantComment_restaurantCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantComment_restaurantCommentID_seq"', 1, false);


--
-- Name: RestaurantCuisineType_restaurantCuisineTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantCuisineType_restaurantCuisineTypeID_seq"', 2, true);


--
-- Name: RestaurantFoodType_restaurantFoodTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantFoodType_restaurantFoodTypeID_seq"', 7, true);


--
-- Name: RestaurantFood_restaurantFoodID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantFood_restaurantFoodID_seq"', 7, true);


--
-- Name: RestaurantMenuFood_restaurantMenuFoodID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantMenuFood_restaurantMenuFoodID_seq"', 13, true);


--
-- Name: RestaurantMenu_restaurantMenuID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantMenu_restaurantMenuID_seq"', 5, true);


--
-- Name: RestaurantType_restaurantTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantType_restaurantTypeID_seq"', 5, true);


--
-- Name: RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq"', 1, true);


--
-- Name: RestaurantWorkingDay_restaurantWorkingDayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantWorkingDay_restaurantWorkingDayID_seq"', 1, true);


--
-- Name: RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq"', 1, true);


--
-- Name: Restaurant_restaurantID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Restaurant_restaurantID_seq"', 6, true);


--
-- Name: RoomPicture_roomPictureID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomPicture_roomPictureID_seq"', 1, false);


--
-- Name: RoomPrice_roomPriceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomPrice_roomPriceID_seq"', 4, true);


--
-- Name: RoomPropertyRoom_roomPropertyRoomID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomPropertyRoom_roomPropertyRoomID_seq"', 16, true);


--
-- Name: RoomProperty_roomPropertyID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomProperty_roomPropertyID_seq"', 3, true);


--
-- Name: Room_roomID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_roomID_seq"', 8, true);


--
-- Name: Tag_tagID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tag_tagID_seq"', 3, true);


--
-- Name: TravelGuideArchSite_travelGuideArchSiteID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideArchSite_travelGuideArchSiteID_seq"', 4, true);


--
-- Name: TravelGuideHotel_travelGuideHotel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideHotel_travelGuideHotel_seq"', 3, true);


--
-- Name: TravelGuideLocation_travelGuideLocationID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideLocation_travelGuideLocationID_seq"', 9, true);


--
-- Name: TravelGuideMuseum_travelGuideMuseumID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideMuseum_travelGuideMuseumID_seq"', 9, true);


--
-- Name: TravelGuideRestaurant_travelGuideRestaurantID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideRestaurant_travelGuideRestaurantID_seq"', 2, true);


--
-- Name: TravelGuide_travelGuide_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuide_travelGuide_seq"', 17, true);


--
-- Name: UserType_userTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserType_userTypeID_seq"', 1, true);


--
-- Name: User_userID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_userID_seq"', 80, true);


--
-- Name: event_invocation_logs event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_invocation_logs
    ADD CONSTRAINT event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: event_log event_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_log
    ADD CONSTRAINT event_log_pkey PRIMARY KEY (id);


--
-- Name: event_triggers event_triggers_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_triggers
    ADD CONSTRAINT event_triggers_pkey PRIMARY KEY (name);


--
-- Name: hdb_allowlist hdb_allowlist_collection_name_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_allowlist
    ADD CONSTRAINT hdb_allowlist_collection_name_key UNIQUE (collection_name);


--
-- Name: hdb_computed_field hdb_computed_field_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_computed_field
    ADD CONSTRAINT hdb_computed_field_pkey PRIMARY KEY (table_schema, table_name, computed_field_name);


--
-- Name: hdb_function hdb_function_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_function
    ADD CONSTRAINT hdb_function_pkey PRIMARY KEY (function_schema, function_name);


--
-- Name: hdb_permission hdb_permission_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_permission
    ADD CONSTRAINT hdb_permission_pkey PRIMARY KEY (table_schema, table_name, role_name, perm_type);


--
-- Name: hdb_query_collection hdb_query_collection_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_query_collection
    ADD CONSTRAINT hdb_query_collection_pkey PRIMARY KEY (collection_name);


--
-- Name: hdb_relationship hdb_relationship_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_relationship
    ADD CONSTRAINT hdb_relationship_pkey PRIMARY KEY (table_schema, table_name, rel_name);


--
-- Name: hdb_table hdb_table_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_table
    ADD CONSTRAINT hdb_table_pkey PRIMARY KEY (table_schema, table_name);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: remote_schemas remote_schemas_name_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.remote_schemas
    ADD CONSTRAINT remote_schemas_name_key UNIQUE (name);


--
-- Name: remote_schemas remote_schemas_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.remote_schemas
    ADD CONSTRAINT remote_schemas_pkey PRIMARY KEY (id);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("addressID");


--
-- Name: ArchSiteComment ArchSiteComment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteComment"
    ADD CONSTRAINT "ArchSiteComment_pkey" PRIMARY KEY ("archSiteCommentID");


--
-- Name: ArchSiteEntranceType ArchSiteEntranceType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteEntranceType"
    ADD CONSTRAINT "ArchSiteEntranceType_pkey" PRIMARY KEY ("archSiteEntranceTypeID");


--
-- Name: ArchSitePrice ArchSitePrice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSitePrice"
    ADD CONSTRAINT "ArchSitePrice_pkey" PRIMARY KEY ("archSitePriceID");


--
-- Name: ArchSiteTypeArchSite ArchSiteTypeArchSite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteTypeArchSite"
    ADD CONSTRAINT "ArchSiteTypeArchSite_pkey" PRIMARY KEY ("archSiteTypeArchSiteID");


--
-- Name: ArchSiteType ArchSiteType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteType"
    ADD CONSTRAINT "ArchSiteType_pkey" PRIMARY KEY ("archSiteTypeID");


--
-- Name: ArchSiteWorkingDaySchedule ArchSiteWorkingDaySchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDaySchedule"
    ADD CONSTRAINT "ArchSiteWorkingDaySchedule_pkey" PRIMARY KEY ("archSiteWorkingDayScheduleID");


--
-- Name: ArchSiteWorkingDay ArchSiteWorkingDay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDay"
    ADD CONSTRAINT "ArchSiteWorkingDay_pkey" PRIMARY KEY ("archSiteWorkingDayID");


--
-- Name: ArchSiteWorkingSchedule ArchSiteWorkingSchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingSchedule"
    ADD CONSTRAINT "ArchSiteWorkingSchedule_pkey" PRIMARY KEY ("archSiteWorkingScheduleID");


--
-- Name: ArchSite ArchSite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSite"
    ADD CONSTRAINT "ArchSite_pkey" PRIMARY KEY ("archSiteID");


--
-- Name: ArticleTag ArticleTag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleTag"
    ADD CONSTRAINT "ArticleTag_pkey" PRIMARY KEY ("articleTagID");


--
-- Name: ArticleUser ArticleUser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleUser"
    ADD CONSTRAINT "ArticleUser_pkey" PRIMARY KEY ("articleUserID");


--
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("articleID");


--
-- Name: City City_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY ("cityID");


--
-- Name: CompanyContact CompanyContact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyContact"
    ADD CONSTRAINT "CompanyContact_pkey" PRIMARY KEY ("companyContactID");


--
-- Name: CompanyPhone CompanyPhone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyPhone"
    ADD CONSTRAINT "CompanyPhone_pkey" PRIMARY KEY ("companyPhoneID");


--
-- Name: CompanyUser CompanyUser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyUser"
    ADD CONSTRAINT "CompanyUser_pkey" PRIMARY KEY ("companyUserID");


--
-- Name: Company Company_mail_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_mail_key" UNIQUE (mail);


--
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("companyID");


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("countryID");


--
-- Name: Day Day_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Day"
    ADD CONSTRAINT "Day_pkey" PRIMARY KEY ("dayID");


--
-- Name: District District_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_pkey" PRIMARY KEY ("districtID");


--
-- Name: HotelComment HotelComment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelComment"
    ADD CONSTRAINT "HotelComment_pkey" PRIMARY KEY ("hotelCommentID");


--
-- Name: HotelRoom HotelRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelRoom"
    ADD CONSTRAINT "HotelRoom_pkey" PRIMARY KEY ("hotelRoomID");


--
-- Name: HotelServiceProperty HotelServiceProperty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelServiceProperty"
    ADD CONSTRAINT "HotelServiceProperty_pkey" PRIMARY KEY ("hotelServicePropertyID");


--
-- Name: HotelService HotelService_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelService"
    ADD CONSTRAINT "HotelService_pkey" PRIMARY KEY ("hotelServiceHotelID");


--
-- Name: Hotel Hotel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotelID");


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("locationID");


--
-- Name: LoginType LoginType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginType"
    ADD CONSTRAINT "LoginType_pkey" PRIMARY KEY ("loginTypeID");


--
-- Name: MuseumComment MuseumComment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumComment"
    ADD CONSTRAINT "MuseumComment_pkey" PRIMARY KEY ("museumCommentID");


--
-- Name: MuseumEntranceType MuseumEntranceType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumEntranceType"
    ADD CONSTRAINT "MuseumEntranceType_pkey" PRIMARY KEY ("museumEntranceTypeID");


--
-- Name: MuseumPrice MuseumPrice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumPrice"
    ADD CONSTRAINT "MuseumPrice_pkey" PRIMARY KEY ("museumPriceID");


--
-- Name: MuseumTypeMuseum MuseumTypeMuseum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumTypeMuseum"
    ADD CONSTRAINT "MuseumTypeMuseum_pkey" PRIMARY KEY ("museumTypeMuseumID");


--
-- Name: MuseumType MuseumType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumType"
    ADD CONSTRAINT "MuseumType_pkey" PRIMARY KEY ("museumTypeID");


--
-- Name: MuseumType MuseumType_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumType"
    ADD CONSTRAINT "MuseumType_type_key" UNIQUE (type);


--
-- Name: MuseumWorkingDaySchedule MuseumWorkingDaySchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDaySchedule"
    ADD CONSTRAINT "MuseumWorkingDaySchedule_pkey" PRIMARY KEY ("museumWorkingDayScheduleID");


--
-- Name: MuseumWorkingDay MuseumWorkingDay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDay"
    ADD CONSTRAINT "MuseumWorkingDay_pkey" PRIMARY KEY ("museumWorkingDayID");


--
-- Name: MuseumWorkingSchedule MuseumWorkingSchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingSchedule"
    ADD CONSTRAINT "MuseumWorkingSchedule_pkey" PRIMARY KEY ("museumWorkingScheduleID");


--
-- Name: Museum Museum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Museum"
    ADD CONSTRAINT "Museum_pkey" PRIMARY KEY ("museumID");


--
-- Name: Phone Phone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Phone"
    ADD CONSTRAINT "Phone_pkey" PRIMARY KEY ("phoneID");


--
-- Name: Region Region_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Region"
    ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("regionID");


--
-- Name: RestaurantAndCuisineType RestaurantAndCuisineType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantAndCuisineType"
    ADD CONSTRAINT "RestaurantAndCuisineType_pkey" PRIMARY KEY ("restaurantAndCuisineTypeID");


--
-- Name: RestaurantComment RestaurantComment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantComment"
    ADD CONSTRAINT "RestaurantComment_pkey" PRIMARY KEY ("restaurantCommentID");


--
-- Name: RestaurantCuisineType RestaurantCuisineType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantCuisineType"
    ADD CONSTRAINT "RestaurantCuisineType_pkey" PRIMARY KEY ("restaurantCuisineTypeID");


--
-- Name: RestaurantFoodType RestaurantFoodType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantFoodType"
    ADD CONSTRAINT "RestaurantFoodType_pkey" PRIMARY KEY ("restaurantFoodTypeID");


--
-- Name: RestaurantFood RestaurantFood_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantFood"
    ADD CONSTRAINT "RestaurantFood_pkey" PRIMARY KEY ("restaurantFoodID");


--
-- Name: RestaurantMenuFood RestaurantMenuFood_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenuFood"
    ADD CONSTRAINT "RestaurantMenuFood_pkey" PRIMARY KEY ("restaurantMenuFoodID");


--
-- Name: RestaurantMenu RestaurantMenu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenu"
    ADD CONSTRAINT "RestaurantMenu_pkey" PRIMARY KEY ("restaurantMenuID");


--
-- Name: RestaurantType RestaurantType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantType"
    ADD CONSTRAINT "RestaurantType_pkey" PRIMARY KEY ("restaurantTypeID");


--
-- Name: RestaurantWorkingDaySchedule RestaurantWorkingDaySchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDaySchedule"
    ADD CONSTRAINT "RestaurantWorkingDaySchedule_pkey" PRIMARY KEY ("restaurantWorkingDaySchedule");


--
-- Name: RestaurantWorkingDay RestaurantWorkingDay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDay"
    ADD CONSTRAINT "RestaurantWorkingDay_pkey" PRIMARY KEY ("restaurantWorkingDayID");


--
-- Name: RestaurantWorkingSchedule RestaurantWorkingSchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingSchedule"
    ADD CONSTRAINT "RestaurantWorkingSchedule_pkey" PRIMARY KEY ("restaurantWorkingScheduleID");


--
-- Name: Restaurant Restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Restaurant"
    ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurantID");


--
-- Name: RoomPicture RoomPicture_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPicture"
    ADD CONSTRAINT "RoomPicture_pkey" PRIMARY KEY ("roomPictureID");


--
-- Name: RoomPrice RoomPrice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPrice"
    ADD CONSTRAINT "RoomPrice_pkey" PRIMARY KEY ("roomPriceID");


--
-- Name: RoomPropertyRoom RoomPropertyRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPropertyRoom"
    ADD CONSTRAINT "RoomPropertyRoom_pkey" PRIMARY KEY ("roomPropertyRoomID");


--
-- Name: RoomProperty RoomProperty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomProperty"
    ADD CONSTRAINT "RoomProperty_pkey" PRIMARY KEY ("roomPropertyID");


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomID");


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagID");


--
-- Name: TravelGuideArchSite TravelGuideArchSite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideArchSite"
    ADD CONSTRAINT "TravelGuideArchSite_pkey" PRIMARY KEY ("travelGuideArchSiteID");


--
-- Name: TravelGuideHotel TravelGuideHotel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideHotel"
    ADD CONSTRAINT "TravelGuideHotel_pkey" PRIMARY KEY ("travelGuideHotel");


--
-- Name: TravelGuideLocation TravelGuideLocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideLocation"
    ADD CONSTRAINT "TravelGuideLocation_pkey" PRIMARY KEY ("travelGuideLocationID");


--
-- Name: TravelGuideMuseum TravelGuideMuseum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideMuseum"
    ADD CONSTRAINT "TravelGuideMuseum_pkey" PRIMARY KEY ("travelGuideMuseumID");


--
-- Name: TravelGuideRestaurant TravelGuideRestaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideRestaurant"
    ADD CONSTRAINT "TravelGuideRestaurant_pkey" PRIMARY KEY ("travelGuideRestaurantID");


--
-- Name: TravelGuide TravelGuide_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuide"
    ADD CONSTRAINT "TravelGuide_pkey" PRIMARY KEY ("travelGuideID");


--
-- Name: TravelGuide TravelGuide_travelGuide_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuide"
    ADD CONSTRAINT "TravelGuide_travelGuide_key" UNIQUE ("travelGuideID");


--
-- Name: UserType UserType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserType"
    ADD CONSTRAINT "UserType_pkey" PRIMARY KEY ("userTypeID");


--
-- Name: User User_mail_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_mail_key" UNIQUE (mail);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");


--
-- Name: event_invocation_logs_event_id_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_invocation_logs_event_id_idx ON hdb_catalog.event_invocation_logs USING btree (event_id);


--
-- Name: event_log_delivered_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_delivered_idx ON hdb_catalog.event_log USING btree (delivered);


--
-- Name: event_log_locked_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_locked_idx ON hdb_catalog.event_log USING btree (locked);


--
-- Name: event_log_trigger_name_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_trigger_name_idx ON hdb_catalog.event_log USING btree (trigger_name);


--
-- Name: hdb_schema_update_event_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_schema_update_event_one_row ON hdb_catalog.hdb_schema_update_event USING btree (((occurred_at IS NOT NULL)));


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: hdb_schema_update_event hdb_schema_update_event_notifier; Type: TRIGGER; Schema: hdb_catalog; Owner: postgres
--

CREATE TRIGGER hdb_schema_update_event_notifier AFTER INSERT OR UPDATE ON hdb_catalog.hdb_schema_update_event FOR EACH ROW EXECUTE FUNCTION hdb_catalog.hdb_schema_update_event_notifier();


--
-- Name: event_invocation_logs event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_invocation_logs
    ADD CONSTRAINT event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.event_log(id);


--
-- Name: event_triggers event_triggers_schema_name_table_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_triggers
    ADD CONSTRAINT event_triggers_schema_name_table_name_fkey FOREIGN KEY (schema_name, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: hdb_allowlist hdb_allowlist_collection_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_allowlist
    ADD CONSTRAINT hdb_allowlist_collection_name_fkey FOREIGN KEY (collection_name) REFERENCES hdb_catalog.hdb_query_collection(collection_name);


--
-- Name: hdb_computed_field hdb_computed_field_table_schema_table_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_computed_field
    ADD CONSTRAINT hdb_computed_field_table_schema_table_name_fkey FOREIGN KEY (table_schema, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: hdb_permission hdb_permission_table_schema_table_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_permission
    ADD CONSTRAINT hdb_permission_table_schema_table_name_fkey FOREIGN KEY (table_schema, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: hdb_relationship hdb_relationship_table_schema_table_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_relationship
    ADD CONSTRAINT hdb_relationship_table_schema_table_name_fkey FOREIGN KEY (table_schema, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: Address Address_cityID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_cityID_fkey" FOREIGN KEY ("cityID") REFERENCES public."City"("cityID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Address Address_districtID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_districtID_fkey" FOREIGN KEY ("districtID") REFERENCES public."District"("districtID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteComment ArchSiteComment_archSiteID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteComment"
    ADD CONSTRAINT "ArchSiteComment_archSiteID_fkey" FOREIGN KEY ("archSiteID") REFERENCES public."ArchSite"("archSiteID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteComment ArchSiteComment_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteComment"
    ADD CONSTRAINT "ArchSiteComment_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSitePrice ArchSitePrice_archSiteEntranceTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSitePrice"
    ADD CONSTRAINT "ArchSitePrice_archSiteEntranceTypeID_fkey" FOREIGN KEY ("archSiteEntranceTypeID") REFERENCES public."ArchSiteEntranceType"("archSiteEntranceTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSitePrice ArchSitePrice_archSiteID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSitePrice"
    ADD CONSTRAINT "ArchSitePrice_archSiteID_fkey" FOREIGN KEY ("archSiteID") REFERENCES public."ArchSite"("archSiteID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteTypeArchSite ArchSiteTypeArchSite_archSiteID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteTypeArchSite"
    ADD CONSTRAINT "ArchSiteTypeArchSite_archSiteID_fkey" FOREIGN KEY ("archSiteID") REFERENCES public."ArchSite"("archSiteID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteTypeArchSite ArchSiteTypeArchSite_archSiteTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteTypeArchSite"
    ADD CONSTRAINT "ArchSiteTypeArchSite_archSiteTypeID_fkey" FOREIGN KEY ("archSiteTypeID") REFERENCES public."ArchSiteType"("archSiteTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteWorkingDaySchedule ArchSiteWorkingDaySchedule_archSiteWorkingDayID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDaySchedule"
    ADD CONSTRAINT "ArchSiteWorkingDaySchedule_archSiteWorkingDayID_fkey" FOREIGN KEY ("archSiteWorkingDayID") REFERENCES public."ArchSiteWorkingDay"("archSiteWorkingDayID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteWorkingDaySchedule ArchSiteWorkingDaySchedule_archSiteWorkingScheduleID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDaySchedule"
    ADD CONSTRAINT "ArchSiteWorkingDaySchedule_archSiteWorkingScheduleID_fkey" FOREIGN KEY ("archSiteWorkingScheduleID") REFERENCES public."ArchSiteWorkingSchedule"("archSiteWorkingScheduleID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteWorkingDay ArchSiteWorkingDay_dayID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingDay"
    ADD CONSTRAINT "ArchSiteWorkingDay_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES public."Day"("dayID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSiteWorkingSchedule ArchSiteWorkingSchedule_archSiteID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSiteWorkingSchedule"
    ADD CONSTRAINT "ArchSiteWorkingSchedule_archSiteID_fkey" FOREIGN KEY ("archSiteID") REFERENCES public."ArchSite"("archSiteID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSite ArchSite_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSite"
    ADD CONSTRAINT "ArchSite_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public."Company"("companyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArchSite ArchSite_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArchSite"
    ADD CONSTRAINT "ArchSite_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArticleTag ArticleTag_articleID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleTag"
    ADD CONSTRAINT "ArticleTag_articleID_fkey" FOREIGN KEY ("articleID") REFERENCES public."Article"("articleID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArticleTag ArticleTag_tagID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleTag"
    ADD CONSTRAINT "ArticleTag_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES public."Tag"("tagID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArticleUser ArticleUser_articleID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleUser"
    ADD CONSTRAINT "ArticleUser_articleID_fkey" FOREIGN KEY ("articleID") REFERENCES public."Article"("articleID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: ArticleUser ArticleUser_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleUser"
    ADD CONSTRAINT "ArticleUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: City City_countryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES public."Country"("countryID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: City City_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: City City_regionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES public."Region"("regionID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: CompanyContact CompanyContact_compantUserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyContact"
    ADD CONSTRAINT "CompanyContact_compantUserID_fkey" FOREIGN KEY ("compantUserID") REFERENCES public."CompanyUser"("companyUserID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: CompanyPhone CompanyPhone_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyPhone"
    ADD CONSTRAINT "CompanyPhone_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public."Company"("companyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: CompanyPhone CompanyPhone_phoneID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyPhone"
    ADD CONSTRAINT "CompanyPhone_phoneID_fkey" FOREIGN KEY ("phoneID") REFERENCES public."Phone"("phoneID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: CompanyUser CompanyUser_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyUser"
    ADD CONSTRAINT "CompanyUser_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public."Company"("companyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: CompanyUser CompanyUser_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyUser"
    ADD CONSTRAINT "CompanyUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Company Company_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: District District_cityID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_cityID_fkey" FOREIGN KEY ("cityID") REFERENCES public."City"("cityID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: HotelComment HotelComment_hotelID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelComment"
    ADD CONSTRAINT "HotelComment_hotelID_fkey" FOREIGN KEY ("hotelID") REFERENCES public."Hotel"("hotelID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: HotelComment HotelComment_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelComment"
    ADD CONSTRAINT "HotelComment_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: HotelRoom HotelRoom_hotelID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelRoom"
    ADD CONSTRAINT "HotelRoom_hotelID_fkey" FOREIGN KEY ("hotelID") REFERENCES public."Hotel"("hotelID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: HotelRoom HotelRoom_roomID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelRoom"
    ADD CONSTRAINT "HotelRoom_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES public."Room"("roomID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: HotelService HotelService_hotelID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelService"
    ADD CONSTRAINT "HotelService_hotelID_fkey" FOREIGN KEY ("hotelID") REFERENCES public."Hotel"("hotelID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: HotelService HotelService_hotelServicePropertyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HotelService"
    ADD CONSTRAINT "HotelService_hotelServicePropertyID_fkey" FOREIGN KEY ("hotelServicePropertyID") REFERENCES public."HotelServiceProperty"("hotelServicePropertyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Hotel Hotel_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT "Hotel_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public."Company"("companyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Hotel Hotel_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT "Hotel_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Location Location_addressID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES public."Address"("addressID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumComment MuseumComment_museumID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumComment"
    ADD CONSTRAINT "MuseumComment_museumID_fkey" FOREIGN KEY ("museumID") REFERENCES public."Museum"("museumID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumComment MuseumComment_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumComment"
    ADD CONSTRAINT "MuseumComment_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumPrice MuseumPrice_entranceTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumPrice"
    ADD CONSTRAINT "MuseumPrice_entranceTypeID_fkey" FOREIGN KEY ("entranceTypeID") REFERENCES public."MuseumEntranceType"("museumEntranceTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumPrice MuseumPrice_museumID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumPrice"
    ADD CONSTRAINT "MuseumPrice_museumID_fkey" FOREIGN KEY ("museumID") REFERENCES public."Museum"("museumID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumTypeMuseum MuseumTypeMuseum_museumID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumTypeMuseum"
    ADD CONSTRAINT "MuseumTypeMuseum_museumID_fkey" FOREIGN KEY ("museumID") REFERENCES public."Museum"("museumID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumTypeMuseum MuseumTypeMuseum_museumTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumTypeMuseum"
    ADD CONSTRAINT "MuseumTypeMuseum_museumTypeID_fkey" FOREIGN KEY ("museumTypeID") REFERENCES public."MuseumType"("museumTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumWorkingDaySchedule MuseumWorkingDaySchedule_museumWorkingDayID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDaySchedule"
    ADD CONSTRAINT "MuseumWorkingDaySchedule_museumWorkingDayID_fkey" FOREIGN KEY ("museumWorkingDayID") REFERENCES public."MuseumWorkingDay"("museumWorkingDayID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumWorkingDaySchedule MuseumWorkingDaySchedule_museumWorkingScheduleID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDaySchedule"
    ADD CONSTRAINT "MuseumWorkingDaySchedule_museumWorkingScheduleID_fkey" FOREIGN KEY ("museumWorkingScheduleID") REFERENCES public."MuseumWorkingSchedule"("museumWorkingScheduleID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumWorkingDay MuseumWorkingDay_dayID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingDay"
    ADD CONSTRAINT "MuseumWorkingDay_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES public."Day"("dayID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: MuseumWorkingSchedule MuseumWorkingSchedule_museumID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuseumWorkingSchedule"
    ADD CONSTRAINT "MuseumWorkingSchedule_museumID_fkey" FOREIGN KEY ("museumID") REFERENCES public."Museum"("museumID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Museum Museum_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Museum"
    ADD CONSTRAINT "Museum_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public."Company"("companyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Museum Museum_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Museum"
    ADD CONSTRAINT "Museum_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantAndCuisineType RestaurantAndCuisineType_restaurantCuisineTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantAndCuisineType"
    ADD CONSTRAINT "RestaurantAndCuisineType_restaurantCuisineTypeID_fkey" FOREIGN KEY ("restaurantCuisineTypeID") REFERENCES public."RestaurantCuisineType"("restaurantCuisineTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantAndCuisineType RestaurantAndCuisineType_restaurantID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantAndCuisineType"
    ADD CONSTRAINT "RestaurantAndCuisineType_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES public."Restaurant"("restaurantID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantComment RestaurantComment_restaurantID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantComment"
    ADD CONSTRAINT "RestaurantComment_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES public."Restaurant"("restaurantID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantComment RestaurantComment_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantComment"
    ADD CONSTRAINT "RestaurantComment_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantFood RestaurantFood_restaurantFoodTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantFood"
    ADD CONSTRAINT "RestaurantFood_restaurantFoodTypeID_fkey" FOREIGN KEY ("restaurantFoodTypeID") REFERENCES public."RestaurantFoodType"("restaurantFoodTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantMenuFood RestaurantMenuFood_restaurantFoodID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenuFood"
    ADD CONSTRAINT "RestaurantMenuFood_restaurantFoodID_fkey" FOREIGN KEY ("restaurantFoodID") REFERENCES public."RestaurantFood"("restaurantFoodID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantMenuFood RestaurantMenuFood_restaurantMenuID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenuFood"
    ADD CONSTRAINT "RestaurantMenuFood_restaurantMenuID_fkey" FOREIGN KEY ("restaurantMenuID") REFERENCES public."RestaurantMenu"("restaurantMenuID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantMenu RestaurantMenu_restaurantID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantMenu"
    ADD CONSTRAINT "RestaurantMenu_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES public."Restaurant"("restaurantID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantWorkingDaySchedule RestaurantWorkingDaySchedule_restaurantWorkingDayID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDaySchedule"
    ADD CONSTRAINT "RestaurantWorkingDaySchedule_restaurantWorkingDayID_fkey" FOREIGN KEY ("restaurantWorkingDayID") REFERENCES public."RestaurantWorkingDay"("restaurantWorkingDayID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantWorkingDaySchedule RestaurantWorkingDaySchedule_restaurantWorkingScheduleID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDaySchedule"
    ADD CONSTRAINT "RestaurantWorkingDaySchedule_restaurantWorkingScheduleID_fkey" FOREIGN KEY ("restaurantWorkingScheduleID") REFERENCES public."RestaurantWorkingSchedule"("restaurantWorkingScheduleID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantWorkingDay RestaurantWorkingDay_dayID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingDay"
    ADD CONSTRAINT "RestaurantWorkingDay_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES public."Day"("dayID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RestaurantWorkingSchedule RestaurantWorkingSchedule_restaurantID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RestaurantWorkingSchedule"
    ADD CONSTRAINT "RestaurantWorkingSchedule_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES public."Restaurant"("restaurantID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Restaurant Restaurant_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Restaurant"
    ADD CONSTRAINT "Restaurant_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public."Company"("companyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Restaurant Restaurant_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Restaurant"
    ADD CONSTRAINT "Restaurant_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: Restaurant Restaurant_restaurantTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Restaurant"
    ADD CONSTRAINT "Restaurant_restaurantTypeID_fkey" FOREIGN KEY ("restaurantTypeID") REFERENCES public."RestaurantType"("restaurantTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RoomPicture RoomPicture_roomID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPicture"
    ADD CONSTRAINT "RoomPicture_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES public."Room"("roomID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RoomPrice RoomPrice_roomID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPrice"
    ADD CONSTRAINT "RoomPrice_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES public."Room"("roomID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RoomPropertyRoom RoomPropertyRoom_roomID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPropertyRoom"
    ADD CONSTRAINT "RoomPropertyRoom_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES public."Room"("roomID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: RoomPropertyRoom RoomPropertyRoom_roomPropertyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomPropertyRoom"
    ADD CONSTRAINT "RoomPropertyRoom_roomPropertyID_fkey" FOREIGN KEY ("roomPropertyID") REFERENCES public."RoomProperty"("roomPropertyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideArchSite TravelGuideArchSite_archSiteID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideArchSite"
    ADD CONSTRAINT "TravelGuideArchSite_archSiteID_fkey" FOREIGN KEY ("archSiteID") REFERENCES public."ArchSite"("archSiteID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideArchSite TravelGuideArchSite_travelGuideID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideArchSite"
    ADD CONSTRAINT "TravelGuideArchSite_travelGuideID_fkey" FOREIGN KEY ("travelGuideID") REFERENCES public."TravelGuide"("travelGuideID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideHotel TravelGuideHotel_hotelID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideHotel"
    ADD CONSTRAINT "TravelGuideHotel_hotelID_fkey" FOREIGN KEY ("hotelID") REFERENCES public."Hotel"("hotelID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideHotel TravelGuideHotel_travelGuideID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideHotel"
    ADD CONSTRAINT "TravelGuideHotel_travelGuideID_fkey" FOREIGN KEY ("travelGuideID") REFERENCES public."TravelGuide"("travelGuideID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideLocation TravelGuideLocation_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideLocation"
    ADD CONSTRAINT "TravelGuideLocation_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public."Location"("locationID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideLocation TravelGuideLocation_travelGuideID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideLocation"
    ADD CONSTRAINT "TravelGuideLocation_travelGuideID_fkey" FOREIGN KEY ("travelGuideID") REFERENCES public."TravelGuide"("travelGuideID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideMuseum TravelGuideMuseum_museumID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideMuseum"
    ADD CONSTRAINT "TravelGuideMuseum_museumID_fkey" FOREIGN KEY ("museumID") REFERENCES public."Museum"("museumID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideMuseum TravelGuideMuseum_travelGuideID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideMuseum"
    ADD CONSTRAINT "TravelGuideMuseum_travelGuideID_fkey" FOREIGN KEY ("travelGuideID") REFERENCES public."TravelGuide"("travelGuideID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideRestaurant TravelGuideRestaurant_restaurantID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideRestaurant"
    ADD CONSTRAINT "TravelGuideRestaurant_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES public."Restaurant"("restaurantID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuideRestaurant TravelGuideRestaurant_travelGuideID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuideRestaurant"
    ADD CONSTRAINT "TravelGuideRestaurant_travelGuideID_fkey" FOREIGN KEY ("travelGuideID") REFERENCES public."TravelGuide"("travelGuideID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: TravelGuide TravelGuide_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelGuide"
    ADD CONSTRAINT "TravelGuide_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."User"("userID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: User User_loginTypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_loginTypeID_fkey" FOREIGN KEY ("loginTypeID") REFERENCES public."LoginType"("loginTypeID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: User User_phoneID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_phoneID_fkey" FOREIGN KEY ("phoneID") REFERENCES public."Phone"("phoneID") ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

