package org.example.appointmentbookingapp.repository;

import org.example.appointmentbookingapp.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
}

