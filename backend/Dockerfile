###################
# BASE
###################
FROM node:20.9-alpine As base

###################
# DEVELOPMENT
###################

FROM base As development

RUN corepack enable

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

###################
# BUILD FOR PRODUCTION
###################

FROM base As build

RUN corepack enable

USER node

WORKDIR /app

COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

ENV NODE_ENV production

RUN yarn build

###################
# PREPARE FOR PRODUCTION
###################

FROM base As prepare

RUN corepack enable

USER node

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --production
RUN yarn cache clean

###################
# PRODUCTION
###################

FROM base As production

WORKDIR /app

RUN npm install -g pm2

ARG UID
ENV UID $UID

ARG GID
ENV GID $GID

# Add non-root user
RUN apk --no-cache add shadow
RUN addgroup -S appgroup && groupmod --gid ${GID} --non-unique appgroup
RUN adduser -S -s /bin/sh appuser && usermod --gid appgroup --uid $UID --non-unique appuser
RUN chown -R appuser:appgroup /app

USER appuser

HEALTHCHECK --interval=30s --timeout=30s --start-period=3s --retries=10 CMD node healthcheck.js

COPY --chown=appuser:appgroup --from=prepare /app/node_modules ./node_modules
COPY --chown=appuser:appgroup --from=build /app/dist ./dist
COPY --chown=appuser:appgroup --from=build /app/public ./public
COPY --chown=appuser:appgroup --from=build /app/healthcheck.js ./healthcheck.js

ENV NODE_ENV production

CMD [ "pm2-runtime", "ecosystem.config.js" ]
