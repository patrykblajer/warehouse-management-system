package dev.patbla.warehousemanagementsystem.security;

import dev.patbla.warehousemanagementsystem.user.AppUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    final AppUserRepository appUserRepository;

    public JwtUserDetailsService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var appUser = appUserRepository.findAppUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("USER_NOT_FOUND_OR_IS_BANNED"));
        Set<SimpleGrantedAuthority> roles = appUser.getRoles()
                .stream()
                .map(userRole -> new SimpleGrantedAuthority(userRole.getRole().getName())).collect(Collectors.toSet());
        return new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), roles);
    }
}