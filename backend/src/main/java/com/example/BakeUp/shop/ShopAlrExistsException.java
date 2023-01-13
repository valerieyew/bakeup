package com.example.BakeUp.shop;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // 404 Error
public class ShopAlrExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ShopAlrExistsException(int id) {
        super("Shop " + id + " already exists");
    }

}