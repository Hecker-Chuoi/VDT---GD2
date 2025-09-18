package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.ServiceEntity;
import vn.viettel.vdt_gd2.entity.dto.response.ServiceBasicResponse;
import vn.viettel.vdt_gd2.entity.dto.response.ServiceDetailResponse;

import java.util.List;

@Mapper(componentModel = "spring", uses = {GroupModuleMapper.class, DatabaseMapper.class, LoadBalancerMapper.class})
public interface ServiceEntityMapper {
    ServiceBasicResponse toBasicResponse(ServiceEntity entity);
    ServiceDetailResponse toDetailResponse(ServiceEntity entity);
    List<ServiceBasicResponse> toResponses(List<ServiceEntity> entities);
}
