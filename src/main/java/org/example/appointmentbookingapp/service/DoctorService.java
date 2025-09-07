package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Appointment;
import java.util.List;

public interface DoctorService {
    Doctor registerDoctor(Doctor doctor);
    Doctor getDoctorById(Long id);
    List<Doctor> getAllDoctors();
    Doctor updateDoctor(Long id, Doctor doctor);
    List<Doctor> getDoctorsByClinic(Long clinicId);
    List<Appointment> getDoctorAppointments(Long doctorId);
}
