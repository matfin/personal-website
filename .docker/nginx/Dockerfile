FROM nginx:alpine
RUN  rm /etc/nginx/conf.d/default.conf
COPY gzip.conf /etc/nginx/gzip.conf
COPY templates/nginx.conf.template /etc/nginx/templates/nginx.conf.template
