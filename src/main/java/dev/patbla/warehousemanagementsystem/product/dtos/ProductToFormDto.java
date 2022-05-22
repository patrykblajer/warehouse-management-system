package dev.patbla.warehousemanagementsystem.product.dtos;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductToFormDto {
    @NotBlank(message = "This field cannot be blank.")
    @Length(max = 255, message = "The maximum number of characters is 256.")
    private String index;
    @NotBlank(message = "This field cannot be blank.")
    @Length(max = 255, message = "The maximum number of characters is 256.")
    private String name;
    private String ean;
    @NotBlank(message = "This field cannot be blank.")
    private String category;
    @NotBlank(message = "This field cannot be blank.")
    private String unit;
    private String packagingType;
    @Max(value = 1_000_000, message = "The number is too large.")
    @Min(value = 0, message = "The number cannot be less than zero")
    private double inCollectivePackage;
    private String preferredPalletType;
    @Max(value = 1_000_000, message = "The number is too large.")
    @Min(value = 0, message = "The number cannot be less than zero")
    private double stackedOnPallet;
    @Max(value = 1_000_000, message = "The number is too large.")
    @Min(value = 0, message = "The number cannot be less than zero")
    private double minimumLevelOfStocks;
    private boolean active;
    @Length(max = 255, message = "The maximum number of characters is 1000.")
    private String description;
}