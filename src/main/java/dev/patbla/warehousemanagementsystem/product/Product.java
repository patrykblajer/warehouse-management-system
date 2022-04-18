package dev.patbla.warehousemanagementsystem.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Quantity quantity;
    @Enumerated(EnumType.STRING)
    private Unit unit;
}