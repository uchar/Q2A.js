FROM mhart/alpine-node:14.16.1
WORKDIR /var/www/q2a_api
COPY  /api .
RUN yarn
# Install PM2 globally
RUN npm install --global pm2
#Wait for mysql
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 4000

CMD  "pm2-runtime",/wait && yarn prod

