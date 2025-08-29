package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.Connection;
import vn.viettel.vdt_gd2.entity.Module;
import vn.viettel.vdt_gd2.repository.ConnectionRepository;
import vn.viettel.vdt_gd2.repository.ModuleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ModuleService {
    ModuleRepository repo;
    ConnectionRepository connectionRepo;

    public Module getModuleById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public List<Module> getModulesByServiceId(Integer serviceId, Integer  size, Integer page) {
        if(size == null || page == null)
            return repo.getModulesByService_Id(serviceId);
        return repo.getModulesByService_Id(serviceId, Pageable.ofSize(size).withPage(page));
    }

    public List<Module> getModulesByServerId(Integer serverId, Integer size, Integer page) {
        if(size == null || page == null)
            return repo.getModulesByServer_Id(serverId);

        return repo.getModulesByServer_Id(serverId, Pageable.ofSize(size).withPage(page));
    }

    public List<Connection> getConnections(Integer sourceId, Integer destId, Integer type) {
        if(type == null){
            return connectionRepo.getConnectionsBySourceModule_IdOrDestModule_Id(sourceId, destId);
        }
        else{
            return connectionRepo.getConnectionsBySourceModule_IdOrDestModule_IdAndType(sourceId, destId, type);
        }
    }
}
