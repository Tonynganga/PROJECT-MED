SHELL:= /bin/bash
start-react-server:
	npm run start
start-django-server:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py runserver
django-makemigrations:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py makemigrations
django-migrate:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py migrate
django-test-accounts:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py test accounts
django-test-reviews:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py test reviews
django-shell:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py dbshell
setup-env-python3:
	python3 -m virtualenv env && source ./env/bin/activate && python3 -m pip install -r requirements.txt && mv env ./appointment-backend
setup-env-python:
	python -m virtualenv env && source ./env/bin/activate && python -m pip install -r requirements.txt && mv env ./appointment-backend
