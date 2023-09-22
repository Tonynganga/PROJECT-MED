web: gunicorn doctors_appointments_app.wsgi  -b 0.0.0.0:8000  --chdir appointment-backend/doctors_appointments_ap
python manage.py collectstatic --noinput
manage.py migrate