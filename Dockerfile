FROM node:12.17.0 

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN chmod 755 /usr/src/app/index.js

EXPOSE 5000
EXPOSE 5001
EXPOSE 27017

CMD [ "npm", "run", "start" ]