package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DatabaseResponse {
    private Integer id;
    private String databaseCode;
    private String databaseName;
}
