package mk.finki.ukim.mk.proekt.service;

import mk.finki.ukim.mk.proekt.model.Car;
import mk.finki.ukim.mk.proekt.model.Key;
import mk.finki.ukim.mk.proekt.model.Users;

import java.util.List;
import java.util.Optional;

public interface UsersService {

    List<Users> getAllUsers();

    Users createUser(Users user);

    Optional<Users> getUser(String username);

    Users updateUser(String username, Users user);

    void deleteUser(String username);

}
