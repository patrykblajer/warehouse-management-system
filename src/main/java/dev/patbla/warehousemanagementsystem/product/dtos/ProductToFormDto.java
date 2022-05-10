package dev.patbla.warehousemanagementsystem.product.dtos;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductToFormDto {
    @NotBlank(message = "This field cannot be blank.")
    private String index;
    @NotBlank(message = "This field cannot be blank.")
    private String name;
    private String ean;
    @NotBlank(message = "This field cannot be blank.")
    private String category;
    @NotBlank(message = "This field cannot be blank.")
    private String unit;
    private String packagingType;
    private double inCollectivePackage;
    private double stackedOnPallet;
    private double minimumLevelOfStocks;
    @NotBlank(message = "This field cannot be blank.")
    private String preferredPalletType;
    private boolean active;
    private String description;
}