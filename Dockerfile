FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD [ "node", "service2.js" ]
CMD [ "node", "index.js" ]