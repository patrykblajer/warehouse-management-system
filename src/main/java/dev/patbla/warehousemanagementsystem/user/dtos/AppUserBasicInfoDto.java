package dev.patbla.warehousemanagementsystem.user.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppUserBasicInfoDto {
    private String firstName;
    private String lastName;
}