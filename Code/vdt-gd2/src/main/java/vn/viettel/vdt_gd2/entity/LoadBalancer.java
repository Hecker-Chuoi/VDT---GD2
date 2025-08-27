package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "LoadBalance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoadBalancer {
    @Id
    @Column(name = "id")
    Integer id;

    @Column(name = "lb_code")
    String lbCode;

    @Column(name = "lb_name")
    String lbName;

    @Column(name = "ip")
    String ip;

    @Column(name = "port")
    Integer port;

    @ManyToOne
    @JoinColumn(name = "service_id")
    ServiceEntity service;
}
