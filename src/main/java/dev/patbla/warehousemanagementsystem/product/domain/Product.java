package dev.patbla.warehousemanagementsystem.product.domain;

import dev.patbla.warehousemanagementsystem.product.domain.category.Category;
import dev.patbla.warehousemanagementsystem.product.domain.location.Location;
import dev.patbla.warehousemanagementsystem.product.domain.packagingtype.PackagingType;
import dev.patbla.warehousemanagementsystem.product.domain.pallet.Pallet;
import dev.patbla.warehousemanagementsystem.product.domain.quantity.Quantity;
import dev.patbla.warehousemanagementsystem.product.domain.unit.Unit;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String index;
    private String name;
    private String ean;
    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Quantity quantity;
    @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;
    @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name = "packaging_type_id")
    private PackagingType packagingType;
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;
    @OneToOne
    private Pallet preferredPalletType;
    private String description;
}