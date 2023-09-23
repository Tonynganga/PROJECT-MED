web: gunicorn doctors_appointments_app.wsgi  -b 0.0.0.0:80  --chdir  appointment-backend/doctors_appointments_app/
python manage.py collectstatic --noinput
manage.py migrate