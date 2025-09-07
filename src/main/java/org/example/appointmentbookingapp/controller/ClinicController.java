package org.example.appointmentbookingapp.controller;

import org.example.appointmentbookingapp.model.Clinic;
import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.repository.ClinicRepository;
import org.example.appointmentbookingapp.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clinics")
@CrossOrigin
public class ClinicController {
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllClinics() {
        List<Clinic> clinics = clinicRepository.findAll();
        List<Map<String, Object>> response = clinics.stream().map(clinic -> {
            Map<String, Object> clinicData = new HashMap<>();
            clinicData.put("id", clinic.getId());
            clinicData.put("name", clinic.getName());
            clinicData.put("address", clinic.getAddress());
            clinicData.put("phone", clinic.getPhone());
            return clinicData;
        }).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{clinicId}/doctors")
    public ResponseEntity<List<Doctor>> getDoctorsByClinic(@PathVariable Long clinicId) {
        List<Doctor> doctors = doctorRepository.findAll()
            .stream().filter(d -> d.getClinic() != null && d.getClinic().getId().equals(clinicId)).toList();
        return ResponseEntity.ok(doctors);
    }
}
