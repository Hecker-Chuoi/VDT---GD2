package vn.viettel.vdt_gd2.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.entity.LoadBalancer;

import java.util.List;
import java.util.Optional;

public interface LoadBalancerRepository extends JpaRepository<LoadBalancer, Integer> {
    List<LoadBalancer> findAllByService_Id(Integer id);
    List<LoadBalancer> findAllByService_Id(Integer id, Pageable pageable);
    Optional<LoadBalancer> findByIpAndPort(String ip, Integer port);
}

