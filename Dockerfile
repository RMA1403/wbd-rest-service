FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npx", "nodemon", "./src/index.ts"]
