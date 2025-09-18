package vn.viettel.vdt_gd2.controller;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import vn.viettel.vdt_gd2.entity.dto.request.AuthRequest;
import vn.viettel.vdt_gd2.entity.dto.response.ApiResponse;
import vn.viettel.vdt_gd2.entity.dto.response.AuthResponse;
import vn.viettel.vdt_gd2.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService service;

    @PostMapping("/login")
    public ApiResponse<AuthResponse> logIn(@RequestBody AuthRequest request){
        return ApiResponse.<AuthResponse>builder()
                .result(service.logIn(request))
                .build();
    }

//    @GetMapping("/refresh-tokens")
//    public ApiResponse<AuthResponse> getNewAccessToken(@RequestParam String refreshToken){
//        return ApiResponse.<AuthResponse>builder()
//                .result(service.refreshAccessToken(refreshToken))
//                .build();
//    }
}
