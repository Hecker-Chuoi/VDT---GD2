package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "GroupModule")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupModule {
    @Id
    @Column(name = "id")
    Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    ServiceEntity service;

    @Column(name = "group_module_code")
    String groupModuleCode;

    @Column(name = "group_module_name")
    String groupModuleName;

    @OneToMany(mappedBy = "groupModule", fetch = FetchType.EAGER)
    List<Module> modules;
}
