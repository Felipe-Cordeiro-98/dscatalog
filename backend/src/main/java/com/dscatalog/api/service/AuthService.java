package com.dscatalog.api.service;

import com.dscatalog.api.dto.AuthRequestDTO;
import com.dscatalog.api.dto.AuthResponseDTO;
import com.dscatalog.api.dto.RegisterRequestDTO;
import com.dscatalog.api.entity.Role;
import com.dscatalog.api.entity.User;
import com.dscatalog.api.repository.RoleRepository;
import com.dscatalog.api.repository.UserRepository;
import com.dscatalog.api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponseDTO login(AuthRequestDTO dto) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());
        authenticationManager.authenticate(authToken);

        String token = jwtService.generateToken(dto.email());
        return new AuthResponseDTO(token, "Bearer");
    }

    public void register(RegisterRequestDTO dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        User user = new User();
        user.setFirstName(dto.firstName());
        user.setLastName(dto.lastName());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));

        Role roleUser = roleRepository.findByAuthority("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRoles(Set.of(roleUser));
        userRepository.save(user);
    }
}
