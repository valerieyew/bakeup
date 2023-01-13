package com.example.BakeUp.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidUserDetailsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidUserDetailsException(int id) {
        super("Invalid user details");
    }

}
