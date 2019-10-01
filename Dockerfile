FROM node:10-alpine as build

RUN apk add --no-cache git curl

ARG hugo_version=0.58.3
RUN curl -fsSLO --compressed https://github.com/gohugoio/hugo/releases/download/v${hugo_version}/hugo_${hugo_version}_Linux-64bit.tar.gz
RUN tar -xf hugo_${hugo_version}_Linux-64bit.tar.gz -C /tmp
RUN mv /tmp/hugo /usr/local/bin/hugo

WORKDIR /web
COPY . .
RUN yarn install

RUN yarn build
RUN hugo

FROM productionwentdown/caddy:1.0.3

COPY --from=build /web/public /srv
COPY Caddyfile /etc/Caddyfile
