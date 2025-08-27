package vn.viettel.vdt_gd2.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.entity.dto.response.ApiResponse;
import vn.viettel.vdt_gd2.entity.dto.response.ConnectionResponse;
import vn.viettel.vdt_gd2.entity.dto.response.ModuleResponse;
import vn.viettel.vdt_gd2.service.ModuleService;
import vn.viettel.vdt_gd2.util.mapper.ConnectionMapper;
import vn.viettel.vdt_gd2.util.mapper.ModuleMapper;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/modules")
public class ModuleController {
    ModuleService service;
    ModuleMapper mapper;
    ConnectionMapper connectionMapper;

    @GetMapping("/{id}")
    public ApiResponse<ModuleResponse> getModuleById(@PathVariable Integer id) {
        return ApiResponse.<ModuleResponse>builder()
                .result(mapper.toResponse(service.getModuleById(id)))
                .build();
    }

    @GetMapping("/connections")
    public ApiResponse<List<ConnectionResponse>> getConnectionsBySourceModule_IdOrDestModule_Id(
            @RequestParam(required = false) Integer sourceModuleId,
            @RequestParam(required = false) Integer destModuleId,
            @RequestParam(required = false) Integer type
    ){
        return ApiResponse.<List<ConnectionResponse>>builder()
                .result(connectionMapper.toResponses(service.getConnections(sourceModuleId, destModuleId, type)))
                .build();
    }
}
