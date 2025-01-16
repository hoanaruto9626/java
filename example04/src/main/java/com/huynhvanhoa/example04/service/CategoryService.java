package com.huynhvanhoa.example04.service;

import java.util.List;
import com.huynhvanhoa.example04.entity.Category;

public interface CategoryService {
    Category createCategory(Category category);

    Category getCategoryById(Long categoryId);

    List<Category> getAllCategories();

    Category updateCategory(Category category);

    void deleteCategory(Long categoryId);
}
