package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.User;
import org.example.appointmentbookingapp.repository.DoctorRepository;
import org.example.appointmentbookingapp.repository.PatientRepository;
import org.example.appointmentbookingapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Patient registerPatient(Patient patient) {
        User user = patient.getUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("PATIENT");
        return patientRepository.save(patient);
    }

    public Doctor registerDoctor(Doctor doctor) {
        User user = doctor.getUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("DOCTOR");
        return doctorRepository.save(doctor);
    }

    public Optional<User> login(String username, String password) {
        // Add null/empty checks for extra security
        if (username == null || username.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            return Optional.empty();
        }

        Optional<User> userOpt = userRepository.findByUsername(username.trim());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Ensure user is enabled and password matches
            if (user.isEnabled() && passwordEncoder.matches(password, user.getPassword())) {
                return userOpt;
            }
        }
        return Optional.empty();
    }

    // New method to get complete doctor profile
    public Optional<Doctor> getDoctorByUser(User user) {
        return doctorRepository.findByUser(user);
    }

    // New method to get complete patient profile
    public Optional<Patient> getPatientByUser(User user) {
        return patientRepository.findByUser(user);
    }

    // Method to get complete login response with profile data
    public Object getCompleteProfile(User user) {
        if ("DOCTOR".equals(user.getRole())) {
            Optional<Doctor> doctorOpt = getDoctorByUser(user);
            return doctorOpt.orElse(null);
        } else if ("PATIENT".equals(user.getRole())) {
            Optional<Patient> patientOpt = getPatientByUser(user);
            return patientOpt.orElse(null);
        }
        return user;
    }
}
