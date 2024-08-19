FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env ./

COPY . .

EXPOSE $port

CMD ["npm", "start"]