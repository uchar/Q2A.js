FROM mhart/alpine-node:14.16.1
WORKDIR /var/www/q2a_frontend
COPY  /frontend .
RUN cp .sample.env .env
RUN sed -i 's/localhost/api/g' ./.env
RUN yarn
EXPOSE 3000

CMD [ "yarn","prod"]
