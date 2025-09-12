package com.dscatalog.api.config;

import com.dscatalog.api.entity.Role;
import com.dscatalog.api.entity.User;
import com.dscatalog.api.repository.RoleRepository;
import com.dscatalog.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role userRole = roleRepository.save(new Role(null, "ROLE_USER"));
            Role adminRole = roleRepository.save(new Role(null, "ROLE_ADMIN"));

            User admin = new User();
            admin.setFirstName("Admin");
            admin.setEmail("admin@dscatalog.com");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setRoles(Set.of(adminRole, userRole));
            userRepository.save(admin);
        }
    }
}
