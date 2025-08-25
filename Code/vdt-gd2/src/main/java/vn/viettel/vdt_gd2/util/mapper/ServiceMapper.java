package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Service;
import vn.viettel.vdt_gd2.entity.dto.response.ServiceResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceResponse toResponse(Service entity);
    List<ServiceResponse> toResponses(List<Service> entities);
}
