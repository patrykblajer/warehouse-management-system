package dev.patbla.warehousemanagementsystem.user;

import dev.patbla.warehousemanagementsystem.user.dtos.LoggedAppUserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/users")
public class AppUserController {

    AppUserRepository appUserRepository;

    public AppUserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<?> findAppUserByUsername(@PathVariable String username) {
        var user = appUserRepository.findAppUserByUsername(username).orElseThrow();
        var info = LoggedAppUserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRoles()
                        .stream()
                        .findFirst()
                        .orElseThrow()
                        .getRole()
                        .getName())
                .build();
        return ResponseEntity.ok(info);
    }
}