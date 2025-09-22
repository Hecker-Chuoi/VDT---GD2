package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.viettel.vdt_gd2.entity.Storage;
import vn.viettel.vdt_gd2.entity.dto.response.StorageResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StorageMapper {
    @Mapping(target = "id", expression = "java(\"storage_\" + entity.getId())")
    StorageResponse toResponse(Storage entity);

    @Mapping(target = "id", expression = "java(\"storage_\" + entity.getId())")
    List<StorageResponse> toResponses(List<Storage> entities);
}
