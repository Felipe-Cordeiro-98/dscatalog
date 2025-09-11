package com.dscatalog.api.service;

import com.dscatalog.api.dto.CategoryRequestDTO;
import com.dscatalog.api.dto.CategoryResponseDTO;
import com.dscatalog.api.entity.Category;
import com.dscatalog.api.exception.ResourceNotFoundException;
import com.dscatalog.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    @Transactional(readOnly = true)
    public Page<CategoryResponseDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(CategoryResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public CategoryResponseDTO findById(Long id) {
        Category entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public CategoryResponseDTO create(CategoryRequestDTO dto) {
        Category entity = new Category(null, dto.name());
        return new CategoryResponseDTO(repository.save(entity));
    }

    @Transactional
    public CategoryResponseDTO update(Long id, CategoryRequestDTO dto) {
        Category entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        entity.setName(dto.name());
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        repository.deleteById(id);
    }
}
