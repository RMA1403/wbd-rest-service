FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
<<<<<<< HEAD
CMD ["npx", "nodemon", "-L", "./src/index.ts"]
=======
CMD ["npx", "nodemon","-L", "./src/index.ts"]
>>>>>>> feat/profile
