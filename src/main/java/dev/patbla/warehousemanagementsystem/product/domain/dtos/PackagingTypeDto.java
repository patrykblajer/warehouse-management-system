package dev.patbla.warehousemanagementsystem.product.domain.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PackagingTypeDto {
    private Long id;
    private String name;
}