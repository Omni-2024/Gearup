package com.omnitrix.gearup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "courts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Court {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String sportType; // FOOTBALL, CRICKET, BOTH

    @ManyToOne
    @JoinColumn(name = "venue_id")
    private Futsal venue;

    @OneToMany(mappedBy = "court", cascade = CascadeType.ALL)
    private List<Booking> bookings;
}
