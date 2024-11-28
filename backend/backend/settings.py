import os

# ...

# Ustawienia bazy danych
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB', 'mydatabase'),
        'USER': os.getenv('POSTGRES_USER', 'myuser'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'mypassword'),
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Ustawienie ALLOWED_HOSTS
ALLOWED_HOSTS = ['0.0.0.0', 'localhost', '127.0.0.1']

# Inne ustawienia Django
DEBUG = True  # Pamiętaj, że dla produkcji powinno być ustawione na False
