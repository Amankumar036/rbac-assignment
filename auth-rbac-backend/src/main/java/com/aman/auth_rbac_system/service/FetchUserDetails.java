package com.aman.auth_rbac_system.service;

import com.aman.auth_rbac_system.config.UserDetailsImpl;
import com.aman.auth_rbac_system.entity.User;
import com.aman.auth_rbac_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FetchUserDetails implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      Optional<User> opt= userRepository.findByEmail(email);
      if(opt.isPresent()){
         User user= opt.get();
         System.out.println(user);
         return new UserDetailsImpl(user);
      }
      else{
          throw new UsernameNotFoundException("UserNot Found");
      }
    }
}
