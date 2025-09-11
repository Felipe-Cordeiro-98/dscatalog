package com.dscatalog.api.dto;

import java.math.BigDecimal;

public record ProductRequestDTO(String name, String description, BigDecimal price, String imgUrl, Long category) {
}
