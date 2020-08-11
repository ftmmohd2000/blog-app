FROM node:12.18.3

WORKDIR /usr/src

COPY package.json .

RUN yarn

COPY . . 

EXPOSE 4000

ENTRYPOINT ["yarn","start"]