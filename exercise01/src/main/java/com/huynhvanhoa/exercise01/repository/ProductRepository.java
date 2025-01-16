package com.huynhvanhoa.exercise01.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huynhvanhoa.exercise01.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
