package org.example.appointmentbookingapp.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Generate hashes for doctor passwords
        System.out.println("doctor1 password hash: " + encoder.encode("doctor1pass"));
        System.out.println("doctor2 password hash: " + encoder.encode("doctor2pass"));
        System.out.println("patient1 password hash: " + encoder.encode("patient1pass"));
        System.out.println("patient2 password hash: " + encoder.encode("patient2pass"));
    }
}
