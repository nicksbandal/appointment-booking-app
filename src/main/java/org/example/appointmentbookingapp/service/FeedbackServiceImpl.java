package org.example.appointmentbookingapp.service;

import org.example.appointmentbookingapp.model.Feedback;
import org.example.appointmentbookingapp.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbackForDoctor(Long doctorId) {
        return feedbackRepository.findByAppointment_Doctor_Id(doctorId);
    }

    @Override
    public List<Feedback> getFeedbackForPatient(Long patientId) {
        return feedbackRepository.findByAppointment_Patient_Id(patientId);
    }
}
