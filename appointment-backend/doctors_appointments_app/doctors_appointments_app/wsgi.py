"""
WSGI config for appointments project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
from pathlib import Path
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

STATIC_DIR = Path(__file__).resolve().parent.parent.parent.parent

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'doctors_appointments_app.settings')

application = get_wsgi_application()
# application = WhiteNoise(application, root='/home/vicmwass/PROJECT-MED/build')
application = WhiteNoise(application, root=os.path.join(STATIC_DIR,'build'))
# application.add_files("/path/to/more/static/files", prefix="more-files/")