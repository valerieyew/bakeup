package com.example.BakeUp.order;

import java.security.Principal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.example.BakeUp.user.User;
import com.example.BakeUp.user.UserRepository;
import com.example.BakeUp.product.Product;
import com.example.BakeUp.product.ProductRepository;
import com.example.BakeUp.shop.Shop;
import com.example.BakeUp.shop.ShopRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;

@RestController
public class OrderController {
    private OrderService orderService;
    private ProductRepository products;
    private ShopRepository shops;
    private UserRepository users;

    public OrderController(OrderService orderService, UserRepository users, ProductRepository products, ShopRepository shops) {
        this.orderService = orderService;
        this.users = users;
        this.products = products;
        this.shops = shops;
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrder(@PathVariable int orderId) {
        return orderService.getOrder(orderId);
    }

    @GetMapping("/orders/seller")
    public List<Order> listSellerOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.listSellerOrders(user.getId());
    }

    @GetMapping("/orders/buyer")
    public List<Order> listBuyerOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.listBuyerOrders(user.getId());
    }

    @GetMapping("/orders/seller/pending")
    public List<Order> getSellerPendingOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.getSellerPendingOrders(user.getId());
    }

    @GetMapping("/orders/buyer/pending")
    public List<Order> getBuyerPendingOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.getBuyerPendingOrders(user.getId());
    }

    @GetMapping("/orders/seller/processing")
    public List<Order> getSellerProcessingOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.getSellerProcessingOrders(user.getId());
    }

    @GetMapping("/orders/buyer/processing")
    public List<Order> getBuyerProcessingOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.getBuyerProcessingOrders(user.getId());
    }

    @GetMapping("/orders/seller/completed")
    public List<Order> getSellerCompletedOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.getSellerCompletedOrders(user.getId());
    }

    @GetMapping("/orders/buyer/completed")
    public List<Order> getBuyerCompletedOrders(Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        return orderService.getBuyerCompletedOrders(user.getId());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/orders")
    public Order addOrder(@RequestBody Order order, Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        Product product = products.findById(order.getProductId()).orElse(null);
        Shop shop = shops.findById(product.getShopId()).orElse(null);
        User seller = users.findById(shop.getHomeBakerId()).orElse(null);
        
        order.setSellerId(seller.getId());
        order.setBuyerId(user.getId());
        order.setSellerName(seller.getUsername());
        order.setBuyerName(user.getUsername());
        order.setShopName(shop.getShopName());
        order.setShopLocation(shop.getLocation());
        order.setProductName(product.getProduct_name());
        order.setImageURL(product.getImage_url());
        order.setStatus("Pending");
        order.setDateTime(new Date());
        order.setPrepared(false);

        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, 5);
        Date date = c.getTime();
        order.setCollectionTime(date);
        return orderService.addOrder(order);
    }

    @PutMapping("/orders/{orderId}")
    public Order updateOrder(@PathVariable int orderId, @RequestBody Order newOrderInfo) {
        Order order = orderService.getOrder(orderId);
        if (order == null) {
            throw new OrderNotFoundException(orderId);
        }
        return orderService.updateOrder(orderId, newOrderInfo);
    }

    @DeleteMapping("orders/{orderId}")
    public void deleteOrder(@PathVariable int orderId) {
        try {
            orderService.deleteOrder(orderId);
        } catch (EmptyResultDataAccessException e) {
            throw new OrderNotFoundException(orderId);
        }
    }
}
