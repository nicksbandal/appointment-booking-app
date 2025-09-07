# Login Credentials

The application has been configured with the following login credentials stored in the database:

## Doctor Login Credentials

### Doctor 1 - Dr. Alice Smith (Cardiology)
- **Username:** `dr.alice`
- **Password:** `alice2024`
- **Clinic:** City Health Clinic
- **Specialty:** Cardiology

### Doctor 2 - Dr. Bob Lee (Dermatology)
- **Username:** `dr.bob`
- **Password:** `bob2024`
- **Clinic:** Sunrise Medical Center
- **Specialty:** Dermatology

## Patient Login Credentials

### Patient - John Doe
- **Username:** `patient1`
- **Password:** `patient123`
- **MRD:** MRD001

## How Login Works

1. All passwords are securely stored using BCrypt encryption
2. The login endpoint is: `POST /auth/login`
3. Login request format:
   ```json
   {
     "username": "dr.alice",
     "password": "alice2024"
   }
   ```
4. The response includes user information and role (DOCTOR or PATIENT)
5. Data is automatically initialized when the application starts via `DataInitializer.java`

## Testing the Login

You can test the login functionality using any HTTP client (Postman, curl, etc.) or through the frontend application.
