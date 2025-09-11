package com.dscatalog.api.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequestDTO(
        @NotBlank(message = "O nome da categoria é obrigatória")
        String name
) {
}
