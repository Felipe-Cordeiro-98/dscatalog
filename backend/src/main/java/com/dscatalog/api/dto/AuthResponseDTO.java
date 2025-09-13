package com.dscatalog.api.dto;

public record AuthResponseDTO(
        String access_token,
        String token_type
) {
}
