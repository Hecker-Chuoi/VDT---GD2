package vn.viettel.vdt_gd2.util.mapper;

import org.mapstruct.Mapper;
import vn.viettel.vdt_gd2.entity.LoadBalance;
import vn.viettel.vdt_gd2.entity.dto.response.LoadBalanceResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface LoadBalanceMapper {
    LoadBalanceResponse toResponse(LoadBalance entity);
    List<LoadBalanceResponse> toResponses(List<LoadBalance> entities);
}
