package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.LoadBalancer;
import vn.viettel.vdt_gd2.repository.LoadBalancerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LoadBalancerService {
    LoadBalancerRepository repo;

    public LoadBalancer getLoadBalancerById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public List<LoadBalancer> getLoadBalancersByServiceId(Integer serviceId) {
        return repo.findAllByService_Id(serviceId);
    }
}
