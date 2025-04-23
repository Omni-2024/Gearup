package com.omnitrix.gearup.repository;

import com.omnitrix.gearup.model.Futsal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FutsalRepository extends JpaRepository<Futsal, Long> {
}

