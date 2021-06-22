FROM node:14-alpine

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN npm install -g @types/node \
    && npm install -g typescript

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

RUN tsc -p .

RUN echo ls

COPY ./build /usr/src/app

EXPOSE 8080

CMD [ "node", "./build/Server.js" ]