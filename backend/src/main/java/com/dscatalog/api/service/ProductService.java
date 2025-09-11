package com.dscatalog.api.service;

import com.dscatalog.api.dto.ProductRequestDTO;
import com.dscatalog.api.dto.ProductResponseDTO;
import com.dscatalog.api.entity.Category;
import com.dscatalog.api.entity.Product;
import com.dscatalog.api.repository.CategoryRepository;
import com.dscatalog.api.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Page<ProductResponseDTO> findAll(Pageable pageable) {
        return productRepository.findAll(pageable).map(ProductResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO findById(Long id) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));
        return new ProductResponseDTO(entity);
    }

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO dto) {
        Category category = categoryRepository.findById(dto.category())
                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));

        Product entity = new Product();
        copyDtoToEntity(dto, entity, category);
        entity = productRepository.save(entity);
        return new ProductResponseDTO(entity);
    }

    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Category category = categoryRepository.findById(dto.category())
                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));
        try {
            Product entity = productRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity, category);
            return new ProductResponseDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Entity not found");
        }
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Entity not found");
        }
        productRepository.deleteById(id);
    }

    private void copyDtoToEntity(ProductRequestDTO dto, Product entity, Category category) {
        entity.setName(dto.name());
        entity.setDescription(dto.description());
        entity.setPrice(dto.price());
        entity.setImgUrl(dto.imgUrl());
        entity.setCategory(category);
    }
}
