package com.omnitrix.gearup.controller;


import com.omnitrix.gearup.model.*;
import com.omnitrix.gearup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/booking")
@EnableScheduling
public class BookingController {

    @Autowired private BookingRepository bookingRepo;
    @Autowired private CourtRepository courtRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private PaymentRepository paymentRepo;

    private List<String> generate24HourSlots() {
        List<String> slots = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            String from = String.format("%02d:00", i);
            String to = String.format("%02d:00", (i + 1) % 24);
            slots.add(from + "-" + to);
        }
        return slots;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public List<Booking> myBookings(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        return bookingRepo.findByUserId(user.getId());
    }

    @GetMapping("/courts/{courtId}/slots")
    public List<Map<String, Object>> getAvailableSlots(@PathVariable Long courtId, @RequestParam LocalDate date) {
        List<String> allSlots = generate24HourSlots();
        List<Booking> booked = bookingRepo.findByCourtIdAndDate(courtId, date);
        Set<String> bookedSlots = booked.stream().map(Booking::getTimeSlot).collect(Collectors.toSet());

        List<Map<String, Object>> result = new ArrayList<>();
        for (String slot : allSlots) {
            Map<String, Object> map = new HashMap<>();
            map.put("timeSlot", slot);
            map.put("available", !bookedSlots.contains(slot));
            result.add(map);
        }
        return result;
    }

    @PostMapping("/book")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> bookCourt(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Booking booking) {
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();

        if (!booking.isPermanent()) {
            // One-time booking
            Optional<Booking> existing = bookingRepo.findByCourtIdAndDateAndTimeSlot(
                    booking.getCourt().getId(), booking.getDate(), booking.getTimeSlot());

            if (existing.isPresent()) {
                return ResponseEntity.badRequest().body("Slot already booked");
            }

            booking.setUser(user);
            booking.setStatus("CONFIRMED");
            booking.setWeekNumber(1);
            bookingRepo.save(booking);
            return ResponseEntity.ok("One-time booking successful");
        } else {
            // Permanent booking: 3 weekly sessions
            LocalDate startDate = booking.getDate();
            String timeSlot = booking.getTimeSlot();
            Long courtId = booking.getCourt().getId();
            List<Booking> bookings = new ArrayList<>();

            for (int i = 0; i < 3; i++) {
                LocalDate date = startDate.plusWeeks(i);
                boolean exists = bookingRepo.findByCourtIdAndDateAndTimeSlot(courtId, date, timeSlot).isPresent();
                if (exists) {
                    return ResponseEntity.badRequest().body("Slot already booked on week " + (i + 1));
                }
                Booking b = new Booking();
                b.setUser(user);
                b.setCourt(booking.getCourt());
                b.setDate(date);
                b.setTimeSlot(timeSlot);
                b.setPermanent(true);
                b.setWeekNumber(i + 1);
                b.setStatus("CONFIRMED");
                b.setPaymentReceived(false);
                bookings.add(b);
            }

            bookingRepo.saveAll(bookings);
            return ResponseEntity.ok("Permanent booking for 3 weeks confirmed");
        }
    }

    // === Scheduler: Remind 3 days before ===
    @Scheduled(cron = "0 0 9 * * *") // Every day at 9:00 AM
    public void sendRemindersForPermanentBookings() {
        LocalDate reminderDate = LocalDate.now().plusDays(3);
        List<Booking> upcoming = bookingRepo.findByDate(reminderDate)
                .stream()
                .filter(Booking::isPermanent)
                .filter(b -> !b.isPaymentReceived())
                .toList();

        for (Booking b : upcoming) {
            System.out.println("Reminder: Please pay for your permanent booking on " + b.getDate() + " " + b.getTimeSlot());
        }
    }


    @PostMapping("/prepare")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> prepareBooking(@AuthenticationPrincipal UserDetails userDetails,
                                            @RequestBody BookingRequest request) {
        // Do availability check
        Court court = courtRepo.findById(request.getCourtId()).orElseThrow();
        List<Booking> conflicts = bookingRepo.findByCourtIdAndDateAndTimeSlot(
                        court.getId(), request.getDate(), request.getTimeSlot()).stream()
                .filter(b -> !b.isCancelled())
                .toList();

        if (!conflicts.isEmpty()) {
            return ResponseEntity.badRequest().body("Time slot already booked");
        }

        // Create a temporary booking or session reference
        String reference = UUID.randomUUID().toString();

        // Send reference + info to frontend for payment
        return ResponseEntity.ok(Map.of(
                "paymentReference", reference,
                "amount", 1000,  // you can calculate dynamically
                "description", "Booking for " + request.getDate() + " " + request.getTimeSlot()
        ));
    }





    // === Scheduler: Cancel if not paid 2 days before ===
    @Scheduled(cron = "0 0 10 * * *") // Every day at 10:00 AM
    public void cancelUnpaidPermanentBookings() {
        LocalDate cancelDate = LocalDate.now().plusDays(2);
        List<Booking> toCancel = bookingRepo.findByDate(cancelDate)
                .stream()
                .filter(Booking::isPermanent)
                .filter(b -> !b.isPaymentReceived())
                .toList();

        for (Booking b : toCancel) {
            List<Booking> all = bookingRepo.findByUserId(b.getUser().getId())
                    .stream()
                    .filter(Booking::isPermanent)
                    .filter(x -> !x.isPaymentReceived())
                    .toList();
            bookingRepo.deleteAll(all);
            System.out.println("Cancelled all unpaid permanent bookings for user " + b.getUser().getEmail());
        }
    }
}
