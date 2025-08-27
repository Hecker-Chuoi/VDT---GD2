package vn.viettel.vdt_gd2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {
}

