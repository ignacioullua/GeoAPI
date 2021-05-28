FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
EXPOSE 5001
EXPOSE 27017
CMD [ "npm", "start" ]
