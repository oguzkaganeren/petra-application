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
    destruction text
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
    star real DEFAULT 0 NOT NULL
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
    content text NOT NULL
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
    "archSiteEntranceTypeID" integer NOT NULL
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
    name text NOT NULL
);


ALTER TABLE public."ArchSiteType" OWNER TO postgres;

--
-- Name: ArchSiteTypeArchSite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteTypeArchSite" (
    "archSiteTypeArchSiteID" integer NOT NULL,
    "archSiteTypeID" integer NOT NULL,
    "archSiteID" integer NOT NULL
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
    "dayID" integer NOT NULL
);


ALTER TABLE public."ArchSiteWorkingDay" OWNER TO postgres;

--
-- Name: ArchSiteWorkingDaySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArchSiteWorkingDaySchedule" (
    "archSiteWorkingDayScheduleID" integer NOT NULL,
    "archSiteWorkingDayID" integer NOT NULL,
    "archSiteWorkingScheduleID" integer NOT NULL
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
    "archSiteID" integer NOT NULL
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
    "editDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."Article" OWNER TO postgres;

--
-- Name: ArticleTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArticleTag" (
    "articleTagID" integer NOT NULL,
    "articleID" integer NOT NULL,
    "tagID" integer NOT NULL
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
    "articleID" integer NOT NULL
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
    "faxNumber" text
);


ALTER TABLE public."Company" OWNER TO postgres;

--
-- Name: CompanyContact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompanyContact" (
    "companyContactID" integer NOT NULL,
    "compantUserID" integer NOT NULL,
    authority text NOT NULL
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
    "companyID" integer NOT NULL
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
    "companyID" integer NOT NULL
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
-- Name: Day; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Day" (
    "dayID" integer NOT NULL,
    name text NOT NULL
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
-- Name: Hotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hotel" (
    "hotelID" integer NOT NULL,
    "companyID" integer NOT NULL,
    "locationID" integer NOT NULL
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
    star real DEFAULT 0 NOT NULL
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
    "roomID" integer NOT NULL
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
    "hotelServicePropertyID" integer NOT NULL
);


ALTER TABLE public."HotelService" OWNER TO postgres;

--
-- Name: HotelServiceProperty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HotelServiceProperty" (
    "hotelServicePropertyID" integer NOT NULL,
    content text NOT NULL
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
    "latitudeDelta" real NOT NULL,
    "longtitudeDelta" real NOT NULL,
    address text
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
    type text NOT NULL
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
    description text NOT NULL
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
    star real DEFAULT 0 NOT NULL
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
    content text NOT NULL
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
    "entranceTypeID" integer NOT NULL
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
-- Name: MuseumWorkingDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumWorkingDay" (
    "museumWorkingDayID" integer NOT NULL,
    "openHour" time with time zone NOT NULL,
    "closeHour" time with time zone NOT NULL,
    "dayID" integer NOT NULL
);


ALTER TABLE public."MuseumWorkingDay" OWNER TO postgres;

--
-- Name: MuseumWorkingDaySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuseumWorkingDaySchedule" (
    "museumWorkingDayScheduleID" integer NOT NULL,
    "museumWorkingDayID" integer NOT NULL,
    "museumWorkingScheduleID" integer NOT NULL
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
    "museumID" integer NOT NULL
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
    phone text NOT NULL
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
-- Name: Restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Restaurant" (
    "restaurantID" integer NOT NULL,
    name text NOT NULL,
    "restaurantTypeID" integer NOT NULL,
    "ISO" text,
    since date NOT NULL,
    star real DEFAULT 0,
    "locationID" integer NOT NULL
);


ALTER TABLE public."Restaurant" OWNER TO postgres;

--
-- Name: RestaurantAndCuisineType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantAndCuisineType" (
    "restaurantAndCuisineTypeID" integer NOT NULL,
    "restaurantID" integer NOT NULL,
    "restaurantCuisineTypeID" integer NOT NULL
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
    star real DEFAULT 0 NOT NULL
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
    name text NOT NULL
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
    price real
);


ALTER TABLE public."RestaurantFood" OWNER TO postgres;

--
-- Name: RestaurantFoodType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantFoodType" (
    "restaurantFoodTypeID" integer NOT NULL,
    type text NOT NULL
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
    "restaurantID" integer NOT NULL
);


ALTER TABLE public."RestaurantMenu" OWNER TO postgres;

--
-- Name: RestaurantMenuFood; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantMenuFood" (
    "restaurantMenuFoodID" integer NOT NULL,
    "restaurantMenuID" integer NOT NULL,
    "restaurantFoodID" integer NOT NULL
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
    type text NOT NULL
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
    "dayID" integer NOT NULL
);


ALTER TABLE public."RestaurantWorkingDay" OWNER TO postgres;

--
-- Name: RestaurantWorkingDaySchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RestaurantWorkingDaySchedule" (
    "restaurantWorkingDaySchedule" integer NOT NULL,
    "restaurantWorkingDayID" integer NOT NULL,
    "restaurantWorkingScheduleID" integer NOT NULL
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
    "restaurantID" integer NOT NULL
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
    "roomPropertyID" integer NOT NULL
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: RoomPicture; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomPicture" (
    "roomPictureID" integer NOT NULL,
    url text NOT NULL,
    "addDate" timestamp with time zone NOT NULL,
    "roomID" integer NOT NULL
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
    "roomID" integer NOT NULL
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
    content text NOT NULL
);


ALTER TABLE public."RoomProperty" OWNER TO postgres;

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
    name text NOT NULL
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
    cost real
);


ALTER TABLE public."TravelGuide" OWNER TO postgres;

--
-- Name: TravelGuideArchSite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelGuideArchSite" (
    "travelGuideArchSiteID" integer NOT NULL,
    "travelGuideID" integer NOT NULL,
    "archSiteID" integer NOT NULL,
    note text
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
    note text
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
    "locationID" integer NOT NULL
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
    note text
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
    note text
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
    "loginTypeID" integer NOT NULL,
    "profileImageUrl" text,
    "userTypeID" integer NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "phoneID" integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserType" (
    "userTypeID" integer NOT NULL,
    type text NOT NULL
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
-- Name: Day dayID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Day" ALTER COLUMN "dayID" SET DEFAULT nextval('public."Day_dayID_seq"'::regclass);


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
\.


--
-- Data for Name: hdb_schema_update_event; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_update_event (instance_id, occurred_at) FROM stdin;
85c26219-23ae-4a04-913c-127cd09e5a4a	2020-01-20 11:27:37.412999+00
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
public	Phone	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	UserType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	User	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	LoginType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Location	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Company	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CompanyUser	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CompanyPhone	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CompanyContact	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomProperty	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Room	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomPicture	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Hotel	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelRoom	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelServiceProperty	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	HotelService	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Day	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Museum	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumEntranceType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumPrice	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumWorkingDay	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumWorkingSchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	MuseumWorkingDaySchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSite	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteEntranceType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSitePrice	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteWorkingDay	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteWorkingSchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteWorkingDaySchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteTypeArchSite	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Restaurant	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantMenu	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantFoodType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantFood	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantMenuFood	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantCuisineType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantAndCuisineType	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantWorkingDay	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantWorkingSchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RestaurantWorkingDaySchedule	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuide	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideMuseum	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideHotel	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideArchSite	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideRestaurant	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	TravelGuideLocation	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Article	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArticleUser	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Tag	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArticleTag	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	ArchSiteComment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	RoomPrice	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
e3cc6b65-b3ec-415b-8dbb-5e8fb8a5ae4e	28	2020-01-20 09:25:41.337064+00	{}	{"telemetryNotificationShown": true}
\.


--
-- Data for Name: remote_schemas; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.remote_schemas (id, name, definition, comment) FROM stdin;
\.


--
-- Data for Name: ArchSite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSite" ("archSiteID", "companyID", "locationID", name, description, age, period, altitude, diameter, destruction) FROM stdin;
\.


--
-- Data for Name: ArchSiteComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteComment" ("archSiteCommentID", "archSiteID", "userID", content, date, star) FROM stdin;
\.


--
-- Data for Name: ArchSiteEntranceType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteEntranceType" ("archSiteEntranceTypeID", content) FROM stdin;
\.


--
-- Data for Name: ArchSitePrice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSitePrice" ("archSitePriceID", price, "startDate", "finishDate", "archSiteID", "archSiteEntranceTypeID") FROM stdin;
\.


--
-- Data for Name: ArchSiteType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteType" ("archSiteTypeID", name) FROM stdin;
\.


--
-- Data for Name: ArchSiteTypeArchSite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteTypeArchSite" ("archSiteTypeArchSiteID", "archSiteTypeID", "archSiteID") FROM stdin;
\.


--
-- Data for Name: ArchSiteWorkingDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteWorkingDay" ("archSiteWorkingDayID", "openHour", "closeHour", "dayID") FROM stdin;
\.


--
-- Data for Name: ArchSiteWorkingDaySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteWorkingDaySchedule" ("archSiteWorkingDayScheduleID", "archSiteWorkingDayID", "archSiteWorkingScheduleID") FROM stdin;
\.


--
-- Data for Name: ArchSiteWorkingSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArchSiteWorkingSchedule" ("archSiteWorkingScheduleID", "startDate", "finishDate", "archSiteID") FROM stdin;
\.


--
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Article" ("articleID", title, content, "publishDate", "editDate") FROM stdin;
\.


--
-- Data for Name: ArticleTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArticleTag" ("articleTagID", "articleID", "tagID") FROM stdin;
\.


--
-- Data for Name: ArticleUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArticleUser" ("articleUserID", "userID", "articleID") FROM stdin;
\.


--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Company" ("companyID", name, "taxNumber", mail, "registerDate", "logoUrl", description, "locationID", "faxNumber") FROM stdin;
\.


--
-- Data for Name: CompanyContact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyContact" ("companyContactID", "compantUserID", authority) FROM stdin;
\.


--
-- Data for Name: CompanyPhone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyPhone" ("companyPhoneID", "phoneID", "companyID") FROM stdin;
\.


--
-- Data for Name: CompanyUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyUser" ("companyUserID", "userID", "companyID") FROM stdin;
\.


--
-- Data for Name: Day; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Day" ("dayID", name) FROM stdin;
\.


--
-- Data for Name: Hotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hotel" ("hotelID", "companyID", "locationID") FROM stdin;
\.


--
-- Data for Name: HotelComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelComment" ("hotelCommentID", "hotelID", "userID", content, date, star) FROM stdin;
\.


--
-- Data for Name: HotelRoom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelRoom" ("hotelRoomID", "hotelID", "roomID") FROM stdin;
\.


--
-- Data for Name: HotelService; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelService" ("hotelServiceHotelID", "hotelID", "hotelServicePropertyID") FROM stdin;
\.


--
-- Data for Name: HotelServiceProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HotelServiceProperty" ("hotelServicePropertyID", content) FROM stdin;
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" ("locationID", latitude, longtitude, "latitudeDelta", "longtitudeDelta", address) FROM stdin;
\.


--
-- Data for Name: LoginType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LoginType" ("loginTypeID", type) FROM stdin;
\.


--
-- Data for Name: Museum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Museum" ("museumID", "companyID", "locationID", name, description) FROM stdin;
\.


--
-- Data for Name: MuseumComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumComment" ("museumCommentID", "museumID", "userID", content, date, star) FROM stdin;
\.


--
-- Data for Name: MuseumEntranceType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumEntranceType" ("museumEntranceTypeID", content) FROM stdin;
\.


--
-- Data for Name: MuseumPrice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumPrice" ("museumPriceID", price, "startDate", "finishDate", "museumID", "entranceTypeID") FROM stdin;
\.


--
-- Data for Name: MuseumWorkingDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumWorkingDay" ("museumWorkingDayID", "openHour", "closeHour", "dayID") FROM stdin;
\.


--
-- Data for Name: MuseumWorkingDaySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumWorkingDaySchedule" ("museumWorkingDayScheduleID", "museumWorkingDayID", "museumWorkingScheduleID") FROM stdin;
\.


--
-- Data for Name: MuseumWorkingSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuseumWorkingSchedule" ("museumWorkingScheduleID", "startDate", "finishDate", "museumID") FROM stdin;
\.


--
-- Data for Name: Phone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Phone" ("phoneID", phone) FROM stdin;
\.


--
-- Data for Name: Restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Restaurant" ("restaurantID", name, "restaurantTypeID", "ISO", since, star, "locationID") FROM stdin;
\.


--
-- Data for Name: RestaurantAndCuisineType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantAndCuisineType" ("restaurantAndCuisineTypeID", "restaurantID", "restaurantCuisineTypeID") FROM stdin;
\.


--
-- Data for Name: RestaurantComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantComment" ("restaurantCommentID", "restaurantID", "userID", content, date, star) FROM stdin;
\.


--
-- Data for Name: RestaurantCuisineType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantCuisineType" ("restaurantCuisineTypeID", name) FROM stdin;
\.


--
-- Data for Name: RestaurantFood; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantFood" ("restaurantFoodID", name, "restaurantFoodTypeID", price) FROM stdin;
\.


--
-- Data for Name: RestaurantFoodType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantFoodType" ("restaurantFoodTypeID", type) FROM stdin;
\.


--
-- Data for Name: RestaurantMenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantMenu" ("restaurantMenuID", name, "restaurantID") FROM stdin;
\.


--
-- Data for Name: RestaurantMenuFood; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantMenuFood" ("restaurantMenuFoodID", "restaurantMenuID", "restaurantFoodID") FROM stdin;
\.


--
-- Data for Name: RestaurantType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantType" ("restaurantTypeID", type) FROM stdin;
\.


--
-- Data for Name: RestaurantWorkingDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantWorkingDay" ("restaurantWorkingDayID", "openHour", "closeHour", "dayID") FROM stdin;
\.


--
-- Data for Name: RestaurantWorkingDaySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantWorkingDaySchedule" ("restaurantWorkingDaySchedule", "restaurantWorkingDayID", "restaurantWorkingScheduleID") FROM stdin;
\.


--
-- Data for Name: RestaurantWorkingSchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RestaurantWorkingSchedule" ("restaurantWorkingScheduleID", "startDate", "finishDate", "restaurantID") FROM stdin;
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" ("roomID", "roomNo", "roomPropertyID") FROM stdin;
\.


--
-- Data for Name: RoomPicture; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomPicture" ("roomPictureID", url, "addDate", "roomID") FROM stdin;
\.


--
-- Data for Name: RoomPrice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomPrice" ("roomPriceID", price, "startDate", "finishDate", "roomID") FROM stdin;
\.


--
-- Data for Name: RoomProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomProperty" ("roomPropertyID", content) FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" ("tagID", name) FROM stdin;
\.


--
-- Data for Name: TravelGuide; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuide" ("travelGuideID", "userID", title, "creationDate", cost) FROM stdin;
\.


--
-- Data for Name: TravelGuideArchSite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideArchSite" ("travelGuideArchSiteID", "travelGuideID", "archSiteID", note) FROM stdin;
\.


--
-- Data for Name: TravelGuideHotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideHotel" ("travelGuideHotel", "travelGuideID", "hotelID", note) FROM stdin;
\.


--
-- Data for Name: TravelGuideLocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideLocation" ("travelGuideLocationID", "travelGuideID", "locationID") FROM stdin;
\.


--
-- Data for Name: TravelGuideMuseum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideMuseum" ("travelGuideMuseumID", "travelGuideID", "museumID", note) FROM stdin;
\.


--
-- Data for Name: TravelGuideRestaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TravelGuideRestaurant" ("travelGuideRestaurantID", "travelGuideID", "restaurantID", note) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("userID", name, surname, mail, "birthDate", "registerDate", "loginDate", "loginIP", "loginTypeID", "profileImageUrl", "userTypeID", "isBlocked", "phoneID") FROM stdin;
\.


--
-- Data for Name: UserType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserType" ("userTypeID", type) FROM stdin;
\.


--
-- Name: remote_schemas_id_seq; Type: SEQUENCE SET; Schema: hdb_catalog; Owner: postgres
--

SELECT pg_catalog.setval('hdb_catalog.remote_schemas_id_seq', 1, false);


--
-- Name: ArchSiteComment_archSiteCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteComment_archSiteCommentID_seq"', 1, false);


--
-- Name: ArchSiteEntranceType_archSiteEntranceTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteEntranceType_archSiteEntranceTypeID_seq"', 1, false);


--
-- Name: ArchSitePrice_archSitePriceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSitePrice_archSitePriceID_seq"', 1, false);


--
-- Name: ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteTypeArchSite_archSiteTypeArchSiteID_seq"', 1, false);


--
-- Name: ArchSiteType_archSiteTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteType_archSiteTypeID_seq"', 1, false);


--
-- Name: ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteWorkingDaySchedule_archSiteWorkingDayScheduleID_seq"', 1, false);


--
-- Name: ArchSiteWorkingDay_archSiteWorkingDayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteWorkingDay_archSiteWorkingDayID_seq"', 1, false);


--
-- Name: ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSiteWorkingSchedule_archSiteWorkingScheduleID_seq"', 1, false);


--
-- Name: ArchSite_archSiteID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArchSite_archSiteID_seq"', 1, false);


--
-- Name: ArticleTag_articleTagID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArticleTag_articleTagID_seq"', 1, false);


--
-- Name: ArticleUser_articleUserID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArticleUser_articleUserID_seq"', 1, false);


--
-- Name: Article_articleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Article_articleID_seq"', 1, false);


--
-- Name: CompanyContact_companyContactID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyContact_companyContactID_seq"', 1, false);


--
-- Name: CompanyPhone_companyPhoneID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyPhone_companyPhoneID_seq"', 1, false);


--
-- Name: CompanyUser_companyUserID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyUser_companyUserID_seq"', 1, false);


--
-- Name: Company_companyID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Company_companyID_seq"', 1, false);


--
-- Name: Day_dayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Day_dayID_seq"', 1, false);


--
-- Name: HotelComment_hotelCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelComment_hotelCommentID_seq"', 1, false);


--
-- Name: HotelRoom_hotelRoomID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelRoom_hotelRoomID_seq"', 1, false);


--
-- Name: HotelServiceProperty_hotelServicePropertyID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelServiceProperty_hotelServicePropertyID_seq"', 1, false);


--
-- Name: HotelService_hotelServiceHotelID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HotelService_hotelServiceHotelID_seq"', 1, false);


--
-- Name: Hotel_hotelID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hotel_hotelID_seq"', 1, false);


--
-- Name: Location_locationID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Location_locationID_seq"', 1, false);


--
-- Name: LoginType_loginTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LoginType_loginTypeID_seq"', 1, false);


--
-- Name: MuseumComment_museumCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumComment_museumCommentID_seq"', 1, false);


--
-- Name: MuseumEntranceType_museumEntranceTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumEntranceType_museumEntranceTypeID_seq"', 1, false);


--
-- Name: MuseumPrice_museumPriceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuseumPrice_museumPriceID_seq"', 1, false);


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

SELECT pg_catalog.setval('public."Museum_museumID_seq"', 1, false);


--
-- Name: Phone_phoneID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Phone_phoneID_seq"', 1, false);


--
-- Name: RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantAndCuisineType_restaurantAndCuisineTypeID_seq"', 1, false);


--
-- Name: RestaurantComment_restaurantCommentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantComment_restaurantCommentID_seq"', 1, false);


--
-- Name: RestaurantCuisineType_restaurantCuisineTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantCuisineType_restaurantCuisineTypeID_seq"', 1, false);


--
-- Name: RestaurantFoodType_restaurantFoodTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantFoodType_restaurantFoodTypeID_seq"', 1, false);


--
-- Name: RestaurantFood_restaurantFoodID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantFood_restaurantFoodID_seq"', 1, false);


--
-- Name: RestaurantMenuFood_restaurantMenuFoodID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantMenuFood_restaurantMenuFoodID_seq"', 1, false);


--
-- Name: RestaurantMenu_restaurantMenuID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantMenu_restaurantMenuID_seq"', 1, false);


--
-- Name: RestaurantType_restaurantTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantType_restaurantTypeID_seq"', 1, false);


--
-- Name: RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantWorkingDaySchedule_restaurantWorkingDaySchedule_seq"', 1, false);


--
-- Name: RestaurantWorkingDay_restaurantWorkingDayID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantWorkingDay_restaurantWorkingDayID_seq"', 1, false);


--
-- Name: RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RestaurantWorkingSchedule_restaurantWorkingScheduleID_seq"', 1, false);


--
-- Name: Restaurant_restaurantID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Restaurant_restaurantID_seq"', 1, false);


--
-- Name: RoomPicture_roomPictureID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomPicture_roomPictureID_seq"', 1, false);


--
-- Name: RoomPrice_roomPriceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomPrice_roomPriceID_seq"', 1, false);


--
-- Name: RoomProperty_roomPropertyID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RoomProperty_roomPropertyID_seq"', 1, false);


--
-- Name: Room_roomID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_roomID_seq"', 1, false);


--
-- Name: Tag_tagID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tag_tagID_seq"', 1, false);


--
-- Name: TravelGuideArchSite_travelGuideArchSiteID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideArchSite_travelGuideArchSiteID_seq"', 1, false);


--
-- Name: TravelGuideHotel_travelGuideHotel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideHotel_travelGuideHotel_seq"', 1, false);


--
-- Name: TravelGuideLocation_travelGuideLocationID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideLocation_travelGuideLocationID_seq"', 1, false);


--
-- Name: TravelGuideMuseum_travelGuideMuseumID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideMuseum_travelGuideMuseumID_seq"', 1, false);


--
-- Name: TravelGuideRestaurant_travelGuideRestaurantID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuideRestaurant_travelGuideRestaurantID_seq"', 1, false);


--
-- Name: TravelGuide_travelGuide_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TravelGuide_travelGuide_seq"', 1, false);


--
-- Name: UserType_userTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserType_userTypeID_seq"', 1, false);


--
-- Name: User_userID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_userID_seq"', 1, false);


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
-- Name: Day Day_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Day"
    ADD CONSTRAINT "Day_pkey" PRIMARY KEY ("dayID");


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
-- Name: Room Room_roomPropertyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_roomPropertyID_fkey" FOREIGN KEY ("roomPropertyID") REFERENCES public."RoomProperty"("roomPropertyID") ON UPDATE RESTRICT ON DELETE RESTRICT;


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

