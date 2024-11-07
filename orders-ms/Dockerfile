FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Compilar el proyecto
RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "docker:start"]