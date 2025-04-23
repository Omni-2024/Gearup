package com.omnitrix.gearup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
    @Table(name = "futsal_venues")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Futsal {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String location;
        private String contact;

        @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL)
        private List<Court> courts;
    }
