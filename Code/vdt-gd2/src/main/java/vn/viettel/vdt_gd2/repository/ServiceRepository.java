package vn.viettel.vdt_gd2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.GroupModule;
import vn.viettel.vdt_gd2.entity.Service;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
}

