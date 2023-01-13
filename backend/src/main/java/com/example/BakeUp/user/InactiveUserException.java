package com.example.BakeUp.user;

public class InactiveUserException extends Exception {

    String username;

    public InactiveUserException(String username) {
        this.username = username;
    }

    public String toString() {
        return "Account with username: " + username + " has been deactivated.";
    }

}

