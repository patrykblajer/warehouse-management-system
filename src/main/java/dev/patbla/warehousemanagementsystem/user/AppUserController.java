package dev.patbla.warehousemanagementsystem.user;

import dev.patbla.warehousemanagementsystem.user.dtos.AppUserBasicInfoDto;
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
    @PreAuthorize("hasAuthority('administrator')")
    public ResponseEntity<?> findAppUserByUsername(@PathVariable String username) {
        var user = appUserRepository.findAppUserByUsername(username).orElseThrow();
        var info = AppUserBasicInfoDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
        return ResponseEntity.ok(info);
    }
}
