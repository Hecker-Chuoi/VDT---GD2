package vn.viettel.vdt_gd2.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.viettel.vdt_gd2.entity.Module;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
    List<Module> getModulesByService_Id(Integer serviceId);
    List<Module> getModulesByService_Id(Integer serviceId, Pageable pageable);
    List<Module> getModulesByServer_Id(Integer serverId);
    List<Module> getModulesByServer_Id(Integer serverId, Pageable pageable);
}

