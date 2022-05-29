package dev.patbla.warehousemanagementsystem.product.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PreferredPalletTypeDto {
    private Long id;
    private String name;
}