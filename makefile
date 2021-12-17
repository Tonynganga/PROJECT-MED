
start-react-server:
	npm run start
start-django-server:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/appointments/manage.py runserver
django-makemigrations:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/appointments/manage.py makemigrations
django-migrate:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/appointments/manage.py migrate
