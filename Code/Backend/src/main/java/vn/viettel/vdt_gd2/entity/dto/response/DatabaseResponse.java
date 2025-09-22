package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DatabaseResponse {
    String id;
    String databaseCode;
    String databaseName;
    String serverIp;
//    StorageResponse storage;
}
