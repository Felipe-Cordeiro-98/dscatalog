package com.dscatalog.api.dto;

import com.dscatalog.api.entity.Product;

import java.math.BigDecimal;

public record ProductResponseDTO(Long id, String name, String description, BigDecimal price, String imgUrl, CategoryResponseDTO category) {

    public ProductResponseDTO(Product product) {
        this(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getImgUrl(), new CategoryResponseDTO(product.getCategory()));
    }
}
