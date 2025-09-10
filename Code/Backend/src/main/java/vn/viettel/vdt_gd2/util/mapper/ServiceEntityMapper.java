package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.ServiceEntity;
import vn.viettel.vdt_gd2.entity.dto.response.ServiceResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceEntityMapper {
    ServiceResponse toResponse(ServiceEntity entity);
    List<ServiceResponse> toResponses(List<ServiceEntity> entities);
}
