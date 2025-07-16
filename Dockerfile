FROM node

WORKDIR /app

COPY package*.json ./
COPY config.json ./
COPY .env ./

RUN apt update && apt install -y ffmpeg
RUN npm install

COPY src ./src

CMD ["npm", "start"]