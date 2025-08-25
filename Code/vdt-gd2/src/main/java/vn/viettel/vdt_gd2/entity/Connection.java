package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Connection")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Connection {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "service_module_id_source")
    private Module sourceModule;

    @ManyToOne
    @JoinColumn(name = "service_module_id_dest")
    private Module destModule;

    @Column(name = "ip_source")
    private String ipSource;

    @Column(name = "ip_dest")
    private String ipDest;

    @Column(name = "port")
    private Integer port;

    @Column(name = "type")
    private Integer type;
}
