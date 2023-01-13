package com.example.BakeUp.order;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

@Table(name = "product_orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private int sellerId;
    private int buyerId;
    private String sellerName;
    private String buyerName;
    private String shopName;
    private String shopLocation;
    private int productId;
    private String productName;
    private String imageURL;
    private int quantity;
    private Double totalPrice;
    private String remarks;
    private String status;
    private boolean prepared;

    @JsonFormat(timezone = "Asia/Singapore")
    private Date dateTime;

    @JsonFormat(timezone = "Asia/Singapore")
    private Date collectionTime;

    public Order(int sellerId, int buyerId, String sellerName, String buyerName, String shopName, String shopLocation,
            int productId, String productName, String imageURL, int quantity, Double totalPrice, String remarks, String status,
            boolean prepared, Date dateTime, Date collectionTime) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.sellerName = sellerName;
        this.buyerName = buyerName;
        this.shopName = shopName;
        this.shopLocation = shopLocation;
        this.productId = productId;
        this.productName = productName;
        this.imageURL = imageURL;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.remarks = remarks;
        this.status = status;
        this.prepared = prepared;
        this.dateTime = dateTime;
        this.collectionTime = collectionTime;
    }
}
