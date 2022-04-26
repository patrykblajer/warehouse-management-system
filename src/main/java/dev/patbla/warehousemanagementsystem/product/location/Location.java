package dev.patbla.warehousemanagementsystem.product.location;

import dev.patbla.warehousemanagementsystem.product.location.area.Area;
import dev.patbla.warehousemanagementsystem.product.location.storagetype.StorageType;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;
    @ManyToOne
    @JoinColumn(name = "storage_type_id")
    private StorageType storageType;
}