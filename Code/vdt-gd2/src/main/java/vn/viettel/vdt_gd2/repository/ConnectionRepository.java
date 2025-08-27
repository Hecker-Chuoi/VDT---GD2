package vn.viettel.vdt_gd2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.Connection;

import java.util.List;

public interface ConnectionRepository extends JpaRepository<Connection, Integer> {
    List<Connection> getConnectionsBySourceModule_IdOrDestModule_Id(Integer sourceModuleId, Integer destModuleId);
    List<Connection> getConnectionsBySourceModule_IdOrDestModule_IdAndType(Integer sourceModuleId, Integer destModuleId, Integer type);
}