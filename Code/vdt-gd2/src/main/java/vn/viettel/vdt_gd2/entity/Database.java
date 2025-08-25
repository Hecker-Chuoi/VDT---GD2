package vn.viettel.vdt_gd2.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Database")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Database {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "database_code")
    private String databaseCode;

    @Column(name = "database_name")
    private String databaseName;

    @ManyToOne
    @JoinColumn(name = "instance_id")
    private Instance instance;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
}
