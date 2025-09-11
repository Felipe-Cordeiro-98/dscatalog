package com.dscatalog.api.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequestDTO(@NotBlank String name) {
}
