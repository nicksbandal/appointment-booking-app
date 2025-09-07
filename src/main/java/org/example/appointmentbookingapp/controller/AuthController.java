package org.example.appointmentbookingapp.controller;

import org.example.appointmentbookingapp.dto.PatientRegisterRequest;
import org.example.appointmentbookingapp.dto.DoctorRegisterRequest;
import org.example.appointmentbookingapp.dto.LoginRequest;
import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.User;
import org.example.appointmentbookingapp.model.Clinic;
import org.example.appointmentbookingapp.repository.ClinicRepository;
import org.example.appointmentbookingapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private ClinicRepository clinicRepository;

    @PostMapping("/register/patient")
    public ResponseEntity<?> registerPatient(@RequestBody PatientRegisterRequest req) {
        User user = new User();
        user.setUsername(req.username);
        user.setPassword(req.password);

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setName(req.name);
        patient.setMrd(req.mrd);
        patient.setPhone(req.phone);

        Patient saved = authService.registerPatient(patient);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<?> registerDoctor(@RequestBody DoctorRegisterRequest req) {
        User user = new User();
        user.setUsername(req.username);
        user.setPassword(req.password);

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setName(req.name);
        doctor.setSpecialty(req.specialty);
        doctor.setPhone(req.phone);

        if (req.clinicId != null) {
            Optional<Clinic> clinicOpt = clinicRepository.findById(req.clinicId);
            clinicOpt.ifPresent(doctor::setClinic);
        }
        Doctor saved = authService.registerDoctor(doctor);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        // Add logging for debugging
        System.out.println("Login attempt for username: " + req.username);

        Optional<User> userOpt = authService.login(req.username, req.password);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("User found: " + user.getUsername() + ", Role: " + user.getRole());

            // Return complete profile data instead of just basic user info
            Object completeProfile = authService.getCompleteProfile(user);
            if (completeProfile != null) {
                System.out.println("Complete profile retrieved successfully");
                return ResponseEntity.ok(completeProfile);
            } else {
                System.out.println("Failed to retrieve complete profile");
                return ResponseEntity.status(500).body("Profile data not found");
            }
        }
        System.out.println("Authentication failed for username: " + req.username);
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // Debug endpoint to check what users exist in the database
    @GetMapping("/debug/users")
    public ResponseEntity<?> debugUsers() {
        return ResponseEntity.ok("Debug endpoint - check server logs for user information");
    }
}
