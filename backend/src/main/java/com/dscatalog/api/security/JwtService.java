package com.dscatalog.api.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class JwtService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${api.security.token.expiration}")
    private Long expirationHours;

    public String generateToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("DSCatalog")
                    .withSubject(email)
                    .withExpiresAt(expirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error creating token");
        }
    }

    public String getSubject(String tokenJwt) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("DSCatalog")
                    .build()
                    .verify(tokenJwt)
                    .getSubject();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Invalid or expired token");
        }
    }

    private Instant expirationDate() {
        return LocalDateTime.now()
                .plusHours(expirationHours)
                .toInstant(ZoneOffset.of("-03:00"));
    }
}
