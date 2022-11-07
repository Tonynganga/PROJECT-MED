SHELL:= /bin/bash
start-react-server:
	yarn run start
start-django-server:
	python3 appointment-backend/doctors_appointments_app/manage.py runserver
python-install-dep:
	pip3 install -r requirements.txt
start-django-server-network:
	python3 appointment-backend/doctors_appointments_app/manage.py runserver 192.168.100.56:8000
django-makemigrations:
	python3 appointment-backend/doctors_appointments_app/manage.py makemigrations
django-migrate:
	python3 appointment-backend/doctors_appointments_app/manage.py migrate
django-test-accounts:
	python3 appointment-backend/doctors_appointments_app/manage.py test accounts
django-test-blog:
	python3 appointment-backend/doctors_appointments_app/manage.py test blog
django-test-reviews:
	python3 appointment-backend/doctors_appointments_app/manage.py test reviews
django-shell:
	python3 appointment-backend/doctors_appointments_app/manage.py shell
django-dbshell:
	python3 appointment-backend/doctors_appointments_app/manage.py dbshell
setup-env-python3:
	python3 -m virtualenv env && source ./env/bin/activate && python3 -m pip install -r requirements.txt && mv env ./appointment-backend
setup-env-python:
	python -m virtualenv env && source ./env/bin/activate && python -m pip install -r requirements.txt && mv env ./appointment-backend
update-python-dep:
	pip freeze >requirements.txt
setup-database:
	systemctl start postgresql && sudo -u postgres psql -c "CREATE DATABASE doc_app5;" && sudo -u postgres psql -c "ALTER USER postgres PASSWORD '1234';"

start-django-server-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py runserver
python-install-dep-loc:
	source ./appointment-backend/env/bin/activate && pip3 install -r requirements.txt
start-django-server-network-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py runserver 192.168.100.56:8000
django-makemigrations-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py makemigrations
django-migrate-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py migrate
django-test-accounts-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py test accounts
django-test-reviews-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py test reviews
django-test-blog-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py test blog
django-shell-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py shell
django-dbshell-loc:
	source ./appointment-backend/env/bin/activate && python3 appointment-backend/doctors_appointments_app/manage.py dbshell
update-python-dep-loc:
	source ./appointment-backend/env/bin/activate && pip freeze >requirements.txt