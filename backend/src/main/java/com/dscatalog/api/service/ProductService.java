package com.dscatalog.api.service;

import com.dscatalog.api.dto.ProductRequestDTO;
import com.dscatalog.api.dto.ProductResponseDTO;
import com.dscatalog.api.entity.Category;
import com.dscatalog.api.entity.Product;
import com.dscatalog.api.exception.ResourceNotFoundException;
import com.dscatalog.api.repository.CategoryRepository;
import com.dscatalog.api.repository.ProductRepository;
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
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return new ProductResponseDTO(entity);
    }

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO dto) {
        Product entity = new Product();
        copyDtoToEntity(dto, entity);
        return new ProductResponseDTO(productRepository.save(entity));
    }

    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        copyDtoToEntity(dto, entity);
        return new ProductResponseDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private void copyDtoToEntity(ProductRequestDTO dto, Product entity) {
        Category category = categoryRepository.findById(dto.category())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        entity.setName(dto.name());
        entity.setDescription(dto.description());
        entity.setPrice(dto.price());
        entity.setImgUrl(dto.imgUrl());
        entity.setCategory(category);
    }
}
