FROM node:14-alpine

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN npm install -g @types/node \
    && npm install -g typescript

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . ./

RUN tsc -b

RUN if [[ -d "./build" ]]; then echo "Dir is here"; fi;
RUN if [[ -f "./build/Server.js" ]]; then echo "File is here"; fi;

EXPOSE 8080

CMD [ "node", "./build/Server.js" ]