package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Server;
import vn.viettel.vdt_gd2.entity.dto.response.ServerResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServerMapper {
    ServerResponse toResponse(Server entity);

    List<ServerResponse> toResponses(List<Server> entities);
}
