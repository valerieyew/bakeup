package com.example.BakeUp.order;

import java.util.List;

public interface OrderService {
    Order getOrder(int id);

    List<Order> listSellerOrders(int sellerId);

    List<Order> listBuyerOrders(int buyerId);
    
    List<Order> getSellerPendingOrders(int sellerId);

    List<Order> getBuyerPendingOrders(int buyerId);

    List<Order> getSellerProcessingOrders(int sellerId);

    List<Order> getBuyerProcessingOrders(int buyerId);

    List<Order> getSellerCompletedOrders(int sellerId);

    List<Order> getBuyerCompletedOrders(int buyerId);

    Order addOrder(Order order);

    Order updateOrder(int id, Order order);

    void deleteOrder(int id);
}
