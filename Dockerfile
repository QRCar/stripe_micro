FROM node:12.18.2-alpine
LABEL maintainer="QRCar."

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
