package com.example.BakeUp.user;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UsersController {
    private BCryptPasswordEncoder encoder;
    private UsersService usersService;
    private UserRepository users;

    public UsersController(BCryptPasswordEncoder encoder, UsersService usersService, UserRepository users) {
        this.encoder = encoder;
        this.usersService = usersService;
        this.users = users;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return usersService.listUsers();
    }

    @PreAuthorize("#id == authentication.principal.id")
    @GetMapping("/users/{id}")
    public User viewUserInfo(@PathVariable int id) {
        return usersService.viewUserInfo(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        user = encodeUserPassword(user);
        return usersService.addUser(user);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable int id, @Valid @RequestBody User newUserInfo, Authentication authentication) {
        checkValidUser(id);
        newUserInfo = encodeUserPassword(newUserInfo);
        User user;
        user = usersService.updateUser(id, newUserInfo);
        return user;
    }

    @PutMapping("/users/deactivate/{id}")
    public User deactivateUser(@PathVariable int id) {
        checkValidUser(id);
        User user = usersService.deactivate(id);
        return user;
    }

    private void checkValidUser(int id) {
        if (users.findById(id).orElse(null) == null) {
            throw new InvalidUserDetailsException(id);
        }
    }

    private User encodeUserPassword(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return user;
    }
}
