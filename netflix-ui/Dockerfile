FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000:80

CMD [ "npm","start" ]
