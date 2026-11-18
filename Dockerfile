FROM --platform=$BUILDPLATFORM oven/bun:1.4.4-alpine AS bun

FROM --platform=$BUILDPLATFORM node:24.12-alpine AS build

COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /site

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM nginxinc/nginx-unprivileged:1.31-alpine

ENV SENTRY_DSN="" SENTRY_ENVIRONMENT="" SENTRY_RELEASE="" SENTRY_TRACES_SAMPLE_RATE=""

COPY docker/nginx.conf /etc/nginx/templates/default.conf.template

COPY docker/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=build /site/dist/client /usr/share/nginx/html

EXPOSE 8080

