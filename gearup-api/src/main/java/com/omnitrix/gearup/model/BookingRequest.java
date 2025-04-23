package com.omnitrix.gearup.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long courtId;
    private String timeSlot;
    private LocalDate date;
    private boolean permanent;
}

