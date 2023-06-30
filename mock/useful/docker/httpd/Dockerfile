FROM httpd:latest

ARG MODE=dev
ARG SSL=false

RUN if [ "$SSL" = "true" ]; \
    then sed -i \
             -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
             -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
             -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
             conf/httpd.conf; \
    fi 

COPY ./ssl/$MODE/server.crt /usr/local/apache2/conf/server.crt
COPY ./ssl/$MODE/server.key /usr/local/apache2/conf/server.key