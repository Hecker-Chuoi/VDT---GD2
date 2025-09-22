package vn.viettel.vdt_gd2.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
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
    ServiceEntityMapper mapper;

    @GetMapping
    public ApiResponse<List<ServiceBasicResponse>> getAllServices(
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) Integer page
    ) {
        return ApiResponse.<List<ServiceBasicResponse>>builder()
                .result(mapper.toResponses(service.getAllServices(size, page)))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ServiceDetailResponse> getServiceById(@PathVariable Integer id) {
        return ApiResponse.<ServiceDetailResponse>builder()
                .result(service.getServiceById(id))
                .build();
    }

//    @GetMapping("/{id}/group-modules")
//    public ApiResponse<List<GroupModuleResponse>> getGroupModulesByServiceId(
//            @PathVariable Integer id,
//            @RequestParam(required = false) Integer size,
//            @RequestParam(required = false) Integer page
//    ) {
//        return ApiResponse.<List<GroupModuleResponse>>builder()
//                .result(groupModuleMapper.toResponses(groupModuleService.getGroupModulesByServiceId(id, size, page)))
//                .build();
//    }
//
//    @GetMapping("/{id}/databases")
//    public ApiResponse<List<DatabaseResponse>> getDatabasesByServiceId(
//            @PathVariable Integer id,
//            @RequestParam(required = false) Integer size,
//            @RequestParam(required = false) Integer page
//    ) {
//        return ApiResponse.<List<DatabaseResponse>>builder()
//                .result(databaseMapper.toResponses(databaseService.getDatabasesByServiceId(id, size, page)))
//                .build();
//    }
//
//    @GetMapping("/{id}/load-balancers")
//    public ApiResponse<List<LoadBalancerResponse>> getLoadBalancersByServiceId(
//            @PathVariable Integer id,
//            @RequestParam(required = false) Integer size,
//            @RequestParam(required = false) Integer page
//    ) {
//        return ApiResponse.<List<LoadBalancerResponse>>builder()
//                .result(loadBalanceMapper.toResponses(loadBalancerService.getLoadBalancersByServiceId(id, size, page)))
//                .build();
//    }
}