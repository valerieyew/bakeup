package com.example.BakeUp.order;
import com.example.BakeUp.product.ProductNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OrderNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1l;

    public OrderNotFoundException(int id) {
        super("Could not find product " + id);
    }
}
