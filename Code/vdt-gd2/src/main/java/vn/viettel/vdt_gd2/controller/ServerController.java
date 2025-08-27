package vn.viettel.vdt_gd2.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.viettel.vdt_gd2.entity.Server;
import vn.viettel.vdt_gd2.entity.dto.response.ApiResponse;
import vn.viettel.vdt_gd2.entity.dto.response.DatabaseResponse;
import vn.viettel.vdt_gd2.entity.dto.response.ModuleResponse;
import vn.viettel.vdt_gd2.entity.dto.response.ServerResponse;
import vn.viettel.vdt_gd2.service.DatabaseService;
import vn.viettel.vdt_gd2.service.ModuleService;
import vn.viettel.vdt_gd2.service.ServerService;
import vn.viettel.vdt_gd2.util.mapper.DatabaseMapper;
import vn.viettel.vdt_gd2.util.mapper.ModuleMapper;
import vn.viettel.vdt_gd2.util.mapper.ServerMapper;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/servers")
public class ServerController {
    ServerService service;
    DatabaseService databaseService;
    ModuleService moduleService;

    ServerMapper mapper;
    DatabaseMapper databaseMapper;
    ModuleMapper moduleMapper;

    @GetMapping
    public ApiResponse<List<ServerResponse>> getAllServers() {
        return ApiResponse.<List<ServerResponse>>builder()
                .result(mapper.toResponses(service.getAllServers()))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ServerResponse> getServerById(@PathVariable Integer id) {
        return ApiResponse.<ServerResponse>builder()
                .result(mapper.toResponse(service.getServerById(id)))
                .build();
    }

    @GetMapping("/{id}/databases")
    public ApiResponse<List<DatabaseResponse>> getDatabasesByServerId(@PathVariable Integer id) {
        return ApiResponse.<List<DatabaseResponse>>builder()
                .result(databaseMapper.toResponses(databaseService.getDatabasesByServerId(id)))
                .build();
    }

    @GetMapping("/{id}/modules")
    public ApiResponse<List<ModuleResponse>> getModulesByServerId(@PathVariable Integer id) {
        return ApiResponse.<List<ModuleResponse>>builder()
                .result(moduleMapper.toResponses(moduleService.getModulesByServerId(id)))
                .build();
    }
}
