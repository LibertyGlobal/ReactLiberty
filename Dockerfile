FROM registry.lgi.io/libertyglobal/lgi-nginx:latest

MAINTAINER CTO-WebAppDev@libertyglobal.com

ADD ./demo /var/www/htdocs/demo
ADD ./node_modules /var/www/htdocs/node_modules

ADD ./nginx.conf /etc/nginx/

EXPOSE 80
