# Prometeo Tattoo — E-commerce

E-commerce B2C para insumos de tatuaje. Permite a clientes navegar el catálogo, agregar productos al carrito y pagar con MercadoPago. Incluye panel de administración con dashboard de métricas, gestión de productos, categorías, órdenes y configuración del negocio.

## Arquitectura

```
prometeo-tattoo/
├── backend/   Node.js · Express · TypeScript · Prisma · PostgreSQL · MercadoPago SDK
└── frontend/  React 18 · Vite · TypeScript · TailwindCSS · Zustand · React Router
```

| Servicio | Deploy |
|----------|--------|
| Backend + DB | Railway |
| Frontend | Vercel |
| Pagos | MercadoPago (Checkout Pro + Webhooks) |

---

## Desarrollo local

### Requisitos
- Node.js 20+
- Docker (para PostgreSQL)

### 1. Base de datos

```bash
cd prometeo-tattoo
docker-compose up -d   # Levanta PostgreSQL en :5432
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # Completar con tus valores reales
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev            # http://localhost:4000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env   # Ajustar VITE_API_URL si es necesario
npm install
npm run dev            # http://localhost:5173
```

---

## Variables de entorno

### Backend (`backend/.env`)

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Connection string de PostgreSQL |
| `JWT_SECRET` | Secreto para firmar tokens JWT (mínimo 32 chars random) |
| `MERCADOPAGO_ACCESS_TOKEN` | Token de acceso de MP (TEST-... en dev, APP_USR-... en prod) |
| `MERCADOPAGO_WEBHOOK_SECRET` | Clave secreta del webhook en el panel de MP |
| `MERCADOPAGO_PUBLIC_KEY` | Clave pública de MP (opcional, para uso en frontend si aplica) |
| `FRONTEND_URL` | URL del frontend (ej: `https://tu-app.vercel.app`) |
| `BACKEND_URL` | URL del backend (ej: `https://tu-api.railway.app`) |
| `ALLOWED_ORIGINS` | Orígenes CORS permitidos, separados por coma |
| `PORT` | Puerto del servidor (Railway lo asigna automáticamente) |
| `NODE_ENV` | `development` o `production` |

> En `NODE_ENV=production` la app crashea al arrancar si faltan las variables críticas.

### Frontend (`frontend/.env`)

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API (ej: `https://tu-api.railway.app/api`) |

---

## Deploy en producción

### Railway — Backend + PostgreSQL

1. Crear nuevo proyecto en [railway.app](https://railway.app)
2. **Agregar servicio PostgreSQL** desde el catálogo de Railway → copiar `DATABASE_URL` al paso siguiente
3. **Agregar servicio desde GitHub repo**
   - Root directory: `prometeo-tattoo/backend`
   - Build command: `npm run build`
   - Start command: `node dist/server.js`
4. **Variables de entorno en Railway** — cargar todas las del backend:
   - `DATABASE_URL` (copiar del servicio Postgres de Railway)
   - `JWT_SECRET`, `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_WEBHOOK_SECRET`
   - `FRONTEND_URL` (URL de Vercel, se obtiene después del paso de Vercel)
   - `BACKEND_URL` (URL pública del servicio Railway)
   - `ALLOWED_ORIGINS` (URL de Vercel)
   - `NODE_ENV=production`
5. **Primer deploy** — después de que el servicio arranque, correr en la consola de Railway:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

### Vercel — Frontend

1. Importar el repo en [vercel.com](https://vercel.com)
2. Configurar:
   - **Root directory:** `prometeo-tattoo/frontend`
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. **Variables de entorno en Vercel:**
   - `VITE_API_URL=https://tu-servicio.railway.app/api`
4. Deploy — Vercel usa el `vercel.json` incluido para manejar SPA routing (React Router)

---

## MercadoPago — Configuración

1. Ir al [panel de MercadoPago](https://www.mercadopago.com.ar/developers) → Tus integraciones → seleccionar tu app
2. En **Credenciales de producción** copiar:
   - `Access token` → `MERCADOPAGO_ACCESS_TOKEN`
   - `Public key` → `MERCADOPAGO_PUBLIC_KEY`
3. En **Webhooks** (o IPN):
   - URL de notificación: `https://tu-api.railway.app/api/payments/webhook`
   - Seleccionar evento: `payment`
   - Copiar la **clave secreta** → `MERCADOPAGO_WEBHOOK_SECRET`
4. Cargar los 3 valores en las variables de entorno de Railway

> Para desarrollo/testing usar las credenciales de **sandbox** (TEST-...) y la URL del webhook con [ngrok](https://ngrok.com) o similar.

---

## Scripts disponibles

### Backend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor en modo desarrollo con hot-reload |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Inicia el servidor compilado (producción) |
| `npm run db:migrate` | Crea y aplica migraciones en desarrollo |
| `npm run db:deploy` | Aplica migraciones en producción (Railway) |
| `npm run db:seed` | Carga datos iniciales (categorías, productos, admin) |

### Frontend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo Vite en :5173 |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Preview del build local |
