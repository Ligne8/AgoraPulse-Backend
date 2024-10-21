FROM node:22 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-slim


ARG NODE_ENV=production

WORKDIR /app

COPY ecosystem.config.js ./

RUN npm install pm2 -g

COPY --from=builder /app/dist ./dist
COPY package.json ./

RUN npm install --omit=dev

EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]