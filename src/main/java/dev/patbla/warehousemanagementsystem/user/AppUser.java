package dev.patbla.warehousemanagementsystem.user;

import dev.patbla.warehousemanagementsystem.user.role.UserRole;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "app_user")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JoinColumn(name = "created_date")
    private LocalDate createdDate;
    private boolean active;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JoinColumn(name = "last_logon")
    private LocalDate lastLogon;
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Set<UserRole> roles = new HashSet<>();
}