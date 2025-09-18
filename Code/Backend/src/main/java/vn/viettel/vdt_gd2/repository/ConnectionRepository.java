package vn.viettel.vdt_gd2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.Connection;

import java.util.List;

public interface ConnectionRepository extends JpaRepository<Connection, Integer> {
    List<Connection> getConnectionsBySourceModule_Id(Integer sourceModuleId);
    List<Connection> getConnectionsBySourceModule_IdAndType(Integer sourceModuleId, Integer type);
}