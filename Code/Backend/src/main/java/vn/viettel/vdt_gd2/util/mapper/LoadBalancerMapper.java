package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.LoadBalancer;
import vn.viettel.vdt_gd2.entity.dto.response.LoadBalancerResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface LoadBalancerMapper {
    @Mapping(target = "id", expression = "java(\"lb_\" + entity.getId())")
    LoadBalancerResponse toResponse(LoadBalancer entity);

    @Mapping(target = "id", expression = "java(\"lb_\" + entity.getId())")
    List<LoadBalancerResponse> toResponses(List<LoadBalancer> entities);
}
