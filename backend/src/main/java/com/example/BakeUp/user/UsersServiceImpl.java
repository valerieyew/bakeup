package com.example.BakeUp.user;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.SneakyThrows;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UsersServiceImpl implements UsersService, UserDetailsService {
    private UserRepository users;

    public UsersServiceImpl(UserRepository userRepository) {    
        this.users = userRepository;
    }

    @Override
    public List<User> listUsers() {
        return users.findAll();
    }

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (users.findByUsername(username).get().getActive() == false) {
            throw new InactiveUserException(username);
        }
        return users.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User '" + username + "' not found"));
    }
    
    @Override
    public User addUser(User user) {
        String username = user.getUsername();
        if (users.findByUsername(username).orElse(null) != null) {
            throw new UsernameTakenException(username);
        }
        User savedUser = users.save(user);
        return savedUser;
    }

    @Override
    public User updateUser(int id, User newUserInfo) {
        return users.findById(id).map(user -> {
            user.setPassword(newUserInfo.getPassword());
            user.setAlias(newUserInfo.getAlias());
            user.setActive(newUserInfo.getActive());
            user.setAuthorities(newUserInfo.getAuthorities().iterator().next().toString());
            return users.save(user);
        }).orElse(null);
    }

    @Override
    public User viewUserInfo(int id) {
        return users.findById(id).orElse(null);
    }

    @Override
    public User deactivate(int id) {
        return users.findById(id).map(user -> {
            user.setActive(false);
            users.save(user);
            return user;
        }).orElse(null);
    }
}
