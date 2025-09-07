package org.example.appointmentbookingapp.controller;

import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Appointment;
import org.example.appointmentbookingapp.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/register")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
        Doctor created = doctorService.registerDoctor(doctor);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(doctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        Doctor updated = doctorService.updateDoctor(id, doctor);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<List<Doctor>> getDoctorsByClinic(@PathVariable Long clinicId) {
        List<Doctor> doctors = doctorService.getDoctorsByClinic(clinicId);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<Map<String, Object>>> getDoctorAppointments(@PathVariable Long id) {
        List<Appointment> appointments = doctorService.getDoctorAppointments(id);
        List<Map<String, Object>> response = appointments.stream().map(appointment -> {
            Map<String, Object> appointmentData = new HashMap<>();
            appointmentData.put("id", appointment.getId());
            appointmentData.put("date", appointment.getDate());
            appointmentData.put("time", appointment.getTime());
            appointmentData.put("status", appointment.getStatus());
            appointmentData.put("type", appointment.getType());
            appointmentData.put("notes", appointment.getNotes());

            // Add patient info without circular reference
            if (appointment.getPatient() != null) {
                Map<String, Object> patientData = new HashMap<>();
                patientData.put("id", appointment.getPatient().getId());
                patientData.put("name", appointment.getPatient().getName());
                patientData.put("phone", appointment.getPatient().getPhone());
                appointmentData.put("patient", patientData);
            }

            // Add clinic info without circular reference
            if (appointment.getClinic() != null) {
                Map<String, Object> clinicData = new HashMap<>();
                clinicData.put("id", appointment.getClinic().getId());
                clinicData.put("name", appointment.getClinic().getName());
                appointmentData.put("clinic", clinicData);
            }

            return appointmentData;
        }).toList();
        return ResponseEntity.ok(response);
    }
}
