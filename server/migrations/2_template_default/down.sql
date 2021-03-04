
ALTER TABLE "public"."users" DROP CONSTRAINT "users_organization_id_fkey";
ALTER TABLE "public"."users" DROP COLUMN "organization_id";
DROP TABLE "public"."organizations";
DROP TABLE "public"."organization_models";
DROP TABLE "public"."models";
DROP TABLE "public"."jobs";
DROP TABLE "public"."job_status";
DROP TABLE "public"."job_types";
DROP TABLE "public"."generated_text";

DROP SEQUENCE public.job_id_seq;
DROP SEQUENCE public.job_type_id_seq;
DROP SEQUENCE public.job_status_id_seq;
DROP SEQUENCE public.model_id_seq;
DROP SEQUENCE public.organizations_id_seq;
