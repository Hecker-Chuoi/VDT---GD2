package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.entity.dto.response.DatabaseResponse;
import java.util.List;

@Mapper(componentModel = "spring", uses = {StorageMapper.class})
public interface DatabaseMapper {
    @Mapping(target = "serverIp", source = "server.serverIp")
    DatabaseResponse toResponse(Database entity);
    @Mapping(target = "serverIp", source = "server.serverIp")
    List<DatabaseResponse> toResponses(List<Database> entities);
}
