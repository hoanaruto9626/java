package com.huynhvanhoa.example05.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.huynhvanhoa.example05.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
}