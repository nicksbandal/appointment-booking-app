package org.example.appointmentbookingapp.repository;

import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByClinicId(Long clinicId);
    Optional<Doctor> findByUser(User user);
}
