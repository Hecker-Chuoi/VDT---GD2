package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.Database;
import vn.viettel.vdt_gd2.repository.DatabaseRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DatabaseService {
    DatabaseRepository database;
    
    public Database getDatabaseById(Integer id) {
        return database.findById(id).orElse(null);
    }

    public List<Database> getDatabasesByServiceId(Integer serviceId, Integer size, Integer page) {
        if(size == null || page == null)
            return database.getDatabasesByService_Id(serviceId);

        return database.getDatabasesByService_Id(serviceId, Pageable.ofSize(size).withPage(page));
    }

    public List<Database> getDatabasesByServerId(Integer serverId, Integer size, Integer page) {
        if(size == null || page == null)
            return database.getDatabasesByServer_Id(serverId);
        return database.getDatabasesByServer_Id(serverId, Pageable.ofSize(size).withPage(page));
    }
}
