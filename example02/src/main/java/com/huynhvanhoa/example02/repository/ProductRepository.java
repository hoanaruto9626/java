package com.huynhvanhoa.example02.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huynhvanhoa.example02.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
