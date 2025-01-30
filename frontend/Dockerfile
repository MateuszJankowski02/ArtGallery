FROM node:20.18.1-alpine3.21

RUN apk update

WORKDIR /frontend

COPY . .

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200

CMD ["sh", "-c", "cd /frontend && ng serve --host 0.0.0.0 --port 4200"]
