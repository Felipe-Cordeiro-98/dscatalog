package com.dscatalog.api.service;

import com.dscatalog.api.dto.CategoryRequestDTO;
import com.dscatalog.api.dto.CategoryResponseDTO;
import com.dscatalog.api.entity.Category;
import com.dscatalog.api.exception.DatabaseException;
import com.dscatalog.api.exception.ResourceNotFoundException;
import com.dscatalog.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository repository;

    @Transactional(readOnly = true)
    public Page<CategoryResponseDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(CategoryResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public CategoryResponseDTO findById(Long id) {
        Category entity = repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Category not found id={}", id);
                    return new ResourceNotFoundException("Category not found");
                });
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public CategoryResponseDTO create(CategoryRequestDTO dto) {
        Category entity = new Category(null, dto.name());
        entity = repository.save(entity);
        log.info("Category created id={}", entity.getId());
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public CategoryResponseDTO update(Long id, CategoryRequestDTO dto) {
        Category entity = repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Category not found for update id={}", id);
                    return new ResourceNotFoundException("Category not found");
                });
        entity.setName(dto.name());
        log.info("Category updated id={}", id);
        return new CategoryResponseDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        log.info("Deleting category id={}", id);
        if (!repository.existsById(id)) {
            log.warn("Category not found for delete id={}", id);
            throw new ResourceNotFoundException("Category not found");
        }
        try {
            repository.deleteById(id);
            repository.flush();
            log.info("Category deleted id={}", id);
        } catch (DataIntegrityViolationException e) {
            log.error("Integrity violation when deleting category id={}", id, e);
            throw new DatabaseException("Integrity violation: category is being used by another entity");
        }
    }
}
