CREATE TABLE "Service" (
  "id" int PRIMARY KEY,
  "service_code" varchar,
  "service_name" varchar
);

CREATE TABLE "GroupModule" (
  "id" int PRIMARY KEY,
  "service_id" int,
  "group_module_code" varchar,
  "group_module_name" varchar
);

CREATE TABLE "Instance" (
  "id" int PRIMARY KEY,
  "instance_ip" varchar
);

CREATE TABLE "Module" (
  "id" int PRIMARY KEY,
  "group_module_id" int,
  "service_id" int,
  "instance_id" int,
  "module_code" varchar,
  "module_name" varchar
);

CREATE TABLE "Database" (
  "id" int PRIMARY KEY,
  "database_code" varchar,
  "database_name" varchar,
  "instance_id" int,
  "service_id" int
);

CREATE TABLE "Storage" (
  "id" int PRIMARY KEY,
  "storage_name" varchar,
  "storage_code" varchar,
  "instance_id" int
);

CREATE TABLE "LoadBalance" (
  "id" int PRIMARY KEY,
  "lb_code" varchar,
  "lb_name" varchar,
  "ip" varchar,
  "port" int,
  "service_id" int
);

CREATE TABLE "Connection" (
  "id" int PRIMARY KEY,
  "service_module_id_source" int,
  "service_module_id_dest" int,
  "ip_source" varchar,
  "ip_dest" varchar,
  "port" int,
  "type" int
);

ALTER TABLE "GroupModule" ADD FOREIGN KEY ("service_id") REFERENCES "Service" ("id");

ALTER TABLE "Module" ADD FOREIGN KEY ("group_module_id") REFERENCES "GroupModule" ("id");

ALTER TABLE "Module" ADD FOREIGN KEY ("service_id") REFERENCES "Service" ("id");

ALTER TABLE "Module" ADD FOREIGN KEY ("instance_id") REFERENCES "Instance" ("id");

ALTER TABLE "Database" ADD FOREIGN KEY ("instance_id") REFERENCES "Instance" ("id");

ALTER TABLE "Database" ADD FOREIGN KEY ("service_id") REFERENCES "Service" ("id");

ALTER TABLE "Storage" ADD FOREIGN KEY ("instance_id") REFERENCES "Instance" ("id");

ALTER TABLE "LoadBalance" ADD FOREIGN KEY ("service_id") REFERENCES "Service" ("id");

ALTER TABLE "Connection" ADD FOREIGN KEY ("service_module_id_source") REFERENCES "Module" ("id");

ALTER TABLE "Connection" ADD FOREIGN KEY ("service_module_id_dest") REFERENCES "Module" ("id");
