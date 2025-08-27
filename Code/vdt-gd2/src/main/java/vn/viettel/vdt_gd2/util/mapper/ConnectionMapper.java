package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Connection;
import vn.viettel.vdt_gd2.entity.dto.response.ConnectionResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ConnectionMapper {
    ConnectionResponse toResponse(Connection entity);
    List<ConnectionResponse> toResponses(List<Connection> entities);
}

