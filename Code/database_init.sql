-- Bảng Service
CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(50) NOT NULL,
    service_name VARCHAR(255) NOT NULL
);

-- Bảng GroupModule
CREATE TABLE group_module (
    id SERIAL PRIMARY KEY,
    service_id INT REFERENCES service(id),
    group_module_code VARCHAR(50),
    group_module_name VARCHAR(255)
);

-- Bảng Instance
CREATE TABLE instance (
    id SERIAL PRIMARY KEY,
    instance_ip VARCHAR(50) NOT NULL
);

-- Bảng Module
CREATE TABLE module (
    id SERIAL PRIMARY KEY,
    group_module_id INT REFERENCES group_module(id),
    service_id INT REFERENCES service(id),
    instance_id INT REFERENCES instance(id),
    module_code VARCHAR(50),
    module_name VARCHAR(255)
);

-- Bảng Database
CREATE TABLE database_entity (
    id SERIAL PRIMARY KEY,
    database_code VARCHAR(50),
    database_name VARCHAR(255),
    instance_id INT REFERENCES instance(id),
    service_id INT REFERENCES service(id)
);

-- Bảng Storage
CREATE TABLE storage (
    id SERIAL PRIMARY KEY,
    storage_name VARCHAR(255),
    storage_code VARCHAR(50),
    instance_id INT REFERENCES instance(id)
);

-- Bảng LoadBalance
CREATE TABLE load_balance (
    id SERIAL PRIMARY KEY,
    lb_code VARCHAR(50),
    lb_name VARCHAR(255),
    ip VARCHAR(50),
    port INT,
    service_id INT REFERENCES service(id)
);

-- Bảng Connection
CREATE TABLE connection (
    id SERIAL PRIMARY KEY,
    service_module_id_source INT REFERENCES module(id),
    service_module_id_dest INT REFERENCES module(id),
    ip_source VARCHAR(50),
    ip_dest VARCHAR(50),
    port INT,
    type INT CHECK (type IN (1,2,3)) -- 1: module->module, 2: module->LB, 3: module->DB
);
