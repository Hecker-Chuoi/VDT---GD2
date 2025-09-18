package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModuleResponse {
    Integer id;
    String moduleCode;
    String moduleName;
    ServerResponse server;
}
