FROM oven/bun:1.4.2-alpine AS build
WORKDIR /site
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/dist/client /usr/share/nginx/html
EXPOSE 8080
