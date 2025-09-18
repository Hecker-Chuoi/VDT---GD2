package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConnectionResponse {
    private Integer id;
    private String ipSource;
    private String ipDest;
    private Integer sourceModuleId;
    private Integer destModuleId;
    private Integer port;
    private Integer type;
}
