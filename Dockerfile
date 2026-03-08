FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Instalar dependencias (prisma/ necesario antes de npm ci por postinstall)
COPY prometeo-tattoo/backend/package*.json ./
COPY prometeo-tattoo/backend/prisma ./prisma
RUN npm ci

# Copiar código fuente
COPY prometeo-tattoo/backend/ .

# Generar cliente Prisma y compilar TypeScript
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

# Correr migraciones y luego iniciar el servidor
CMD ["sh", "-c", "timeout 20 npx prisma migrate deploy || echo '[migration] skipped or failed, continuing...'; node dist/server.js"]
