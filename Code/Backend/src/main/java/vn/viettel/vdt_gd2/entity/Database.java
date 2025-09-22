package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "Database")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Database {
    @Id
    @Column(name = "id")
    Integer id;

    @Column(name = "database_code")
    String databaseCode;

    @Column(name = "database_name")
    String databaseName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "server_id")
    Server server;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    ServiceEntity service;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "storage_id")
    Storage storage;
}
