FROM node:14.15.1-alpine

RUN apk update
RUN npm install -g @vue/cli
RUN npm install -g @vue/cli-init
RUN npm install vue
RUN npm install axios@0.18.1
RUN npm install vuesax
RUN npm install material-icons
RUN npm install vue-router
RUN npm install markdown-it
RUN npm install markdown-it-katex

WORKDIR /www

CMD ["/bin/sh"]doc