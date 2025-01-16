package com.huynhvanhoa.example04.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.huynhvanhoa.example04.entity.Product;
import com.huynhvanhoa.example04.service.ProductService;
import com.huynhvanhoa.example04.repository.ProductRepository;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImql implements ProductService {
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.get();
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();

    }

    @Override
    public Product updateProduct(Product product) {
        Product existingProduct = productRepository.findById(product.getId()).get();
        existingProduct.setTitle(product.getTitle());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPhoto(product.getPhoto());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        Product updatedProduct = productRepository.save(existingProduct);
        return updatedProduct;

    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);

    }
}
