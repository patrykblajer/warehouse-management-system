package dev.patbla.warehousemanagementsystem.product.domain.quantity;

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
    @Column(name = "in_collective_package")
    private double inCollectivePackage;
    @Column(name = "stacked_on_pallet")
    private double stackedOnPallet;
    @Column(name = "minimum_level_of_stocks")
    private double minimumLevelOfStocks;

    public Quantity(double inCollectivePackage, double stackedOnPallet, double minimumLevelOfStocks) {
        this.available = 0;
        this.inCollectivePackage = inCollectivePackage;
        this.stackedOnPallet = stackedOnPallet;
        this.minimumLevelOfStocks = minimumLevelOfStocks;
    }
}