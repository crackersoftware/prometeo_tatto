FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Instalar dependencias
COPY prometeo-tattoo/backend/package*.json ./
RUN npm ci

# Copiar código fuente
COPY prometeo-tattoo/backend/ .

# Generar cliente Prisma y compilar TypeScript
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

# Correr migraciones y luego iniciar el servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
