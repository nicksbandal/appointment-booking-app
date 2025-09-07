package org.example.appointmentbookingapp;

import org.example.appointmentbookingapp.model.Clinic;
import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.User;
import org.example.appointmentbookingapp.repository.ClinicRepository;
import org.example.appointmentbookingapp.repository.DoctorRepository;
import org.example.appointmentbookingapp.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner seedData(ClinicRepository clinicRepo, DoctorRepository doctorRepo, PatientRepository patientRepo) {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (clinicRepo.count() == 0) {
                // Create clinics
                Clinic c1 = new Clinic();
                c1.setName("City Health Clinic");
                c1.setAddress("123 Main St");
                c1.setPhone("1234567890");
                clinicRepo.save(c1);

                Clinic c2 = new Clinic();
                c2.setName("Sunrise Medical Center");
                c2.setAddress("456 Oak Ave");
                c2.setPhone("9876543210");
                clinicRepo.save(c2);

                // Create a sample patient
                User patientUser = new User();
                patientUser.setUsername("patient1");
                patientUser.setPassword(encoder.encode("patient123"));
                patientUser.setRole("PATIENT");

                Patient p1 = new Patient();
                p1.setUser(patientUser);
                p1.setName("John Doe");
                p1.setMrd("MRD001");
                p1.setPhone("9998887777");
                patientRepo.save(p1);

                // Create Doctor 1 - Dr. Alice Smith
                User doctorUser1 = new User();
                doctorUser1.setUsername("dr.alice");
                doctorUser1.setPassword(encoder.encode("alice2024"));
                doctorUser1.setRole("DOCTOR");

                Doctor d1 = new Doctor();
                d1.setUser(doctorUser1);
                d1.setName("Dr. Alice Smith");
                d1.setSpecialty("Cardiology");
                d1.setPhone("1112223333");
                d1.setClinic(c1);
                doctorRepo.save(d1);

                // Create Doctor 2 - Dr. Bob Lee
                User doctorUser2 = new User();
                doctorUser2.setUsername("dr.bob");
                doctorUser2.setPassword(encoder.encode("bob2024"));
                doctorUser2.setRole("DOCTOR");

                Doctor d2 = new Doctor();
                d2.setUser(doctorUser2);
                d2.setName("Dr. Bob Lee");
                d2.setSpecialty("Dermatology");
                d2.setPhone("4445556666");
                d2.setClinic(c2);
                doctorRepo.save(d2);
            }
        };
    }
}
