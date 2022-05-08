package dev.patbla.warehousemanagementsystem.product.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductToFormDto {
    private String index;
    private String name;
    private String ean;
    private String category;
    private String unit;
    private String packagingType;
    private double inCollectivePackage;
    private double stackedOnPallet;
    private double minimumLevelOfStocks;
    private String preferredPalletType;
    private boolean active;
    private String description;
}