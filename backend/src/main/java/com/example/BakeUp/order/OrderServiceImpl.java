package com.example.BakeUp.order;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepository orders;

    public OrderServiceImpl(OrderRepository orders) {
        this.orders = orders;
    }

    @Override
    public Order getOrder(int id) {
        return orders.findById(id).map(order -> {
            return order;
        }).orElse(null);
    }

    @Override
    public List<Order> listSellerOrders(int sellerId) {
        return orders.findBySellerId(sellerId);
    }

    @Override
    public List<Order> listBuyerOrders(int buyerId) {
        return orders.findByBuyerId(buyerId);
    }

    @Override
    public List<Order> getSellerPendingOrders(int sellerId) {
        return orders.findOrdersByStatusAndSellerId("Pending", sellerId);
    }

    @Override
    public List<Order> getBuyerPendingOrders(int buyerId) {
        return orders.findOrdersByStatusAndBuyerId("Pending", buyerId);
    }

    @Override
    public List<Order> getSellerProcessingOrders(int sellerId) {
        return orders.findOrdersByStatusAndSellerId("Processing", sellerId);
    }

    @Override
    public List<Order> getBuyerProcessingOrders(int buyerId) {
        return orders.findOrdersByStatusAndBuyerId("Processing", buyerId);
    }

    @Override
    public List<Order> getSellerCompletedOrders(int sellerId) {
        return orders.findOrdersByStatusAndSellerId("Completed", sellerId);
    }

    @Override
    public List<Order> getBuyerCompletedOrders(int buyerId) {
        return orders.findOrdersByStatusAndBuyerId("Completed", buyerId);
    }

    @Override
    public Order addOrder(Order order) {
        return orders.save(order);
    }

    @Override
    public Order updateOrder(int id, Order newOrderInfo) {
        return orders.findById(id).map(order -> {
            order.setRemarks(newOrderInfo.getRemarks());
            order.setStatus(newOrderInfo.getStatus());
            order.setPrepared(newOrderInfo.isPrepared());
//            order.setCollectionTime(newOrderInfo.getCollectionTime());
            return orders.save(order);
        }).orElse(null);
    }

    @Override
    public void deleteOrder(int id) {
        orders.deleteById(id);
        return;
    }
}
