package com.example.BakeUp.shop;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // 404 Error
public class ShopNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ShopNotFoundException(int id) {
        super("Could not find shop " + id);
    }

    // public ShopNotFoundException(String shopName) {
    //     super("Could not find shop " + shopName);
    // }
}