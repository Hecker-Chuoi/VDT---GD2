package vn.viettel.vdt_gd2.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.GroupModule;
import vn.viettel.vdt_gd2.repository.GroupModuleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GroupModuleService {
    GroupModuleRepository repo;

    public GroupModule getGroupModuleById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public List<GroupModule> getGroupModulesByServiceId(Integer serviceId, Integer size, Integer page) {
        if(size == null || page == null)
            return repo.findAllByService_Id(serviceId);
        return repo.findAllByService_Id(serviceId, Pageable.ofSize(size).withPage(page));
    }
}
