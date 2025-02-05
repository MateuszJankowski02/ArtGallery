#!/bin/sh
# wait for the database service "db" on port 5432 to be available
while ! nc -z db 5432; do
  echo "Waiting for Postgres (db) to be available..."
  sleep 1
done

python manage.py makemigrations
python manage.py migrate
exec gunicorn backendapi.wsgi:application --bind 0.0.0.0:8000 --workers 3 --worker-class sync --access-logfile - --error-logfile - --log-level debug