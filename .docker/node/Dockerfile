FROM        node:20.12.2-alpine

ARG CANONICAL_URL

ENV CANONICAL_URL ${CANONICAL_URL}

RUN         mkdir -p /opt/app/node_modules /opt/app/dist && chown -R node:node /opt/app
USER        node
WORKDIR     /opt/app
COPY        package.json yarn.lock ./
RUN         yarn cache clean
RUN         yarn global add -D --non-interactive vite
RUN         yarn
COPY        --chown=node:node . .
