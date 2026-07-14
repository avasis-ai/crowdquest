# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22.22.0

FROM node:${NODE_VERSION}-bookworm-slim AS dependencies
WORKDIR /app
ENV NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_FUND=false
COPY package.json package-lock.json ./
RUN npm ci

FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_CROWDQUEST_API_URL=
ARG NEXT_PUBLIC_POLAR_CHECKOUT_URL=
ARG NEXT_PUBLIC_SITE_URL=https://vps.avasis.ai
ENV NEXT_PUBLIC_CROWDQUEST_API_URL=${NEXT_PUBLIC_CROWDQUEST_API_URL} \
    NEXT_PUBLIC_POLAR_CHECKOUT_URL=${NEXT_PUBLIC_POLAR_CHECKOUT_URL} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN npm run build

FROM node:${NODE_VERSION}-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
COPY --from=build --chown=node:node /app/dist/standalone/ ./
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["node", "server.js"]
