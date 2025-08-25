package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.GroupModule;
import vn.viettel.vdt_gd2.entity.dto.response.GroupModuleResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupModuleMapper {
    GroupModuleResponse toResponse(GroupModule entity);
    List<GroupModuleResponse> toResponses(List<GroupModule> entities);
}
