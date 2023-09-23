web: gunicorn doctors_appointments_app.wsgi  --chdir  appointment-backend/doctors_appointments_app/
python manage.py collectstatic --noinput
manage.py migrate