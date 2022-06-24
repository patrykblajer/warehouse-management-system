package dev.patbla.warehousemanagementsystem.user;

import dev.patbla.warehousemanagementsystem.user.dtos.LoggedAppUserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) appUserRepository.findAppUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user with such username!"));
    }

    public LoggedAppUserDto mapToLoggedAppUserDto(String username) {
        var user = appUserRepository.findAppUserByUsername(username).orElseThrow();
        return LoggedAppUserDto.builder()
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
    }
}