FROM mhart/alpine-node:14.16.1
WORKDIR /var/www/q2a_api
COPY  / .
RUN yarn

#Wait for mysql
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 4000

CMD /wait && yarn prod

