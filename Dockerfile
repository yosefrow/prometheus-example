FROM node:8.0

LABEL maintainer "yosefrow@gmail.com"

EXPOSE 3000

RUN mkdir /app

# copy package json first so npm install is run only if packages change
COPY src/package.json /app

WORKDIR /app
RUN npm install

COPY src /app

CMD node /app/app.js
