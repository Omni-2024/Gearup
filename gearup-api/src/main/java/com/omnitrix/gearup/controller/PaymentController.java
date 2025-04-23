package com.omnitrix.gearup.controller;
// Package: com.omnitrix.gearup.controller

import com.omnitrix.gearup.model.*;
import com.omnitrix.gearup.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
@EnableScheduling
public class PaymentController {

    @Autowired private BookingRepository bookingRepo;
    @Autowired private CourtRepository courtRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private PaymentRepository paymentRepo;

    private static final String MERCHANT_ID = "1211149"; // Sandbox merchant_id
    private static final String PAYHERE_SANDBOX_URL = "https://sandbox.payhere.lk/pay/checkout";
    private static final String RETURN_URL = "http://localhost:8080/payment-success";
    private static final String CANCEL_URL = "http://localhost:8080/payment-cancel";
    private static final String NOTIFY_URL = "http://yourdomain.com/api/payment/notify";

    @PostMapping("/initiate")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> initiatePayment(@AuthenticationPrincipal UserDetails userDetails,
                                             @RequestBody BookingRequest request) {
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        Court court = courtRepo.findById(request.getCourtId()).orElseThrow();

        String orderId = UUID.randomUUID().toString();

        String url = PAYHERE_SANDBOX_URL + "?merchant_id=" + MERCHANT_ID +
                "&return_url=" + URLEncoder.encode(RETURN_URL, StandardCharsets.UTF_8) +
                "&cancel_url=" + URLEncoder.encode(CANCEL_URL, StandardCharsets.UTF_8) +
                "&notify_url=" + URLEncoder.encode(NOTIFY_URL, StandardCharsets.UTF_8) +
                "&order_id=" + orderId +
                "&items=" + URLEncoder.encode("Court Booking", StandardCharsets.UTF_8) +
                "&currency=LKR" +
                "&amount=1000" + // Static for now
                "&first_name=" + URLEncoder.encode(user.getName(), StandardCharsets.UTF_8) +
                "&email=" + user.getEmail();

        Payment temp = new Payment();
        temp.setPaid(false);
        temp.setPaymentDate(LocalDateTime.now());
        paymentRepo.save(temp);

        return ResponseEntity.ok(Map.of(
                "redirect_url", url,
                "payment_reference", orderId
        ));
    }

    @PostMapping("/notify")
    public ResponseEntity<?> handlePayHereNotification(HttpServletRequest request) {
        String orderId = request.getParameter("order_id");
        String email = request.getParameter("email");
        String status = request.getParameter("status_code");
        String courtIdStr = request.getParameter("custom_1");
        String dateStr = request.getParameter("custom_2");
        String timeSlot = request.getParameter("custom_3");
        String isPermanentStr = request.getParameter("custom_4");

        if (!"2".equals(status)) {
            return ResponseEntity.badRequest().body("Payment not successful");
        }

        Long courtId = Long.valueOf(courtIdStr);
        LocalDate date = LocalDate.parse(dateStr);
        boolean isPermanent = Boolean.parseBoolean(isPermanentStr);

        User user = userRepo.findByEmail(email).orElseThrow();
        Court court = courtRepo.findById(courtId).orElseThrow();

        if (!isPermanent) {
            Booking booking = new Booking();
            booking.setUser(user);
            booking.setCourt(court);
            booking.setDate(date);
            booking.setTimeSlot(timeSlot);
            booking.setStatus("CONFIRMED");
            booking.setWeekNumber(1);
            booking.setPermanent(false);
            booking.setPaymentReceived(true);
            bookingRepo.save(booking);
        } else {
            for (int i = 0; i < 3; i++) {
                LocalDate newDate = date.plusWeeks(i);
                Booking booking = new Booking();
                booking.setUser(user);
                booking.setCourt(court);
                booking.setDate(newDate);
                booking.setTimeSlot(timeSlot);
                booking.setStatus("CONFIRMED");
                booking.setPermanent(true);
                booking.setWeekNumber(i + 1);
                booking.setPaymentReceived(i == 0); // only week 1 is paid initially
                bookingRepo.save(booking);
            }
        }

        return ResponseEntity.ok("Booking confirmed");
    }

//    @Scheduled(cron = "0 0 9 * * *")
//    public void sendRemindersForPermanentBookings() {
//        LocalDate reminderDate = LocalDate.now().plusDays(3);
//        List<Booking> upcoming = bookingRepo.findByDate(reminderDate)
//                .stream()
//                .filter(Booking::isPermanent)
//                .filter(b -> !b.isPaymentReceived())
//                .toList();
//
//        for (Booking b : upcoming) {
//            System.out.println("Reminder: Payment due for " + b.getDate() + " " + b.getTimeSlot());
//        }
//    }
//
//    @Scheduled(cron = "0 0 10 * * *")
//    public void cancelUnpaidPermanentBookings() {
//        LocalDate cancelDate = LocalDate.now().plusDays(2);
//        List<Booking> toCancel = bookingRepo.findByDate(cancelDate)
//                .stream()
//                .filter(Booking::isPermanent)
//                .filter(b -> !b.isPaymentReceived())
//                .toList();
//
//        for (Booking b : toCancel) {
//            List<Booking> all = bookingRepo.findByUserId(b.getUser().getId())
//                    .stream()
//                    .filter(Booking::isPermanent)
//                    .filter(x -> !x.isPaymentReceived())
//                    .toList();
//            bookingRepo.deleteAll(all);
//            System.out.println("Canceled all permanent bookings for user " + b.getUser().getEmail());
//        }
//    }

    // DTO for frontend to send booking details for payment
    public static class BookingRequest {
        private Long courtId;
        private LocalDate date;
        private String timeSlot;
        private boolean permanent;

        // Getters & setters
        public Long getCourtId() { return courtId; }
        public void setCourtId(Long courtId) { this.courtId = courtId; }
        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }
        public String getTimeSlot() { return timeSlot; }
        public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
        public boolean isPermanent() { return permanent; }
        public void setPermanent(boolean permanent) { this.permanent = permanent; }
    }
}

