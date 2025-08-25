package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Connection;
import vn.viettel.vdt_gd2.entity.dto.response.ConnectionResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ConnectionMapper {
    ConnectionResponse entityToResponse(Connection entity);
    List<ConnectionResponse> listEntityToListResponse(List<Connection> entities);
}

