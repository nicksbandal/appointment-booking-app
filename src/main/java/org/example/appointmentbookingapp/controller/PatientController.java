package org.example.appointmentbookingapp.controller;

import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.Appointment;
import org.example.appointmentbookingapp.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
        Patient created = patientService.registerPatient(patient);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/mrd/{mrd}")
    public ResponseEntity<Patient> getPatientByMRD(@PathVariable String mrd) {
        Patient patient = patientService.getPatientByMRD(mrd);
        if (patient == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id);
        if (patient == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(patient);
    }

    @PutMapping("/{id:\\d+}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        Patient updated = patientService.updatePatient(id, patient);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id:\\d+}/appointments")
    public ResponseEntity<List<Map<String, Object>>> getPatientAppointments(@PathVariable Long id) {
        List<Appointment> appointments = patientService.getPatientAppointments(id);
        List<Map<String, Object>> response = appointments.stream().map(appointment -> {
            Map<String, Object> appointmentData = new HashMap<>();
            appointmentData.put("id", appointment.getId());
            appointmentData.put("date", appointment.getDate());
            appointmentData.put("time", appointment.getTime());
            appointmentData.put("status", appointment.getStatus());
            appointmentData.put("type", appointment.getType());
            appointmentData.put("notes", appointment.getNotes());

            // Add doctor info without circular reference
            if (appointment.getDoctor() != null) {
                Map<String, Object> doctorData = new HashMap<>();
                doctorData.put("id", appointment.getDoctor().getId());
                doctorData.put("name", appointment.getDoctor().getName());
                doctorData.put("specialty", appointment.getDoctor().getSpecialty());
                appointmentData.put("doctor", doctorData);
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
