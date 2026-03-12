FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY Backend/Express .

EXPOSE 5000

CMD ["sh", "start_express.sh"]