package com.aman.auth_rbac_system.service;

import com.aman.auth_rbac_system.io.UserRequest;
import com.aman.auth_rbac_system.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest userRequest);
}
