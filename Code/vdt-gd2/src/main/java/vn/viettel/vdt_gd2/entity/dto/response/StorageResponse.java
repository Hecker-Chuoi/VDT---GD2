package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorageResponse {
    private Integer id;
    private String storageName;
    private String storageCode;
    private Integer instanceId;
}

