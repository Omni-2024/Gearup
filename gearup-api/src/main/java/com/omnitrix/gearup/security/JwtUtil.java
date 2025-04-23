package com.omnitrix.gearup.security;

import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "your_secret";

    public String generateAccessToken(String email) {
        return generateToken(email, 1000 * 60 * 15); // 15 min
    }

    public String generateRefreshToken(String email) {
        return generateToken(email, 1000 * 60 * 60 * 24 * 7); // 7 days
    }

    private String generateToken(String email, long expiry) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiry))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername());
    }

    public String extractUsernameIgnoreExpiration(String token) {
        return extractAllClaims(token).getSubject();  // ✅ This skips expiration check
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }





}
