# Đặc tả phần mềm

- [Đặc tả phần mềm](#đặc-tả-phần-mềm)
  - [1. Sơ đồ usecase](#1-sơ-đồ-usecase)
  - [2. Scenario](#2-scenario)
    - [2.1. View topology](#21-view-topology)
  - [3. Danh sách API](#3-danh-sách-api)
    - [3.1. GET](#31-get)
      - [3.1.1. */api/services*](#311-apiservices)
      - [3.1.2. */api/services/{serviceId}/group-modules*](#312-apiservicesserviceidgroup-modules)
      - [3.1.3. */api/services/{serviceId}/databases*](#313-apiservicesserviceiddatabases)
      - [3.1.4. */api/services/{serviceId}/load-balancers*](#314-apiservicesserviceidload-balancers)
      - [3.1.5. */api/modules/{moduleId}/connections*](#315-apimodulesmoduleidconnections)
      - [3.1.6. */api/servers/{serverId}*](#316-apiserversserverid)

## 1. Sơ đồ usecase
## 2. Scenario
### 2.1. View topology
|Usecase|View topology|
|---|---|
|Actor|System monitor|
|Tiền điều kiện|Đăng nhập thành công|
|Kịch bản chính|<ol><li>System monitor đăng nhập thành công</li><li>Trang chủ hiện lên, hiển thị danh sách các dịch vụ đang được giám sát</br><table><thead><tr><th>STT</th><th>Mã dịch vụ</th><th>Tên dịch vụ</th></tr></thead><tbody><tr><td>1</td><td>AUTH</td><td>Authentication service</td></tr><tr><td>2</td><td>BILL</td><td>Billing service</td></tr><tr><td>3</td><td>NMS</td><td>Network management service</td></tr></tbody></table></li><li>System monitor chọn dịch vụ <i>Billing service</i> </li><li>Hệ thống hiển thị topo của dịch vụ <i>Billing service</i></li><li>System monitor chọn thoát/trang chủ</li><li>Hệ thống quay lại trang chủ</li></ol>|
|Ngoại lệ||

## 3. Danh sách API
### 3.1. GET
#### 3.1.1. */api/services*
**Mục đích**  
Lấy danh sách toàn bộ service đang được giám sát.

**Tham số**  
* Tham số URL: Không
* Tham số query: 
  * `page` và `limit`: cho phân trang
* Tham số header:
  * `JWT token`: authentication
* Tham số body: Không

**Logic**  
1. Xác thực người dùng
2. Truy vấn bảng `services` trong DB
3. Trả về danh sách dịch vụ

**Response**  
* 200 ok:
   ```json
   {
      "statusCode": 200,
      "message": "ok",
      "result": [
         {
            "id": 1,
            "service_code": "AUTH",
            "service_name": "Authentication Service"
         },
         {
            "id": 2,
            "service_code": "CRM",
            "service_name": "CRM Service"
         },
         {
            "id": 3,
            "service_code": "BILL",
            "service_name": "Billing Service"
         }
      ]
   }
   ```

#### 3.1.2. */api/services/{serviceId}/group-modules*
**Mục đích**  
Lấy danh sách group module của một service, bao gồm danh sách các module trong group.

**Tham số**  
* Tham số URL:
  * `serviceId`: id của service cần truy vấn
* Tham số query: không
* Tham số header:
  * `JWT token`: authentication
* Tham số body: Không

**Logic**  
1. Xác thực người dùng
2. Truy vấn bảng `group_modules` trong DB với điều kiện `service_id = tham số`
3. Join sang bảng `modules` để lấy các module trong group
4. Join sang bảng `servers` để lấy `serverIp` của từng `module`
5. Trả về danh sách *group module*
   
**Response**  
* 200 ok:
   ```json
   {
      "statusCode": 200,
      "message": "ok",
      "result": {
         "id": 1,
         "service_id": 1,
         "group_module_code": "API",
         "group_module_name": "API Gateway",
         "modules": [
            {
            "id": 1,
            "group_module_id": 1,
            "service_id": 1,
            "instance_id": 1,
            "module_code": "AUTH-API_1",
            "module_name": "Auth API #1"
            },
            {
            "id": 2,
            "group_module_id": 1,
            "service_id": 1,
            "instance_id": 2,
            "module_code": "AUTH-API_2",
            "module_name": "Auth API #2"
            }
         ]
      }
   }
   ```

#### 3.1.3. */api/services/{serviceId}/databases*
**Mục đích**  
Lấy danh sách database của một service.

**Tham số**  
* Tham số URL:
  * `serviceId`: id của service cần truy vấn
* Tham số query: không
* Tham số header:
  * `JWT token`: authentication
* Tham số body: Không

**Logic**  
1. Xác thực người dùng
2. Truy vấn bảng `databases` trong DB với điều kiện `service_id = tham số`
3. Join sang bảng `servers` để lấy `serverIp`
4. Trả về danh sách database

**Response**  
* 200 ok:
   ```json
   {
      "statusCode": 200,
      "message": "ok",
      "result": [
         {
            "id": 1,
            "database_code": "AUTH_DB_1",
            "database_name": "AUTH DB Node 1",
            "instance_id": 9,
            "service_id": 1
         },
         {
            "id": 2,
            "database_code": "AUTH_DB_2",
            "database_name": "AUTH DB Node 2",
            "instance_id": 18,
            "service_id": 1
         }
      ]
   }
   ```
   
#### 3.1.4. */api/services/{serviceId}/load-balancers*
**Mục đích**  
Lấy danh sách *load balancer* của một service.

**Tham số**  
* Tham số URL:
  * `serviceId`: id của service cần truy vấn
* Tham số query: không
* Tham số header:
  * `JWT token`: authentication
* Tham số body: Không

**Logic**  
1. Xác thực người dùng
2. Truy vấn bảng `load_balancers` trong DB với điều kiện `service_id = tham số`
3. Trả về danh sách *load balancer*

**Response**  
* 200 ok:
   ```json
   {
      "statusCode": 200,
      "message": "ok",
      "result": [
         {
            "id": 1,
            "lb_code": "APP_LB_BILL",
            "lb_name": "Billing App LB",
            "ip": "172.16.0.10",
            "port": 9000,
            "service_id": 3
         }
      ]
   }
   ```

#### 3.1.5. */api/modules/{moduleId}/connections*
**Mục đích**  
Lấy danh sách toàn bộ service đang được giám sát.

**Tham số**  
* Tham số URL:
  * `moduleId`: id của module muốn truy vấn
* Tham số query: 
  * `page` và `limit`: cho phân trang
  * `outConnection`: lấy danh sách out connection, mặc định true
  * `inConnection`: lấy danh sách in connection, mặc định false
  * `type`: lọc loại connection
    * *1*: module gọi tới module
    * *2*: module gọi tới load balancer
    * *3*: module gọi tới database
    * *null*: trả về tất cả connection
* Tham số header:
  * `JWT token`: authentication
* Tham số body: Không

**Response**  
* 200 ok:
   ```json
   {
      "statusCode": 200,
      "message": "ok",
      "result": [
         {
            "type": 1,
            "service_module_id_source": "AUTH-API_1",
            "service_module_id_dest": "AUTH-BE_1",
            "ip_source": "10.0.1.11",
            "ip_dest": "10.0.2.11",
            "port": 8080
         }
      ]
   }  
   ```

**Logic**  
1. Xác thực người dùng
2. Truy vấn bảng `modules` theo các điều kiện
   * `moduleId`
   * `service_module_id_dest = inConnection`
   * `service_module_id_source = outConnection`
   * `type = type`
3. Trả về danh sách connection tương ứng với điều kiện

#### 3.1.6. */api/servers/{serverId}*
**Mục đích**  
Trả về danh sách các node (module, database, storage) đang chạy trên server.

**Tham số**  
* Tham số URL:
  * `serverId`: ip của server
* Tham số query: 
  * `page` và `limit`: cho phân trang
* Tham số header:
  * `JWT token`: authentication
* Tham số body: Không

**Logic**  
1. Xác thực người dùng
2. Truy vấn các bảng `modules`, `database`, `storage` với điều kiện `server_id = serverId`
3. Trả về json danh sách các node

**Response**  
* 200 ok:
   ```json
   {
      "statusCode": 200,
      "message": "ok",
      "result": {
         "modules": [
            {
            "id": 1,
            "module_code": "AUTH-API_1",
            "module_name": "Auth API #1",
            "instance_ip": "10.0.1.11"
            },
            {
            "id": 2,
            "module_code": "AUTH-API_2",
            "module_name": "Auth API #2",
            "instance_ip": "10.0.1.12"
            }
         ],
         "databases": [
            {
            "id": 1,
            "database_code": "AUTH_DB_1",
            "database_name": "AUTH DB Node 1",
            "instance_ip": "10.0.1.11"
            },
            {
            "id": 2,
            "database_code": "AUTH_DB_2",
            "database_name": "AUTH DB Node 2",
            "instance_ip": "10.0.1.12"
            }
         ],
         "storages": [
            {
            "id": 1,
            "storage_name": "SAN-AUTH",
            "storage_code": "SANAUTH",
            "instance_ip": "10.0.1.11"
            },
            {
            "id": 2,
            "storage_name": "SAN-CRM",
            "storage_code": "SANCRM",
            "instance_ip": "10.0.1.12"
            }
         ]
      }
   }
   ```