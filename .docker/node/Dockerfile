FROM        node:20.12.2-alpine

ARG CANONICAL_URL

ENV CANONICAL_URL ${CANONICAL_URL}

RUN         mkdir -p /opt/app/node_modules /opt/app/dist && chown -R node:node /opt/app
USER        node
WORKDIR     /opt/app
COPY        --chown=node:node package.json package-lock.json ./
RUN         npm cache clean --force
RUN         npm install
COPY        --chown=node:node . .
