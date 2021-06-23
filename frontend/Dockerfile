FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

ENV VUE_APP_DISCORD_CLIENT_SECRET ""
ENV VUE_APP_ACCESS_TOKEN_SECRET ""
ENV VUE_APP_DISCORD_CLIENT_ID ""

EXPOSE 80