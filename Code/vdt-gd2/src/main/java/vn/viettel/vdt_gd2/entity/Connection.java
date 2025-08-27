package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "Connection")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Connection {
    @Id
    @Column(name = "id")
    Integer id;

    @ManyToOne
    @JoinColumn(name = "service_module_id_source")
    Module sourceModule;

    @ManyToOne
    @JoinColumn(name = "service_module_id_dest")
    Module destModule;

    @Column(name = "ip_source")
    String ipSource;

    @Column(name = "ip_dest")
    String ipDest;

    @Column(name = "port")
    Integer port;

    @Column(name = "type")
    Integer type;
}
