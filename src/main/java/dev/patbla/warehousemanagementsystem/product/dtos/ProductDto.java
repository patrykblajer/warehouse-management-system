package dev.patbla.warehousemanagementsystem.product.dtos;

import lombok.*;

import javax.validation.constraints.Size;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;
    @Size(min = 2, max = 255, message = "{least2Char}")
    private String index;
    @Size(min = 2, max = 255, message = "{least2Char}")
    private String name;
}