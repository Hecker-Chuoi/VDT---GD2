package vn.viettel.vdt_gd2.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.entity.LoadBalancer;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.entity.dto.response.*;
import vn.viettel.vdt_gd2.repository.DatabaseRepository;
import vn.viettel.vdt_gd2.repository.LoadBalancerRepository;
import vn.viettel.vdt_gd2.repository.ModuleRepository;
import vn.viettel.vdt_gd2.util.mapper.DatabaseMapper;
import vn.viettel.vdt_gd2.util.mapper.GroupModuleMapper;
import vn.viettel.vdt_gd2.util.mapper.LoadBalancerMapper;
import vn.viettel.vdt_gd2.util.mapper.ModuleMapper;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/find")
public class FindInstanceController {
    DatabaseRepository databaseRepository;
    ModuleRepository moduleRepository;
    LoadBalancerRepository loadBalancerRepository;

    GroupModuleMapper groupModuleMapper;
    ModuleMapper moduleMapper;
    DatabaseMapper databaseMapper;
    LoadBalancerMapper loadBalanceMapper;

    @GetMapping("/databases")
    public ApiResponse<DatabaseResponse> getDatabase(
            @RequestParam String serverIp
    ){
        Optional<Database> database = databaseRepository.findByServer_ServerIp(serverIp);
        if(database.isEmpty())
            return ApiResponse.<DatabaseResponse>builder()
                    .statusCode(StatusCode.BAD_REQUEST.getCode())
                    .message(StatusCode.BAD_REQUEST.getMessage())
                    .build();
        return ApiResponse.<DatabaseResponse>builder()
                .result(databaseMapper.toResponse(database.get()))
                .build();
    }

    @GetMapping("/modules")
    public ApiResponse<ModuleResponse> getModule(
            @RequestParam String serverIp,
            @RequestParam int port
    ){
        Optional<Module> module = moduleRepository.findByServer_ServerIpAndPort(serverIp, port);
        if(module.isEmpty())
            return ApiResponse.<ModuleResponse>builder()
                    .statusCode(StatusCode.BAD_REQUEST.getCode())
                    .message(StatusCode.BAD_REQUEST.getMessage())
                    .build();
        return ApiResponse.<ModuleResponse>builder()
                .result(moduleMapper.toResponse(module.get()))
                .build();
    }

    @GetMapping("/load-balancers")
    public ApiResponse<LoadBalancerResponse> getLoadBalancer(
            @RequestParam String ip,
            @RequestParam int port
    ){
        Optional<LoadBalancer> loadBalancer = loadBalancerRepository.findByIpAndPort(ip, port);
        if(loadBalancer.isEmpty())
            return ApiResponse.<LoadBalancerResponse>builder()
                    .statusCode(StatusCode.BAD_REQUEST.getCode())
                    .message(StatusCode.BAD_REQUEST.getMessage())
                    .build();
        return ApiResponse.<LoadBalancerResponse>builder()
                .result(loadBalanceMapper.toResponse(loadBalancer.get()))
                .build();
    }
}
