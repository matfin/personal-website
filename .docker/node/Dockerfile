FROM        node:12.18-alpine
RUN         mkdir -p /opt/app/node_modules && chown -R node:node /opt/app
USER        node
WORKDIR     /opt/app
COPY        package.json yarn.lock ./
RUN         yarn cache clean
RUN         yarn global add webpack webpack-cli
RUN         yarn
COPY        --chown=node:node . .
RUN         yarn run build
