package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.entity.LoadBalancer;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.repository.DatabaseRepository;
import vn.viettel.vdt_gd2.repository.LoadBalancerRepository;
import vn.viettel.vdt_gd2.repository.ModuleRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FindInstanceService {
    DatabaseRepository databaseRepository;
    ModuleRepository moduleRepository;
    LoadBalancerRepository loadBalancerRepository;

    public Database getDatabase(String serverIp, int port) {
        var result = databaseRepository.findByServer_ServerIp(serverIp);
        return result.orElse(null);
    }

    public Module getModule(String serverIp, int port) {
        var result = moduleRepository.findByServer_ServerIpAndPort(serverIp, port);
        return result.orElse(null);
    }

    public LoadBalancer getLoadBalancer(String ip, int port) {
        var result = loadBalancerRepository.findByIpAndPort(ip, port);
        return result.orElse(null);
    }
}
