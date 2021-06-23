FROM node:14-alpine

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN apt-get install –y apache2\
    && apt-get install –y apache2-utils

RUN apt-get clean 

RUN npm install -g @types/node \
    && npm install -g typescript

WORKDIR /usr/src

COPY . ./

WORKDIR ./dashboard

COPY package*.json ./

RUN npm install

RUN npm build

COPY ./dist/ /var/www/html/

ENV VUE_APP_DISCORD_CLIENT_SECRET ""
ENV VUE_APP_ACCESS_TOKEN_SECRET ""

EXPOSE 80

CMD [“apache2ctl”, “-D”, “FOREGROUND”]