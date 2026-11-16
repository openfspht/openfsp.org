FROM oven/bun:1.4.4-alpine AS bun

FROM node:24.12-alpine AS build

COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /site

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build


FROM nginxinc/nginx-unprivileged:1.31-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /site/dist/client /usr/share/nginx/html

EXPOSE 8080
