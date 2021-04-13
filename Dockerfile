FROM mhart/alpine-node:14.16.1
RUN mkdir -p /var/www/q2a.js/node_modules
WORKDIR /var/www/q2a.js
COPY  . .
RUN yarn install_packages
EXPOSE 4000

CMD [ "yarn","api_run_prod"]
