package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "LoadBalance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoadBalance {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "lb_code")
    private String lbCode;

    @Column(name = "lb_name")
    private String lbName;

    @Column(name = "ip")
    private String ip;

    @Column(name = "port")
    private Integer port;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
}
