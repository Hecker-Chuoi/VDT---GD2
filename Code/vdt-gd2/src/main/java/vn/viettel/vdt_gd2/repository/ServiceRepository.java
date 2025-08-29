package vn.viettel.vdt_gd2.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.ServiceEntity;

import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {
}

