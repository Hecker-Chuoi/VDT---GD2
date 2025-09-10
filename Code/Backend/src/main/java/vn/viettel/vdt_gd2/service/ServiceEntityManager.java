package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.ServiceEntity;
import vn.viettel.vdt_gd2.repository.ServiceRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServiceEntityManager {
    ServiceRepository repo;

    public List<ServiceEntity> getAllServices(Integer size, Integer page) {
        if(size == null || page == null)
            return repo.findAll();
        return repo.findAll(Pageable.ofSize(size).withPage(page)).getContent();
    }

    public ServiceEntity getServiceById(Integer id) {
        return repo.findById(id).orElse(null);
    }
}
