package org.example.appointmentbookingapp.repository;

import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByMrd(String mrd);
    Optional<Patient> findByPhone(String phone);
    Optional<Patient> findByUser(User user);
}
