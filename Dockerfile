FROM node:22-slim

WORKDIR /app
COPY . .

RUN npm install -g npm
RUN npm ci
RUN npm run compile

EXPOSE 3000

CMD [ "npm", "start" ]
