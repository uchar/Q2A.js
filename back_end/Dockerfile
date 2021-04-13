FROM mhart/alpine-node:14.16.1
WORKDIR /var/www/q2a_api
COPY  /back_end .
RUN yarn
EXPOSE 4000

CMD [ "yarn","prod"]
