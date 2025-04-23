package com.omnitrix.gearup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "court_id")
    private Court court;

    private LocalDate date;
    private String timeSlot; // e.g., "18:00-19:00"

    private String status = "PENDING"; // or CONFIRMED, CANCELLED

    private boolean isPermanent = false;

    private int weekNumber = 1; // 1 = first week of permanent set

    private boolean paymentReceived = false;

    private boolean isCancelled = false;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;
}



