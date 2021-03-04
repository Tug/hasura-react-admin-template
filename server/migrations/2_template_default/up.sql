
ALTER TABLE public.users ADD COLUMN "organization_id" integer NOT NULL;

CREATE TABLE public.generated_text (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    job_id integer NOT NULL,
    value text NOT NULL
);

CREATE TABLE public.jobs (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone,
    name text NOT NULL,
    model_id integer NOT NULL,
    params json,
    status_id integer DEFAULT 1,
    type_id integer,
    ended_at timestamp with time zone,
    organization_id integer,
    creator_id uuid NOT NULL
);

CREATE TABLE public.job_status (
    id integer NOT NULL,
    value text NOT NULL
);

CREATE TABLE public.job_types (
    id integer NOT NULL,
    value text NOT NULL
);

CREATE TABLE public.models (
    id integer NOT NULL,
    name text NOT NULL,
    path text NOT NULL,
    parent_model_id integer,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.organization_models (
    organization_id integer NOT NULL,
    model_id integer NOT NULL
);

CREATE TABLE public.organizations (
    id integer NOT NULL,
    name text NOT NULL,
    admin_id uuid NOT NULL
);

CREATE SEQUENCE public.job_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.job_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.job_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.model_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.job_id_seq OWNED BY public.jobs.id;
ALTER SEQUENCE public.job_type_id_seq OWNED BY public.job_types.id;
ALTER SEQUENCE public.job_status_id_seq OWNED BY public.job_status.id;
ALTER SEQUENCE public.model_id_seq OWNED BY public.models.id;
ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;

SELECT pg_catalog.setval('public.job_id_seq', 1, true);
SELECT pg_catalog.setval('public.job_status_id_seq', 1, true);
SELECT pg_catalog.setval('public.job_type_id_seq', 1, true);
SELECT pg_catalog.setval('public.model_id_seq', 1, true);
SELECT pg_catalog.setval('public.organizations_id_seq', 1, true);

ALTER TABLE ONLY public.job_status ALTER COLUMN id SET DEFAULT nextval('public.job_status_id_seq'::regclass);
ALTER TABLE ONLY public.job_types ALTER COLUMN id SET DEFAULT nextval('public.job_type_id_seq'::regclass);
ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.job_id_seq'::regclass);
ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.model_id_seq'::regclass);
ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);

INSERT INTO public.job_status (id, value)
    VALUES (1, 'pending'), (2, 'in progress'), (3, 'done'), (4, 'failed');

INSERT INTO public.job_types (id, value)
    VALUES (1, 'generate'), (2, 'train'), (3, 'evaluate');

ALTER TABLE ONLY public.generated_text
    ADD CONSTRAINT generated_text_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job_status
    ADD CONSTRAINT job_status_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job_status
    ADD CONSTRAINT job_status_value_key UNIQUE (value);
ALTER TABLE ONLY public.job_types
    ADD CONSTRAINT job_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.models
    ADD CONSTRAINT model_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organization_models
    ADD CONSTRAINT organization_models_pkey PRIMARY KEY (organization_id, model_id);
ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.generated_text
    ADD CONSTRAINT generated_text_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT job_model_fkey FOREIGN KEY (model_id) REFERENCES public.models(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT job_status_fkey FOREIGN KEY (status_id) REFERENCES public.job_status(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT job_type_fkey FOREIGN KEY (type_id) REFERENCES public.job_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.models
    ADD CONSTRAINT model_parent_model_fkey FOREIGN KEY (parent_model_id) REFERENCES public.models(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.organization_models
    ADD CONSTRAINT organization_models_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.organization_models
    ADD CONSTRAINT organization_models_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
