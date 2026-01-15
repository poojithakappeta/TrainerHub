package com.examly.springapp.repository;

import org.springframework.stereotype.Repository;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface UserRepo  extends  JpaRepository<User,Long>{
    boolean existsByEmail(String email);
 
    User findByEmail(String email);
 
    User findByUsername(String username);
}
