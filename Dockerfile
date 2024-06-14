FROM node:18-alpine as development

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci

COPY --chown=node:node . .

RUN npm run test

USER node

FROM node:18-alpine as builder

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --chown=node:node package*.json .
RUN npm ci --omit=dev && npm cache clean --force

USER node

FROM node:18-alpine As production

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./package.json

CMD ["node", "dist/src/index.js"]