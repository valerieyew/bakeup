package com.example.BakeUp.order;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderId(int orderId);
    List<Order> findBySellerId(int id);
    List<Order> findByBuyerId(int id);
    List<Order> findOrdersByStatusAndSellerId(String status, int id);
    List<Order> findOrdersByStatusAndBuyerId(String status, int id);
}
