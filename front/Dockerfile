FROM node:14.15.1-alpine

RUN TZ=Asia/Tokyo
RUN mkdir -p /var/www/
ADD ./package.json /var/www/
WORKDIR /var/www
RUN npm install


RUN mkdir -p /var/www/highcairn
ADD ./highcairn/package.json /var/www/highcairn
WORKDIR /var/www/highcairn
RUN npm install
CMD npm run dev