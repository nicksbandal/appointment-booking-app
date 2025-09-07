import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.2:8080', // Updated to match the network IP
  withCredentials: false, // Changed to false to match backend CORS config
});

// Patient APIs
export const registerPatient = (data) => api.post('/api/patients/register', data);
export const getPatient = (id) => api.get(`/api/patients/${id}`);
export const updatePatient = (id, data) => api.put(`/api/patients/${id}`, data);
export const getPatientAppointments = (id) => api.get(`/api/patients/${id}/appointments`);

// Doctor APIs
export const registerDoctor = (data) => api.post('/api/doctors/register', data);
export const getDoctor = (id) => api.get(`/api/doctors/${id}`);
export const updateDoctor = (id, data) => api.put(`/api/doctors/${id}`, data);
export const getDoctorsByClinic = (clinicId) => api.get(`/api/doctors/clinic/${clinicId}`);
export const getDoctorAppointments = (id) => api.get(`/api/doctors/${id}/appointments`);

// Clinic APIs
export const getClinics = () => api.get('/api/clinics');
export const getClinicDoctors = (clinicId) => api.get(`/api/clinics/${clinicId}/doctors`);

// Appointment APIs
export const getAvailableSlots = (clinicId, date) => api.get(`/appointments/availability/${clinicId}?date=${date}`);
export const bookAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (appointmentId, data) => api.put(`/appointments/${appointmentId}`, data);
export const cancelAppointment = (appointmentId) => api.delete(`/appointments/${appointmentId}`);
export const getAppointmentsForPatient = (patientId) => api.get(`/appointments/patient/${patientId}`);
export const getAppointmentsForDoctor = (doctorId) => api.get(`/appointments/doctor/${doctorId}`);

// Feedback APIs
export const submitFeedback = (data) => api.post('/api/feedback', data);
export const getFeedbackForDoctor = (doctorId) => api.get(`/api/feedback/doctor/${doctorId}`);
export const getFeedbackForPatient = (patientId) => api.get(`/api/feedback/patient/${patientId}`);

// Auth APIs (if needed)
// export const login = (data) => api.post('/api/auth/login', data);
// export const logout = () => api.post('/api/auth/logout');

export default api;
