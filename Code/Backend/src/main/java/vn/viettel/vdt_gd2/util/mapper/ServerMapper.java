package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.Server;
import vn.viettel.vdt_gd2.entity.dto.response.ServerResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServerMapper {
    @Mapping(target = "id", expression = "java(\"server_\" + entity.getId())")
    ServerResponse toResponse(Server entity);

    @Mapping(target = "id", expression = "java(\"server_\" + entity.getId())")
    List<ServerResponse> toResponses(List<Server> entities);
}
