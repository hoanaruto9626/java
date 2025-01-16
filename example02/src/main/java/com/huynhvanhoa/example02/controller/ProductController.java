package com.huynhvanhoa.example02.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import com.huynhvanhoa.example02.entity.Product;
import com.huynhvanhoa.example02.service.ProductService;

import java.util.List;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("api/products")
public class ProductController {
    private ProductService productService;
    
    // private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    // @PostMapping
    // public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    //     // Log dữ liệu từ request
    //     logger.info("Received product data: {}", product);

    //     try {
    //         Product saveProduct = productService.createProduct(product);
    //         logger.info("Product saved successfully: {}", saveProduct);
    //         return new ResponseEntity<>(saveProduct, HttpStatus.CREATED);
    //     } catch (Exception e) {
    //         // Log lỗi chi tiết
    //         logger.error("Error while saving product", e);
    //         return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product saveProduct = productService.createProduct(product);
        return new ResponseEntity<>(saveProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long ProductId) {
        Product Product = productService.getProductById(ProductId);
        return new ResponseEntity<>(Product, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> Products = productService.getAllProducts();
        return new ResponseEntity<>(Products, HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long ProductId, 
        @RequestBody Product Product) {
        Product.setId(ProductId);
        Product updatedProduct = productService.updateProduct(Product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>("Product successfully deleted!", HttpStatus.OK);
    }
}
