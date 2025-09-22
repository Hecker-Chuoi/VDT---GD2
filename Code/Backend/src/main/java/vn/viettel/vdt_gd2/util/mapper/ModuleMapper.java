package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.entity.dto.response.ModuleResponse;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ServerMapper.class})
public interface ModuleMapper {
    @Mapping(target = "id", expression = "java(\"module_\" + entity.getId())")
    ModuleResponse toResponse(Module entity);

    @Mapping(target = "id", expression = "java(\"module_\" + entity.getId())")
    List<ModuleResponse> toResponses(List<Module> entities);
}
