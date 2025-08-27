package vn.viettel.vdt_gd2.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.viettel.vdt_gd2.entity.dto.response.*;
import vn.viettel.vdt_gd2.service.DatabaseService;
import vn.viettel.vdt_gd2.service.GroupModuleService;
import vn.viettel.vdt_gd2.service.LoadBalancerService;
import vn.viettel.vdt_gd2.service.ServiceEntityManager;
import vn.viettel.vdt_gd2.util.mapper.DatabaseMapper;
import vn.viettel.vdt_gd2.util.mapper.GroupModuleMapper;
import vn.viettel.vdt_gd2.util.mapper.LoadBalancerMapper;
import vn.viettel.vdt_gd2.util.mapper.ServiceEntityMapper;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/services")
public class ServiceController {
    ServiceEntityManager service;
    GroupModuleService groupModuleService;
    DatabaseService databaseService;
    LoadBalancerService loadBalancerService;

    ServiceEntityMapper mapper;
    GroupModuleMapper groupModuleMapper;
    DatabaseMapper databaseMapper;
    LoadBalancerMapper loadBalanceMapper;

    @GetMapping
    public ApiResponse<List<ServiceResponse>> getAllServices() {
        return ApiResponse.<List<ServiceResponse>>builder()
                .result(mapper.toResponses(service.getAllServices()))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ServiceResponse> getServiceById(@PathVariable Integer id) {
        return ApiResponse.<ServiceResponse>builder()
                .result(mapper.toResponse(service.getServiceById(id)))
                .build();
    }

    @GetMapping("/{id}/group-modules")
    public ApiResponse<List<GroupModuleResponse>> getGroupModulesByServiceId(@PathVariable Integer id) {
        return ApiResponse.<List<GroupModuleResponse>>builder()
                .result(groupModuleMapper.toResponses(groupModuleService.getGroupModulesByServiceId(id)))
                .build();
    }

    @GetMapping("/{id}/databases")
    public ApiResponse<List<DatabaseResponse>> getDatabasesByServiceId(@PathVariable Integer id) {
        return ApiResponse.<List<DatabaseResponse>>builder()
                .result(databaseMapper.toResponses(databaseService.getDatabasesByServiceId(id)))
                .build();
    }

    @GetMapping("/{id}/load-balancers")
    public ApiResponse<List<LoadBalancerResponse>> getLoadBalancersByServiceId(@PathVariable Integer id) {
        return ApiResponse.<List<LoadBalancerResponse>>builder()
                .result(loadBalanceMapper.toResponses(loadBalancerService.getLoadBalancersByServiceId(id)))
                .build();
    }
}