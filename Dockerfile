FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libpq-dev \
    curl \
    gnupg \
    cmake \
    pkg-config \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV MESON_SKIP_TESTS=1


WORKDIR /app

COPY backend/ /app/backend

WORKDIR /app/backend
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

WORKDIR /app
RUN npm install -g @angular/cli

COPY frontend/ /app/frontend
WORKDIR /app/frontend
RUN npm install

EXPOSE 8000 4200

CMD ["bash", "-c", "cd /app/backend/backendapi && python3 manage.py runserver 0.0.0.0:8000 & cd /app/frontend && ng serve --host 0.0.0.0 --port 4200"]

