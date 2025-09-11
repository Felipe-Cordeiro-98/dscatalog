package com.dscatalog.api.dto;

import com.dscatalog.api.entity.Category;

public record CategoryResponseDTO(Long id, String name) {

    public CategoryResponseDTO(Category category){
        this(category.getId(), category.getName());
    }
}
