package dev.patbla.warehousemanagementsystem.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.patbla.warehousemanagementsystem.product.category.Category;
import dev.patbla.warehousemanagementsystem.product.packagingtype.PackagingType;
import dev.patbla.warehousemanagementsystem.product.quantity.Quantity;
import dev.patbla.warehousemanagementsystem.product.unit.Unit;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String index;
    private String name;
    private String ean;
    @JoinColumn
    @OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
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
}