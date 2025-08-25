package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupModuleResponse {
    private Integer id;
    private String groupModuleCode;
    private String groupModuleName;
}
