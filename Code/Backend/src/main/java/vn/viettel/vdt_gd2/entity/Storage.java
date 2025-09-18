package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "storage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Storage {

    @Id
    Integer id;

    @Column(name = "storage_name")
    String storageName;

    @Column(name = "storage_code")
    String storageCode;

    @OneToMany(mappedBy = "storage")
    List<Database> databases;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "server_id")
    Server server;
}
