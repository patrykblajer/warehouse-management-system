package dev.patbla.warehousemanagementsystem.product.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String index;
    private String name;
    private String ean;
    private String category;
}