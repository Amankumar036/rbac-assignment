package com.aman.auth_rbac_system.filter;

import com.aman.auth_rbac_system.service.FetchUserDetails;
import com.aman.auth_rbac_system.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private FetchUserDetails userDetails;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JWT FILTER HIT");
       String token= request.getHeader("Authorization");
       if(token!=null && token.startsWith("Bearer ")){
           //token process
           token = token.substring(7);
           boolean expire=jwtUtil.isTokenExpire(token);
           if(!expire){
              String username= jwtUtil.getUsernameFromToken(token);
               if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null ){
                UserDetails ud= userDetails.loadUserByUsername(username);
                if(ud!=null){
                  UsernamePasswordAuthenticationToken up=  new UsernamePasswordAuthenticationToken(ud,token,ud.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(up);
                }
               }
               else{
                   System.out.println("User not found in the token");
               }
           }else {
               System.out.println("Token is expired");
           }
       }

         filterChain.doFilter(request,response);
    }
}
