package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "Module")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "group_module_id")
    private GroupModule groupModule;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    @ManyToOne
    @JoinColumn(name = "instance_id")
    private Instance instance;

    @Column(name = "module_code")
    private String moduleCode;

    @Column(name = "module_name")
    private String moduleName;

    @OneToMany(mappedBy = "sourceModule")
    private List<Connection> connectionsSource;

    @OneToMany(mappedBy = "destModule")
    private List<Connection> connectionsDest;
}
