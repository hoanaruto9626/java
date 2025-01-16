package com.huynhvanhoa.example04.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huynhvanhoa.example04.entity.Product;
public interface ProductRepository extends JpaRepository<Product, Long>{
    
}
