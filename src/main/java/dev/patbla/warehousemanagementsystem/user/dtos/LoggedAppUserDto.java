package dev.patbla.warehousemanagementsystem.user.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoggedAppUserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String role;
}