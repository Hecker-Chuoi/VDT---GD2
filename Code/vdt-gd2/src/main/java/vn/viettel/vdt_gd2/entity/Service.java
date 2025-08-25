package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "Service")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Service {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "service_code")
    private String serviceCode;

    @Column(name = "service_name")
    private String serviceName;

    @OneToMany(mappedBy = "service")
    private List<GroupModule> groupModules;

    @OneToMany(mappedBy = "service")
    private List<Module> modules;

    @OneToMany(mappedBy = "service")
    private List<Database> databases;

    @OneToMany(mappedBy = "service")
    private List<LoadBalance> loadBalances;
}
