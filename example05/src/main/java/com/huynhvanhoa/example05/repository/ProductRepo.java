package com.huynhvanhoa.example05.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.huynhvanhoa.example05.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Page<Product> findByProductNameLike(String keyword, Pageable pageDetails);

    // Cập nhật phương thức để tìm kiếm theo categoryId
    Page<Product> findByCategoryCategoryId(Long categoryId, Pageable pageable);
}
