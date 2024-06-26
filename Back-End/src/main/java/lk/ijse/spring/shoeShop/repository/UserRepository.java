package lk.ijse.spring.shoeShop.repository;


import lk.ijse.spring.shoeShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


    Optional<User> findByEmail(String email);


}
