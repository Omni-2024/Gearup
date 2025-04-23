package com.omnitrix.gearup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role = "USER";

    private String refreshToken;

    private LocalDate dateOfBirth; // yyyy-MM-dd format

    private String mobileNumber;

    private String location;

    private String timeZone = "Asia/Colombo";
}