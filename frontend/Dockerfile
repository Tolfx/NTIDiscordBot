FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

# Author
LABEL author="Tolfix" maintainer="support@tolfix.com"

# Upgrade/Update apt[-get]
RUN apt update -qq -y && apt -qq upgrade -y
RUN apt-get upgrade -y && apt-get update -y

# Install curl
RUN apt-get install curl -y

# Install apache2
RUN apt-get -y install software-properties-common \
    && add-apt-repository ppa:ondrej/php \
    && apt-get update \
    && apt-get install -y apache2 \
    && apt-get install -y php7.2 \
    && apt-get install -y \
    libapache2-mod-php7.2 \
    php7.2-curl php7.2-json

# Get nodejs setup
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Install node.js
RUN apt -y install nodejs

WORKDIR /usr/src

COPY . ./

WORKDIR ./dashboard

COPY ./dashboard/package.json ./

RUN npm install

RUN npm run build

COPY ./dist/ /var/www/html/

ENV VUE_APP_DISCORD_CLIENT_SECRET ""
ENV VUE_APP_ACCESS_TOKEN_SECRET ""

EXPOSE 80

CMD [“apache2ctl”, “-D”, “FOREGROUND”]