CREATE TABLE "professional" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "CPF" varchar,
  "date_of_birth" date,
  "unit_id" int,
  "created at" date
);

CREATE TABLE "client" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "CPF" varchar,
  "date_of_birth" date,
  "created at" date
);

CREATE TABLE "service" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "description" varchar,
  "price" varchar
);

CREATE TABLE "schedule" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "day_and_time" varchar,
  "professional_id" int,
  "client_id" int,
  "service_id" int,
  "created at" date,
  "available" boolean
);

CREATE TABLE "unit" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "CNPJ" varchar,
  "adress" varchar,
  "created at" date
);

ALTER TABLE "professional" ADD CONSTRAINT "fk_unit" FOREIGN KEY ("unit_id") REFERENCES "unit" ("id") ON DELETE CASCADE;

ALTER TABLE "schedule" ADD CONSTRAINT "fk_professional" FOREIGN KEY ("professional_id") REFERENCES "professional" ("id") ON DELETE CASCADE;

ALTER TABLE "schedule" ADD CONSTRAINT "fk_client" FOREIGN KEY ("client_id") REFERENCES "client" ("id") ON DELETE CASCADE;

ALTER TABLE "schedule" ADD CONSTRAINT "fk_service" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE CASCADE;
