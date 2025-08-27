package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "Module")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Module {
    @Id
    @Column(name = "id")
    Integer id;

    @ManyToOne
    @JoinColumn(name = "group_module_id")
    GroupModule groupModule;

    @ManyToOne
    @JoinColumn(name = "service_id")
    ServiceEntity service;

    @ManyToOne
    @JoinColumn(name = "server_id")
    Server server;

    @Column(name = "module_code")
    String moduleCode;

    @Column(name = "module_name")
    String moduleName;

    @OneToMany(mappedBy = "sourceModule")
    List<Connection> connectionsSource;

    @OneToMany(mappedBy = "destModule")
    List<Connection> connectionsDest;
}
