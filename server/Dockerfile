FROM node:18 AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base as build

RUN npm run build

FROM node:18.15-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "dist/src/main.js"]