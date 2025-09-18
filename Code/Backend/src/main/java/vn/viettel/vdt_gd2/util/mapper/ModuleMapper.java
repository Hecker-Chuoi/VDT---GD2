package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.entity.dto.response.ModuleResponse;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ServerMapper.class})
public interface ModuleMapper {
    ModuleResponse toResponse(Module entity);
    List<ModuleResponse> toResponses(List<Module> entities);
}
