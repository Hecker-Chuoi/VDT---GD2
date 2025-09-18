package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.Connection;
import vn.viettel.vdt_gd2.entity.dto.response.ConnectionResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ConnectionMapper {
    @Mapping(target = "sourceModuleId", source = "sourceModule.id")
    @Mapping(target = "destModuleId", source = "destModule.id")
    ConnectionResponse toResponse(Connection entity);

    @Mapping(target = "sourceModuleId", source = "sourceModule.id")
    @Mapping(target = "destModuleId", source = "destModule.id")
    List<ConnectionResponse> toResponses(List<Connection> entities);
}

