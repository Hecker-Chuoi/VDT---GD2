import pandas as pd
import psycopg2

# File Excel
file_path = "../Documents/it_services_connection.xlsx"

# Kết nối PostgreSQL
conn = psycopg2.connect(
    dbname="nocpro",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Đọc tất cả sheet
xls = pd.ExcelFile(file_path)
data = {sheet: pd.read_excel(file_path, sheet_name=sheet) for sheet in xls.sheet_names}

# Insert dữ liệu
def insert_data(table, df, columns):
    for _, row in df.iterrows():
        values = [None if pd.isna(row.get(col)) else row.get(col) for col in columns]
        placeholders = ",".join(["%s"] * len(values))
        print(values)
        query = f"INSERT INTO {table} ({','.join(columns)}) VALUES ({placeholders})"
        cur.execute(query, values)

# Nạp dữ liệu theo thứ tự quan hệ
# insert_data("service", data["Service"], ["id", "service_code", "service_name"])
# insert_data("group_module", data["GroupModule"], ["id", "service_id", "group_module_code", "group_module_name"])
# insert_data("server", data["Server"], ["id", "server_ip"])
# insert_data("module", data["Module"], ["id", "group_module_id", "service_id", "server_id", "module_code", "module_name"])
# insert_data("database", data["Database"], ["id", "database_code", "database_name", "server_id", "service_id"])
# insert_data("storage", data["Storage"], ["id", "storage_name", "storage_code", "server_id"])
# insert_data("load_balance", data["LoadBalance"], ["id", "lb_code", "lb_name", "ip", "port", "service_id"])

# # Với Connection, cần bỏ mấy dòng mô tả đầu => chỉ lấy từ dòng có id
conn_df = pd.read_excel(file_path, sheet_name="Connection", skiprows=5)
insert_data("connection", conn_df, ["id", "service_module_id_source", "service_module_id_dest", "ip_source", "ip_dest", "port", "type"])

# Commit & đóng kết nối 
conn.commit()
cur.close()
conn.close()
