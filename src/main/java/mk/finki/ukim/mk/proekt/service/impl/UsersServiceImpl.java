package mk.finki.ukim.mk.proekt.service.impl;

import mk.finki.ukim.mk.proekt.model.Key;
import mk.finki.ukim.mk.proekt.model.Users;
import mk.finki.ukim.mk.proekt.repository.KeyRepository;
import mk.finki.ukim.mk.proekt.repository.UsersRepository;
import mk.finki.ukim.mk.proekt.service.UsersService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServiceImpl implements UsersService {

    UsersRepository usersRepository;
    UsersServiceImpl(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }

    @Override
    public Users createUser(Users user) {
        return this.usersRepository.save(user);
    }

    @Override
    public List<Users> getAllUsers() {
        return this.usersRepository.getAllUsers();
    }

    @Override
    public Optional<Users> getUser(String username) {
        return this.usersRepository.findById(username);
    }

    @Override
    public Users updateUser(String username, Users user) {
        Users u = usersRepository.findById(username).orElse(null);
        if(u != null) {
            u.setUsername(user.getUsername());
            u.setUsername(user.getPassword());
        }
        return u;
    }

    @Override
    public void deleteUser(String username) {
         this.usersRepository.deleteById(username);
    }
}
