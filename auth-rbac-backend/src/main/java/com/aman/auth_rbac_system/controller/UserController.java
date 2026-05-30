package com.aman.auth_rbac_system.controller;


import com.aman.auth_rbac_system.config.UserDetailsImpl;
import com.aman.auth_rbac_system.io.AuthResponse;
import com.aman.auth_rbac_system.io.LoginRequest;
import com.aman.auth_rbac_system.io.UserRequest;
import com.aman.auth_rbac_system.io.UserResponse;
import com.aman.auth_rbac_system.service.FetchUserDetails;
import com.aman.auth_rbac_system.service.UserService;
import com.aman.auth_rbac_system.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@Tag(
        name = "Authentication APIs",
        description = "APIs for authentication and role-based authorization"
)
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {

    private final UserService userService;


    private final AuthenticationManager authenticationManager;
    //private final FetchUserDetails userDetails;

    private final JwtUtil jwtUtil;


    @Operation(
            summary = "Register User",
            description = "Registers a new USER or ADMIN"
    )
    @PostMapping("/register")
    public UserResponse userRegister(@Valid @RequestBody UserRequest userRequest){
         return userService.registerUser(userRequest);
    }

    @Operation(
            summary = "Login User",
            description = "Authenticates user and returns JWT token"
    )
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> userLogin(@Valid  @RequestBody LoginRequest loginRequest){
       String email= loginRequest.getEmail();
       String password=loginRequest.getPassword();
       UsernamePasswordAuthenticationToken userPas=new UsernamePasswordAuthenticationToken(email,password);
       Authentication autthenticate=authenticationManager.authenticate(userPas);
       UserDetails userDetails1= (UserDetailsImpl) autthenticate.getPrincipal();
      String JwtToken= jwtUtil.generateToken(userDetails1);
      AuthResponse authresponse= new AuthResponse();
        authresponse.setEmail(loginRequest.getEmail());
        authresponse.setToken(JwtToken);
        authresponse.setRole(((UserDetailsImpl) userDetails1).getUser().getRole().name());

      return new ResponseEntity<>(authresponse, HttpStatus.OK);
    }


    @Operation(
            summary = "Public API",
            description = "Accessible by everyone"
    )
    @GetMapping("/public")
    public ResponseEntity<String> publicAccess(){
         return ResponseEntity.ok("public Access");
    }



    @Operation(
            summary = "User API",
            description = "Accessible only by USER role"
    )
    @GetMapping("/user")
    public ResponseEntity<String> user(){
        return ResponseEntity.ok("user Access");
    }


    @Operation(
            summary = "Admin API",
            description = "Accessible only by ADMIN role"
    )
    @GetMapping("/admin")
    public ResponseEntity<String> admin(){
        return ResponseEntity.ok("admin Access");
    }
}
