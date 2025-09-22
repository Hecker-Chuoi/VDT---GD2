package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.Builder;

@Builder
public record Edge (String id, String sourceId, String targetId, boolean enable) {

}
