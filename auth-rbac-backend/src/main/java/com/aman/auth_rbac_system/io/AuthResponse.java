package com.aman.auth_rbac_system.io;

import com.aman.auth_rbac_system.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String email;
    private String role;
    private String token;
}
