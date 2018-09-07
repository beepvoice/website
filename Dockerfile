FROM node:10-alpine as build

RUN apk add --no-cache git=2.18.0-r0

ARG hugo_version=0.48
RUN curl --silent --show-error --fail --location -o /tmp/hugo.tar.gz \
    https://github.com/gohugoio/hugo/releases/download/v${hugo_version}/hugo_${hugo_version}_Linux-64bit.tar.gz
RUN tar -xf /tmp/hugo.tar.gz -C /tmp
RUN mv /tmp/hugo /usr/local/bin/hugo

WORKDIR /web
COPY . .
RUN yarn install

RUN yarn build
RUN hugo

FROM productionwentdown/caddy:0.11.0

COPY --from=build /web/public /srv
COPY Caddyfile /etc/Caddyfile
