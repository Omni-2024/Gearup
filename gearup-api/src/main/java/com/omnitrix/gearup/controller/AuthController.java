package com.omnitrix.gearup.controller;

import com.omnitrix.gearup.model.AuthRequest;
import com.omnitrix.gearup.model.User;
import com.omnitrix.gearup.repository.UserRepository;
import com.omnitrix.gearup.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.omnitrix.gearup.service.UserDetailsServiceImpl;


import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsServiceImpl userDetailsService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String accessToken = jwtUtil.generateAccessToken(request.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(request.getEmail());

        // Save refreshToken to DB (optional for logout/invalidation)
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        user.setRefreshToken(refreshToken);
        userRepo.save(user);

        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        String expiredAccessToken = extractAccessTokenFromRequest(request);
        String email = jwtUtil.extractUsernameIgnoreExpiration(expiredAccessToken);
        User user = userRepo.findByEmail(email).orElseThrow();

        String refreshTokenFromDB = user.getRefreshToken();

        if (!jwtUtil.validateToken(refreshTokenFromDB, userDetailsService.loadUserByUsername(email))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        String newAccessToken = jwtUtil.generateAccessToken(email);

        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> body) {
        String email = jwtUtil.extractUsername(body.get("refreshToken"));
        User user = userRepo.findByEmail(email).orElseThrow();
        user.setRefreshToken(null); // Invalidate token
        userRepo.save(user);
        return ResponseEntity.ok("Logged out");
    }


    private String extractAccessTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);  // Extract token part
        }
        throw new RuntimeException("Access token missing");
    }



}
