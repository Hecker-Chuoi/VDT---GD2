package vn.viettel.vdt_gd2.entity.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.entity.GroupModule;
import vn.viettel.vdt_gd2.entity.LoadBalancer;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceDetailResponse {
    Integer id;
    String serviceCode;
    String serviceName;

    List<GroupModuleResponse> groupModules;
    List<DatabaseResponse> databases;
    List<LoadBalancerResponse> loadBalances;
}
