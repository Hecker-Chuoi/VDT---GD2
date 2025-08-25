package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Storage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Storage {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "storage_name")
    private String storageName;

    @Column(name = "storage_code")
    private String storageCode;

    @ManyToOne
    @JoinColumn(name = "instance_id")
    private Instance instance;
}
