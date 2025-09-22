package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.*;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.entity.dto.response.Edge;
import vn.viettel.vdt_gd2.entity.dto.response.ModuleResponse;
import vn.viettel.vdt_gd2.entity.dto.response.ServiceDetailResponse;
import vn.viettel.vdt_gd2.repository.ServiceRepository;
import vn.viettel.vdt_gd2.util.mapper.*;

import javax.swing.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServiceEntityManager {
    ServiceRepository repo;

    ModuleService moduleService;
    FindInstanceService findInstance;

    GroupModuleMapper groupModuleMapper;
    StorageMapper storageMapper;
    ServerMapper serverMapper;
    DatabaseMapper databaseMapper;
    LoadBalancerMapper loadBalanceMapper;

    public List<ServiceEntity> getAllServices(Integer size, Integer page) {
        if(size == null || page == null)
            return repo.findAll();
        return repo.findAll(Pageable.ofSize(size).withPage(page)).getContent();
    }

    public ServiceDetailResponse getServiceById(Integer id) {
        ServiceEntity service = repo.findById(id).orElse(null);
        Set<GroupModule> groups = new HashSet<>();
        Set<Server> servers = new HashSet<>();
        Set<LoadBalancer> lbs = new HashSet<>();
        Set<Database> dbs = new HashSet<>();
        Set<Storage> storages = new HashSet<>();
        Set<Edge> edges = new HashSet<>();

        assert service != null;
        lbs.addAll(service.getLoadBalances());
        groups.addAll(service.getGroupModules());

        // internal load balancers
        for(LoadBalancer lb : lbs){
            // tao canh service va internal load balancer
            edges.add(Edge.builder()
                        .id("e-service_%d-lb_%d".formatted(service.getId(), lb.getId()))
                        .sourceId("service_%d".formatted(service.getId()))
                        .targetId("lb_%d".formatted(lb.getId()))
                        .enable(true)
                .build());
        }

        for(GroupModule group : groups){
            // tao canh service va internal load balancer
            edges.add(Edge.builder()
                        .id("e-service_%d-group_%d".formatted(service.getId(), group.getId()))
                        .sourceId("service_%d".formatted(service.getId()))
                        .targetId("group_%d".formatted(group.getId()))
                        .enable(true)
                .build());
        }

        // modules
        service.getGroupModules().forEach(g -> {
//            modules.addAll(g.getModules());
            // them danh sach module
            for(Module m : g.getModules()){
                Server s = m.getServer();
                servers.add(s);

                // tao canh group module va server
                edges.add(Edge.builder()
                                .id("e-group_%d-server_%d".formatted(g.getId(), s.getId()))
                                .sourceId("group_%d".formatted(g.getId()))
                                .targetId("server_%d".formatted(s.getId()))
                                .enable(true)
                        .build());

                // tao canh giua module va server
                edges.add(Edge.builder()
                                .id("e-module_%d-server_%d".formatted(m.getId(), s.getId()))
                                .sourceId("module_%d".formatted(m.getId()))
                                .targetId("server_%d".formatted(s.getId()))
                                .enable(false)
                        .build());

                // lay danh sach connection cua tung module
                List<Connection> connections = moduleService.getConnections(m.getId(), null);
                for(Connection c : connections){
                    if(c.getType() == 1){
                        // do nothing
                    }
                    else if(c.getType() == 2){
                        LoadBalancer lb = findInstance.getLoadBalancer(c.getIpDest(), c.getPort());
                        lbs.add(lb);
                        // tao canh group module va load-balancer
                        edges.add(Edge.builder()
                                        .id("e-lb_%d-group_%d".formatted(lb.getId(), g.getId()))
                                        .sourceId("lb_%d".formatted(lb.getId()))
                                        .targetId("group_%d".formatted(g.getId()))
                                        .enable(true)
                                .build());

                        // tao canh giua module va load-balancer
                        edges.add(Edge.builder()
                                        .id("e-lb_%d-module_%d".formatted(lb.getId(), m.getId()))
                                        .sourceId("lb_%d".formatted(lb.getId()))
                                        .targetId("module_%d".formatted(m.getId()))
                                        .enable(false)
                                .build());
                    }
                    else if(c.getType() == 3){
                        Database db = findInstance.getDatabase(c.getIpDest(), c.getPort());
                        Storage storage = db.getStorage();
                        dbs.add(db);
                        storages.add(storage);

                        // tao canh server va database
                        edges.add(Edge.builder()
                                        .id("e-server_%d-db_%d".formatted(s.getId(), db.getId()))
                                        .sourceId("server_%d".formatted(s.getId()))
                                        .targetId("db_%d".formatted(db.getId()))
                                        .enable(true)
                                .build());

                        // tao canh database va storage
                        edges.add(Edge.builder()
                                        .id("e-db_%d-storage_%d".formatted(db.getId(), storage.getId()))
                                        .sourceId("db_%d".formatted(db.getId()))
                                        .targetId("storage_%d".formatted(storage.getId()))
                                        .enable(true)
                                .build());
                    }
                }
            }
        });

        return ServiceDetailResponse.builder()
                .id("service_%d".formatted(service.getId()))
                .serviceCode(service.getServiceCode())
                .serviceName(service.getServiceName())
                .groupModules(groupModuleMapper.toResponses(service.getGroupModules()))
                .servers(serverMapper.toResponses(new ArrayList<>(servers)))
                .loadBalances(loadBalanceMapper.toResponses(new ArrayList<>(lbs)))
                .databases(databaseMapper.toResponses(new ArrayList<>(dbs)))
                .storages(storageMapper.toResponses(new ArrayList<>(storages)))
                .edges(new ArrayList<>(edges))
                .build();
    }
}
