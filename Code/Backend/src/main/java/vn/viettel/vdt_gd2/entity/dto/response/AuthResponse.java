package vn.viettel.vdt_gd2.entity.dto.response;

import lombok.Builder;

@Builder
public record AuthResponse (boolean isAuthenticated, String jwtToken){
}
