package com.huynhvanhoa.example04.repository;
import org. springframework.data. jpa. repository. JpaRepository;
import com. huynhvanhoa. example04.entity.Category;
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
