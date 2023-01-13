package com.example.BakeUp.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // List<Product> findAll();
    List<Product> findByShopId(Integer shop_id);

    @Query("SELECT p FROM Product p WHERE lower(p.product_name) LIKE lower(concat('%', ?1,'%')) OR lower(p.product_type) LIKE lower(concat('%', ?1,'%'))")
    List<Product> findAll(String keyword);
}