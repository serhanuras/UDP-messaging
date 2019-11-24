FROM node

# Create Directory for the Container
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY tsconfig*.json ./

#COPY EVERYTHING..
COPY . .

RUN npm run build

WORKDIR ./

CMD node dist/start.js