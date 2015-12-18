FROM registry.lgi.io/libertyglobal/lgi-nginx:latest

MAINTAINER CTO-WebAppDev@libertyglobal.com

ADD ./assets /var/www/htdocs/assets
ADD ./build /var/www/htdocs/build
ADD ./index.html /var/www/htdocs/
ADD ./main.html /var/www/htdocs/

ADD ./nginx.conf /etc/nginx/

EXPOSE 80
