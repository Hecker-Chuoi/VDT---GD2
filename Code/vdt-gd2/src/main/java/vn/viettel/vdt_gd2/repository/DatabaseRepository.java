package vn.viettel.vdt_gd2.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.Database;

import java.util.List;

public interface DatabaseRepository extends JpaRepository<Database, Integer> {
    List<Database> getDatabasesByService_Id(Integer serviceId);
    List<Database> getDatabasesByService_Id(Integer serviceId, Pageable pageable);
    List<Database> getDatabasesByServer_Id(Integer serverId);
    List<Database> getDatabasesByServer_Id(Integer serverId, Pageable pageable);
}