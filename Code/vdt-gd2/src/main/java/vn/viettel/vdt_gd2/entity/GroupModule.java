package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "GroupModule")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupModule {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    @Column(name = "group_module_code")
    private String groupModuleCode;

    @Column(name = "group_module_name")
    private String groupModuleName;

    @OneToMany(mappedBy = "groupModule")
    private List<Module> modules;
}
