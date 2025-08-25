package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.entity.dto.response.DatabaseResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DatabaseMapper {
    DatabaseResponse toResponse(Database entity);
    List<DatabaseResponse> toResponses(List<Database> entities);
}
