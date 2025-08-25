package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.Storage;
import vn.viettel.vdt_gd2.entity.dto.response.StorageResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StorageMapper {
    StorageResponse toResponse(Storage entity);
    List<StorageResponse> toResponses(List<Storage> entities);
}
