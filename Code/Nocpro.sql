CREATE TABLE "service" (
  "id" int PRIMARY KEY,
  "service_code" varchar,
  "service_name" varchar
);

CREATE TABLE "group_module" (
  "id" int PRIMARY KEY,
  "service_id" int,
  "group_module_code" varchar,
  "group_module_name" varchar
);

CREATE TABLE "server" (
  "id" int PRIMARY KEY,
  "server_ip" varchar
);

CREATE TABLE "module" (
  "id" int PRIMARY KEY,
  "group_module_id" int,
  "service_id" int,
  "server_id" int,
  "module_code" varchar,
  "module_name" varchar
);

CREATE TABLE "database" (
  "id" int PRIMARY KEY,
  "database_code" varchar,
  "database_name" varchar,
  "server_id" int,
  "service_id" int
);

CREATE TABLE "storage" (
  "id" int PRIMARY KEY,
  "storage_name" varchar,
  "storage_code" varchar,
  "server_id" int
);

CREATE TABLE "load_balance" (
  "id" int PRIMARY KEY,
  "lb_code" varchar,
  "lb_name" varchar,
  "ip" varchar,
  "port" int,
  "service_id" int
);

CREATE TABLE "connection" (
  "id" int PRIMARY KEY,
  "service_module_id_source" int,
  "service_module_id_dest" int,
  "ip_source" varchar,
  "ip_dest" varchar,
  "port" int,
  "type" int
);

ALTER TABLE "group_module" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");

ALTER TABLE "module" ADD FOREIGN KEY ("group_module_id") REFERENCES "group_module" ("id");

ALTER TABLE "module" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");

ALTER TABLE "module" ADD FOREIGN KEY ("server_id") REFERENCES "server" ("id");

ALTER TABLE "database" ADD FOREIGN KEY ("server_id") REFERENCES "server" ("id");

ALTER TABLE "database" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");

ALTER TABLE "storage" ADD FOREIGN KEY ("server_id") REFERENCES "server" ("id");

ALTER TABLE "load_balance" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");

ALTER TABLE "connection" ADD FOREIGN KEY ("service_module_id_source") REFERENCES "module" ("id");

ALTER TABLE "connection" ADD FOREIGN KEY ("service_module_id_dest") REFERENCES "module" ("id");
