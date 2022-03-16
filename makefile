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
django-shell:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py shell
