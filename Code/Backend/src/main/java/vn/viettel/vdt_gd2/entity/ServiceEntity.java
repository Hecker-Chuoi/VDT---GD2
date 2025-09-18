package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "Service")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceEntity {
    @Id
    @Column(name = "id")
    Integer id;

    @Column(name = "service_code")
    String serviceCode;

    @Column(name = "service_name")
    String serviceName;

    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    List<GroupModule> groupModules;

    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    List<Database> databases;

    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    List<LoadBalancer> loadBalances;
}
