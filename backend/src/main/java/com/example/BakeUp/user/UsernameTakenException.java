package com.example.BakeUp.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT) // 404 Error
public class UsernameTakenException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  public UsernameTakenException(String username) {
    super("Username has already been taken: " + username);
  }
}
