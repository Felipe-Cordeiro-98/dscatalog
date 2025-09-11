package com.dscatalog.api.service;

import com.dscatalog.api.dto.CategoryRequestDTO;
import com.dscatalog.api.dto.CategoryResponseDTO;
import com.dscatalog.api.entity.Category;
import com.dscatalog.api.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
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
                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public CategoryResponseDTO create(CategoryRequestDTO dto) {
        Category entity = new Category(null, dto.name());
        entity = repository.save(entity);
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public CategoryResponseDTO update(Long id, CategoryRequestDTO dto) {
        try {
            Category entity = repository.getReferenceById(id);
            if (!entity.getName().equalsIgnoreCase(dto.name())) {
                entity.setName(dto.name());
            }
            return new CategoryResponseDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Entity not found");
        }
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Entity not found");
        }
        repository.deleteById(id);
    }
}
