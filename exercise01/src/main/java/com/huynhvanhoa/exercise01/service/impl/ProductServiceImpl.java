package com.huynhvanhoa.exercise01.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.huynhvanhoa.exercise01.entity.Product;
import com.huynhvanhoa.exercise01.repository.ProductRepository;
import com.huynhvanhoa.exercise01.service.ProductService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
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
        Product existingProduct = productRepository.findById(product.getProductID()).get();
        existingProduct.setProduct_sku(product.getProduct_sku());
        existingProduct.setProduct_name(product.getProduct_name());
        existingProduct.setProduct_price(product.getProduct_price());
        existingProduct.setProduct_weight(product.getProduct_weight());
        existingProduct.setProduct_cart_desc(product.getProduct_cart_desc());
        existingProduct.setProduct_short_desc(product.getProduct_short_desc());
        existingProduct.setProduct_long_desc(product.getProduct_long_desc());
        existingProduct.setProduct_thumb(product.getProduct_thumb());
        existingProduct.setProduct_image(product.getProduct_image());
        existingProduct.setProduct_category_id(product.getProduct_category_id());
        existingProduct.setProduct_update_date(product.getProduct_update_date());
        existingProduct.setProduct_stock(product.getProduct_stock());
        existingProduct.setProduct_live(product.isProduct_live());
        existingProduct.setProduct_unlimited(product.isProduct_unlimited());
        existingProduct.setProduct_location(product.getProduct_location());
    
        Product updatedProduct = productRepository.save(existingProduct);
        return updatedProduct;
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}
