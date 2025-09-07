package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Feedback;
import java.util.List;

public interface FeedbackService {
    Feedback submitFeedback(Feedback feedback);
    List<Feedback> getFeedbackForDoctor(Long doctorId);
    List<Feedback> getFeedbackForPatient(Long patientId);
}

