package com.omnitrix.gearup.repository;


import com.omnitrix.gearup.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByCourtIdAndDate(Long courtId, LocalDate date);

    Optional<Booking> findByCourtIdAndDateAndTimeSlot(Long courtId, LocalDate date, String timeSlot);
    List<Booking> findByDate(LocalDate date);

}
