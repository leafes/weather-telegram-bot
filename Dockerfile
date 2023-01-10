# syntax=docker/dockerfile:1
FROM node:19
WORKDIR /weather-bot
RUN npm install
CMD ["node", "src/index.js"];
EXPOSE 3000