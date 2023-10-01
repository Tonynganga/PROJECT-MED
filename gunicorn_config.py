import multiprocessing

bind = "0.0.0.0:80"  # Set the host and port
workers = 3  # Adjust the number of worker processes
timeout = 120
chdir = './appointment-backend/doctors_appointments_app'