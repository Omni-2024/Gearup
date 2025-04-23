package com.omnitrix.gearup.controller;


import com.omnitrix.gearup.model.*;
import com.omnitrix.gearup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/futsal")
public class FutsalController {

    @Autowired private FutsalRepository venueRepo;
    @Autowired private CourtRepository courtRepo;
    @Autowired private BookingRepository bookingRepo;
    @Autowired private PaymentRepository paymentRepo;
    @Autowired private UserRepository userRepo;

    // ==== Venues ====
    @GetMapping("/venues")
    public List<Futsal> getAllVenues() {
        return venueRepo.findAll();
    }

    @PostMapping("/venues")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addVenue(@RequestBody Futsal venue) {
        return ResponseEntity.ok(venueRepo.save(venue));
    }

    // ==== Courts ====
    @GetMapping("/venues/{venueId}/courts")
    public List<Court> getCourtsByVenue(@PathVariable Long venueId) {
        return courtRepo.findByVenueId(venueId);
    }

    @PostMapping("/venues/{venueId}/courts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addCourt(@PathVariable Long venueId, @RequestBody Court court) {
        Futsal venue = venueRepo.findById(venueId).orElseThrow();
        court.setVenue(venue);
        return ResponseEntity.ok(courtRepo.save(court));
    }


    // ==== Payments ====
    @PostMapping("/payment/{bookingId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> makePayment(@PathVariable Long bookingId, @RequestBody Payment paymentDetails) {
        Booking booking = bookingRepo.findById(bookingId).orElseThrow();

        if (booking.getPayment() != null && booking.getPayment().isPaid()) {
            return ResponseEntity.badRequest().body("Already paid");
        }

        paymentDetails.setBooking(booking);
        paymentDetails.setPaid(true);
        paymentDetails.setPaymentDate(LocalDateTime.now());

        paymentRepo.save(paymentDetails);
        return ResponseEntity.ok("Payment successful");
    }
}

