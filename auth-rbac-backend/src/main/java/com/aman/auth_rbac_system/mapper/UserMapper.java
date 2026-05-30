package com.aman.auth_rbac_system.mapper;

import com.aman.auth_rbac_system.entity.User;
import com.aman.auth_rbac_system.io.UserRequest;
import com.aman.auth_rbac_system.io.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.aman.auth_rbac_system.entity.Role;

@Mapper(componentModel = "spring",imports = Role.class)
public interface UserMapper {

    @Mapping(target = "role", expression = "java(Role.valueOf(request.getRole()))")
    User toEntity(UserRequest request);

    UserResponse toResponse(User user);
}
