package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoadBalanceResponse {
    private Integer id;
    private String lbCode;
    private String lbName;
    private String ip;
    private Integer port;
}
