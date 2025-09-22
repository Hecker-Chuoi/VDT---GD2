package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupModuleResponse {
    String id;
    String groupModuleCode;
    String groupModuleName;
    List<ModuleResponse> modules;
}
