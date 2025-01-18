FROM python:3.9.21-alpine3.21

# Install Python and pip
RUN apk update

WORKDIR /backend

COPY . .

WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD ["sh", "-c", "cd /backend/backendapi && python3 manage.py runserver 0.0.0.0:8000" ]


