package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.Appointment;
import org.example.appointmentbookingapp.repository.PatientRepository;
import org.example.appointmentbookingapp.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public Patient getPatientByMRD(String mrdNumber) {
        return patientRepository.findByMrd(mrdNumber).orElse(null);
    }

    @Override
    public Patient getPatientByPhone(String phoneNumber) {
        return patientRepository.findByPhone(phoneNumber).orElse(null);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        Optional<Patient> existing = patientRepository.findById(id);
        if (existing.isPresent()) {
            Patient p = existing.get();
            p.setName(patient.getName());
            p.setPhone(patient.getPhone());
            p.setEmail(patient.getEmail());
            p.setAddress(patient.getAddress());
            p.setDateOfBirth(patient.getDateOfBirth());
            return patientRepository.save(p);
        }
        return null;
    }

    @Override
    public List<Appointment> getPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
}
