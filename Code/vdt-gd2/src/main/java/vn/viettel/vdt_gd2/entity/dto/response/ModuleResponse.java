package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModuleResponse {
    private Integer id;
    private String moduleCode;
    private String moduleName;
}
