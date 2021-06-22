FROM node:14-alpine

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN npm install -g @types/node \
    && npm install -g typescript

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . ./

RUN tsc -b

ENV DISCORD_TOKEN ""
ENV SECRETAUTH ""
ENV DISCORD_CLIENT_ID ""
ENV DISCORD_CLIENT_SECRET ""
ENV MONGODB_URL ""
ENV CALLBACK_URL ""
ENV ACCESS_TOKEN_SECRET ""
ENV ACCESS_TOKEN_SECRET_0 ""

EXPOSE 8080

CMD [ "node", "./build/Server.js" ]