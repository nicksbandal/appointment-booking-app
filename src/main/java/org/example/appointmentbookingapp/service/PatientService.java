package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Patient;
import org.example.appointmentbookingapp.model.Appointment;
import java.util.List;

public interface PatientService {
    Patient registerPatient(Patient patient);
    Patient getPatientById(Long id);
    Patient getPatientByMRD(String mrdNumber);
    Patient getPatientByPhone(String phoneNumber);
    List<Patient> getAllPatients();
    Patient updatePatient(Long id, Patient patient);
    List<Appointment> getPatientAppointments(Long patientId);
}
