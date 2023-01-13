package com.example.BakeUp.user;

import java.util.List;

public interface UsersService {

    User addUser(User user);

    User updateUser(int id, User user);

    User viewUserInfo(int id);

    List<User> listUsers();

    User deactivate(int id);
}
