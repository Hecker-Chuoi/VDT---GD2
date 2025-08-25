package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Instance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instance {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "instance_ip")
    private String instanceIp;
}
