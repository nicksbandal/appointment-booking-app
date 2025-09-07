package org.example.appointmentbookingapp.controller;

import org.example.appointmentbookingapp.model.Appointment;
import org.example.appointmentbookingapp.model.Clinic;
import org.example.appointmentbookingapp.model.Doctor;
import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.repository.AppointmentRepository;
import org.example.appointmentbookingapp.repository.ClinicRepository;
import org.example.appointmentbookingapp.repository.DoctorRepository;
import org.example.appointmentbookingapp.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/appointments")
@CrossOrigin
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/availability/{clinicId}")
    public ResponseEntity<?> getAvailableSlots(@PathVariable Long clinicId, @RequestParam String date) {
        Optional<Clinic> clinicOpt = clinicRepository.findById(clinicId);
        if (clinicOpt.isEmpty()) return ResponseEntity.notFound().build();
        LocalDate localDate = LocalDate.parse(date);
        List<Appointment> appointments = appointmentRepository.findByClinicIdAndDate(clinicId, localDate);
        Set<LocalTime> bookedSlots = new HashSet<>();
        for (Appointment a : appointments) bookedSlots.add(a.getTime());
        List<String> availableSlots = new ArrayList<>();
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(17, 0);
        while (start.isBefore(end)) {
            if (!bookedSlots.contains(start)) availableSlots.add(start.toString());
            start = start.plusMinutes(30);
        }
        return ResponseEntity.ok(availableSlots);
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> req) {
        Long patientId = Long.valueOf(req.get("patientId").toString());
        Long doctorId = Long.valueOf(req.get("doctorId").toString());
        Long clinicId = Long.valueOf(req.get("clinicId").toString());
        LocalDate date = LocalDate.parse(req.get("date").toString());
        LocalTime time = LocalTime.parse(req.get("time").toString());
        String type = req.get("type").toString();
        String status = "PENDING";
        // Business rules enforcement
        if (time.getMinute() % 30 != 0) return ResponseEntity.badRequest().body("Appointments must be in 30-minute intervals");
        if (date.isBefore(LocalDate.now()) || date.isAfter(LocalDate.now().plusDays(90))) return ResponseEntity.badRequest().body("Booking allowed up to 90 days in advance");
        if (date.isEqual(LocalDate.now()) && time.isBefore(LocalTime.now().plusHours(2))) return ResponseEntity.badRequest().body("Same-day booking must be at least 2 hours in advance");
        // Double-booking prevention
        if (appointmentRepository.existsByDoctorIdAndDateAndTime(doctorId, date, time)) return ResponseEntity.badRequest().body("Slot already booked");
        // Clinic/doctor capacity check (optional, can be added)
        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
        Optional<Clinic> clinicOpt = clinicRepository.findById(clinicId);
        if (patientOpt.isEmpty() || doctorOpt.isEmpty() || clinicOpt.isEmpty()) return ResponseEntity.badRequest().body("Invalid IDs");
        Appointment appt = new Appointment();
        appt.setPatient(patientOpt.get());
        appt.setDoctor(doctorOpt.get());
        appt.setClinic(clinicOpt.get());
        appt.setDate(date);
        appt.setTime(time);
        appt.setType(type);
        appt.setStatus(status);
        appt.setModificationCount(0); // Track modifications
        appointmentRepository.save(appt);
        // TODO: Send confirmation notification
        return ResponseEntity.ok(appt);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Map<String, Object>>> getAppointmentsForPatient(@PathVariable Long patientId) {
        List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);
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

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Map<String, Object>>> getAppointmentsForDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctorId);
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

    @PutMapping("/{appointmentId}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long appointmentId, @RequestBody Map<String, Object> req) {
        Optional<Appointment> apptOpt = appointmentRepository.findById(appointmentId);
        if (apptOpt.isEmpty()) return ResponseEntity.notFound().build();
        Appointment appt = apptOpt.get();
        // Modification limit
        if (appt.getModificationCount() != null && appt.getModificationCount() >= 2) return ResponseEntity.badRequest().body("Appointment can only be modified 2 times");
        if (req.containsKey("date")) {
            LocalDate newDate = LocalDate.parse(req.get("date").toString());
            if (newDate.isBefore(LocalDate.now()) || newDate.isAfter(LocalDate.now().plusDays(90))) return ResponseEntity.badRequest().body("Booking allowed up to 90 days in advance");
            appt.setDate(newDate);
        }
        if (req.containsKey("time")) {
            LocalTime newTime = LocalTime.parse(req.get("time").toString());
            if (newTime.getMinute() % 30 != 0) return ResponseEntity.badRequest().body("Appointments must be in 30-minute intervals");
            if (appt.getDate().isEqual(LocalDate.now()) && newTime.isBefore(LocalTime.now().plusHours(2))) return ResponseEntity.badRequest().body("Same-day booking must be at least 2 hours in advance");
            if (appointmentRepository.existsByDoctorIdAndDateAndTime(appt.getDoctor().getId(), appt.getDate(), newTime)) return ResponseEntity.badRequest().body("Slot already booked");
            appt.setTime(newTime);
        }
        if (req.containsKey("status")) appt.setStatus(req.get("status").toString());
        if (req.containsKey("notes")) appt.setNotes(req.get("notes").toString());
        appt.setModificationCount(appt.getModificationCount() == null ? 1 : appt.getModificationCount() + 1);
        appointmentRepository.save(appt);
        // TODO: Send update notification
        return ResponseEntity.ok(appt);
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long appointmentId) {
        Optional<Appointment> apptOpt = appointmentRepository.findById(appointmentId);
        if (apptOpt.isEmpty()) return ResponseEntity.notFound().build();
        Appointment appt = apptOpt.get();
        // Cancellation policy: 24-hour notice
        if (appt.getDate().isBefore(LocalDate.now().plusDays(1)) ||
            (appt.getDate().isEqual(LocalDate.now().plusDays(1)) && appt.getTime().isBefore(LocalTime.now()))) {
            return ResponseEntity.badRequest().body("Cancellations require 24-hour notice");
        }
        appointmentRepository.deleteById(appointmentId);
        // TODO: Send cancellation notification
        return ResponseEntity.ok().build();
    }
}
