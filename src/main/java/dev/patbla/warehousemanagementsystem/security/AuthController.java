package dev.patbla.warehousemanagementsystem.security;

import dev.patbla.warehousemanagementsystem.user.AppUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    final AppUserRepository appUserRepository;
    final AuthenticationManager authenticationManager;
    final JwtUserDetailsService userDetailsService;
    final JwtTokenUtil jwtTokenUtil;

    public AuthController(AppUserRepository appUserRepository, AuthenticationManager authenticationManager, JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.appUserRepository = appUserRepository;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginCredentials loginCredentials) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginCredentials.getUsername(), loginCredentials.getPassword()));
            if (auth.isAuthenticated()) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(loginCredentials.getUsername());
                String token = jwtTokenUtil.generateToken(userDetails);
                response.put("status", "success");
                response.put("message", "logged in");
                response.put("token", token);
                log.info("User {} logged in", userDetails.getUsername());
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "invalid username or password");
                return ResponseEntity.status(401).body(response);
            }
        } catch (DisabledException e) {
            response.put("status", "error");
            response.put("message", "user is disabled or banned");
            return ResponseEntity.status(500).body(response);
        } catch (BadCredentialsException e) {
            response.put("status", "error");
            response.put("message", "invalid username or password");
            return ResponseEntity.status(401).body(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "authorization error");
            return ResponseEntity.status(500).body(response);
        }
    }
}