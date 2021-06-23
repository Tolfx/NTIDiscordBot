FROM node:latest as build-stage

WORKDIR /app

WORKDIR ./dashboard

COPY ./dashboard/package.json ./

RUN npm install

COPY ./ .

RUN npm run build

ENV VUE_APP_DISCORD_CLIENT_SECRET ""
ENV VUE_APP_ACCESS_TOKEN_SECRET ""
ENV VUE_APP_DISCORD_CLIENT_ID ""


FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dashboard/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80