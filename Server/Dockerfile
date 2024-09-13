FROM node:20-alpine
WORKDIR /srv/termchat
COPY package*.json .
RUN npm install -g nodemon
RUN npm install
COPY . .
CMD ["sh", "-c", "npx prisma migrate dev && npx nodemon -L server.js"]