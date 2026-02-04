FROM node:20-alpine

WORKDIR /app

# Copiamos package.json y lock primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Generamos prisma client
RUN npx prisma generate

# Compilamos TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]