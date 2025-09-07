package org.example.appointmentbookingapp.controller;

import org.example.appointmentbookingapp.model.Feedback;
import org.example.appointmentbookingapp.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback created = feedbackService.submitFeedback(feedback);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Feedback>> getFeedbackForDoctor(@PathVariable Long doctorId) {
        List<Feedback> feedbackList = feedbackService.getFeedbackForDoctor(doctorId);
        return ResponseEntity.ok(feedbackList);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Feedback>> getFeedbackForPatient(@PathVariable Long patientId) {
        List<Feedback> feedbackList = feedbackService.getFeedbackForPatient(patientId);
        return ResponseEntity.ok(feedbackList);
    }
}
