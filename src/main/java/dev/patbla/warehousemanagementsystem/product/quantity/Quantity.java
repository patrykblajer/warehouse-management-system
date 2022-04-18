package dev.patbla.warehousemanagementsystem.product.quantity;

import dev.patbla.warehousemanagementsystem.product.Product;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double available;
    @Column(name = "in_reservation")
    private double inReservation;
    @Column(name = "stacked_on_pallet")
    private double stackedOnPallet;
    @Column(name = "minimum_level_of_stocks")
    private double minimumLevelOfStocks;

    public Quantity(double available, double stackedOnPallet, double minimumLevelOfStocks) {
        this.available = available;
        this.stackedOnPallet = stackedOnPallet;
        this.minimumLevelOfStocks = minimumLevelOfStocks;
    }
}