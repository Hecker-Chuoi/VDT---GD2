package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Instance;
import vn.viettel.vdt_gd2.entity.dto.response.InstanceResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface InstanceMapper {
    InstanceResponse toResponse(Instance entity);
    List<InstanceResponse> toResponses(List<Instance> entities);
}
