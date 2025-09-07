package org.example.appointmentbookingapp.repository;

import org.example.appointmentbookingapp.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByClinicIdAndDate(Long clinicId, LocalDate date);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    boolean existsByDoctorIdAndDateAndTime(Long doctorId, LocalDate date, java.time.LocalTime time);
}
