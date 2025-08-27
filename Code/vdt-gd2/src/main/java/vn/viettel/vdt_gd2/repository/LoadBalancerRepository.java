package vn.viettel.vdt_gd2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.LoadBalancer;

import java.util.List;

public interface LoadBalancerRepository extends JpaRepository<LoadBalancer, Integer> {
    List<LoadBalancer> findAllByService_Id(Integer id);
}

