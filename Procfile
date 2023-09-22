web: gunicorn doctors_appointments_app.wsgi:application --log-file -
python manage.py collectstatic --noinput
manage.py migrate