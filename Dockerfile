FROM node:14

WORKDIR /app

COPY package.json package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

RUN npm run build

CMD ["npm", "run", "start"]
