package org.example.appointmentbookingapp.repository;

import org.example.appointmentbookingapp.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByAppointmentId(Long appointmentId);
    List<Feedback> findByAppointment_Doctor_Id(Long doctorId);
    List<Feedback> findByAppointment_Patient_Id(Long patientId);
}
