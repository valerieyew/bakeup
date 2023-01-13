package com.example.BakeUp.shop;

import java.util.ArrayList;
import java.util.List;

import com.example.BakeUp.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer> {
    Shop findByHomeBakerId(int homeBakerId);

    @Query("SELECT s from Shop s WHERE lower(s.shopName) LIKE lower(concat('%', ?1,'%'))")
    ArrayList<Shop> findAll(String keyword);
}
