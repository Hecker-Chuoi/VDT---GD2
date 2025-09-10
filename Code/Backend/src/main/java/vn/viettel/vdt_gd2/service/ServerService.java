package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.Server;
import vn.viettel.vdt_gd2.repository.ServerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerService {
    ServerRepository repo;

    public Server getServerById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public List<Server> getAllServers(Integer size, Integer page) {
        if(size == null || page == null)
            return repo.findAll();
        return repo.findAll(Pageable.ofSize(size).withPage(page)).getContent();
    }
}
