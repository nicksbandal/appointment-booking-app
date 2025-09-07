-- Data initialization is now handled by DataInitializer.java
-- This file is kept for reference but the actual data seeding is done programmatically

-- Login credentials for testing:
-- Doctor 1: username = "dr.alice", password = "alice2024" (Dr. Alice Smith - Cardiology at City Health Clinic)
-- Doctor 2: username = "dr.bob", password = "bob2024" (Dr. Bob Lee - Dermatology at Sunrise Medical Center)
-- Patient 1: username = "patient1", password = "patient123" (John Doe)

-- Uncomment the lines below if you want to use SQL-based initialization instead of DataInitializer.java
-- But make sure to disable DataInitializer.java first

/*
-- Sample Users with BCrypt encoded passwords
INSERT INTO users (id, username, password, role, enabled) VALUES (1, 'dr.alice', '$2a$10$encoded_password_here', 'DOCTOR', true);
INSERT INTO users (id, username, password, role, enabled) VALUES (2, 'patient1', '$2a$10$encoded_password_here', 'PATIENT', true);
INSERT INTO users (id, username, password, role, enabled) VALUES (3, 'dr.bob', '$2a$10$encoded_password_here', 'DOCTOR', true);

-- Sample Clinics
INSERT INTO clinics (id, name, address, phone) VALUES (1, 'City Health Clinic', '123 Main St', '123-456-7890');
INSERT INTO clinics (id, name, address, phone) VALUES (2, 'Sunrise Medical Center', '456 Oak Ave', '987-654-3210');

-- Sample Doctors
INSERT INTO doctors (id, user_id, name, specialty, phone, email, license_number, clinic_id) VALUES (1, 1, 'Dr. Alice Smith', 'Cardiology', '111-222-3333', 'alice@clinic.com', 'LIC123', 1);
INSERT INTO doctors (id, user_id, name, specialty, phone, email, license_number, clinic_id) VALUES (2, 3, 'Dr. Bob Lee', 'Dermatology', '444-555-6666', 'bob@clinic.com', 'LIC456', 2);

-- Sample Patients
INSERT INTO patients (id, user_id, name, mrd, phone, email, address, date_of_birth) VALUES (1, 2, 'John Doe', 'MRD001', '222-333-4444', 'john@patient.com', '789 Oak St', '1990-01-01');
*/
