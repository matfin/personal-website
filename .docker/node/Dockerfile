FROM        node:18.17.0-alpine

ARG CANONICAL_URL
ARG ENABLE_CACHE

ENV CANONICAL_URL ${CANONICAL_URL}
ENV ENABLE_CACHE ${ENABLE_CACHE}

RUN         mkdir -p /opt/app/node_modules /opt/app/out && chown -R node:node /opt/app
USER        node
WORKDIR     /opt/app
COPY        package.json yarn.lock ./
RUN         yarn cache clean
RUN         yarn global add -D --non-interactive webpack webpack-cli
RUN         yarn
COPY        --chown=node:node . .
