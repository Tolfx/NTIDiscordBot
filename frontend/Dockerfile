FROM ubuntu:latest

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN apt update -y && apt upgrade -y

RUN apt-get upgrade -y && apt-get update -y

RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN aptitude install apache2 -y \
    && aptitude install apache2-utils -y

RUN apt install apache2 –y \
    && apt install apache2-utils -y

RUN apt -y install nodejs
    
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