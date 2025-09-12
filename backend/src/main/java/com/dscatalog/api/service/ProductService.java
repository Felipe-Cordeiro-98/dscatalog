package com.dscatalog.api.service;

import com.dscatalog.api.dto.ProductRequestDTO;
import com.dscatalog.api.dto.ProductResponseDTO;
import com.dscatalog.api.entity.Category;
import com.dscatalog.api.entity.Product;
import com.dscatalog.api.exception.ResourceNotFoundException;
import com.dscatalog.api.repository.CategoryRepository;
import com.dscatalog.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    @Transactional(readOnly = true)
    public Page<ProductResponseDTO> findAll(Pageable pageable) {
        return productRepository.findAll(pageable).map(ProductResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO findById(Long id) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Product not found id={}", id);
                    return new ResourceNotFoundException("Product not found");
                });
        return new ProductResponseDTO(entity);
    }

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO dto) {
        Product entity = new Product();
        copyDtoToEntity(dto, entity);
        entity = productRepository.save(entity);

        log.info("Product created with ID: {}", entity.getId());

        return new ProductResponseDTO(entity);
    }

    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Product not found for update id={}", id);
                    return new ResourceNotFoundException("Product not found");
                });
        copyDtoToEntity(dto, entity);
        return new ProductResponseDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        log.info("Deleting product id={}", id);
        if (!productRepository.existsById(id)) {
            log.warn("Product not found for delete id={}", id);
            throw new ResourceNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
        log.info("Product deleted id={}", id);
    }

    private void copyDtoToEntity(ProductRequestDTO dto, Product entity) {
        Category category = categoryRepository.findById(dto.category())
                .orElseThrow(() -> {
                    log.warn("Category not found id={}", dto.category());
                    return new ResourceNotFoundException("Category not found");
                });

        entity.setName(dto.name());
        entity.setDescription(dto.description());
        entity.setPrice(dto.price());
        entity.setImgUrl(dto.imgUrl());
        entity.setCategory(category);
    }
}
