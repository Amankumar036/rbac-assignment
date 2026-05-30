package com.aman.auth_rbac_system.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;

@Component
public class JwtUtil {

    @Value("${Jwt.secret.key}")
    private String SECRET_KEY;

    public String generateToken(UserDetails userDetails){

        List<String> roles=new ArrayList<>();
        for(GrantedAuthority grantedAuthority:userDetails.getAuthorities()){
            roles.add(grantedAuthority.getAuthority());
        }

        Map<String,Object> claims=new HashMap<>();
        claims.put("roles",roles);

       String token= Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+6*60*60*1000))
                .signWith(secretKey(),Jwts.SIG.HS256)
                .compact();

        return token;
    }

    private SecretKey secretKey(){
        byte[] bytes=SECRET_KEY.getBytes();
        SecretKey key=Keys.hmacShaKeyFor(bytes);
        return key;
    }


    //==============================================================================

    public Jws<Claims> getAllClaimsFromToken(String token){
        JwtParserBuilder parse=Jwts.parser();
        Jws<Claims> claims=parse.verifyWith(secretKey()).build().parseSignedClaims(token);
        return claims;
    }

    public String getUsernameFromToken(String token){
       return getAllClaimsFromToken(token).getPayload().getSubject();
    }

    public boolean isTokenExpire(String token){
      Date expiration=  getAllClaimsFromToken(token).getPayload().getExpiration();
      return expiration.before(new Date());
    }

}
