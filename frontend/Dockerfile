FROM mhart/alpine-node:14.16.1
WORKDIR /var/www/q2a_frontend
COPY  / .

RUN yarn
EXPOSE 3000

CMD [ "yarn","prod"]
