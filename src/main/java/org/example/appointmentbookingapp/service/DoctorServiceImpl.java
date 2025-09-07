package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Appointment;
import org.example.appointmentbookingapp.repository.DoctorRepository;
import org.example.appointmentbookingapp.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Optional<Doctor> existing = doctorRepository.findById(id);
        if (existing.isPresent()) {
            Doctor d = existing.get();
            d.setName(doctor.getName());
            d.setSpecialty(doctor.getSpecialty());
            d.setPhone(doctor.getPhone());
            d.setEmail(doctor.getEmail());
            d.setLicenseNumber(doctor.getLicenseNumber());
            return doctorRepository.save(d);
        }
        return null;
    }

    @Override
    public List<Doctor> getDoctorsByClinic(Long clinicId) {
        return doctorRepository.findByClinicId(clinicId);
    }

    @Override
    public List<Appointment> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}

