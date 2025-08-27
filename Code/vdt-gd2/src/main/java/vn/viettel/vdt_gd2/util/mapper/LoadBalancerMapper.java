package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.LoadBalancer;
import vn.viettel.vdt_gd2.entity.dto.response.LoadBalancerResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface LoadBalancerMapper {
    LoadBalancerResponse toResponse(LoadBalancer entity);
    List<LoadBalancerResponse> toResponses(List<LoadBalancer> entities);
}
