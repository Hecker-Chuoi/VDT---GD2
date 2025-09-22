package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.GroupModule;
import vn.viettel.vdt_gd2.entity.dto.response.GroupModuleResponse;
import java.util.List;

@Mapper(componentModel = "spring", uses = ModuleMapper.class)
public interface GroupModuleMapper {
    @Mapping(target = "id", expression = "java(\"group_\" + entity.getId())")
    GroupModuleResponse toResponse(GroupModule entity);

    @Mapping(target = "id", expression = "java(\"group_\" + entity.getId())")
    List<GroupModuleResponse> toResponses(List<GroupModule> entities);
}
