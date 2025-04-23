package com.omnitrix.gearup.controller;

import com.omnitrix.gearup.model.User;
import com.omnitrix.gearup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody User updatedUser) {
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        user.setName(updatedUser.getName());
        user.setMobileNumber(updatedUser.getMobileNumber());
        user.setLocation(updatedUser.getLocation());
        user.setDateOfBirth(updatedUser.getDateOfBirth());
        userRepo.save(user);
        return ResponseEntity.ok("Profile updated");
    }

    @PutMapping("/change-password")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal UserDetails userDetails,
                                            @RequestBody Map<String, String> body) {
        String current = body.get("currentPassword");
        String newPass = body.get("newPassword");

        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(current, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPass));
        userRepo.save(user);
        return ResponseEntity.ok("Password updated successfully");
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userRepo.findById(id).orElseThrow();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
