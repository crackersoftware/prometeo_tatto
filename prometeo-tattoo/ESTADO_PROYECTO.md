# Estado del Proyecto — Prometeo Tattoo E-commerce
**Última actualización:** 07 Mar 2026
**Path:** `/Users/alexisplescia/Desktop/Prometeo_claude/prometeo-tattoo`

---

## Stack Tecnológico

| Capa | Tech |
|------|------|
| Backend | Node.js + Express + TypeScript + Prisma (PostgreSQL) |
| Frontend | React 18 + Vite + TypeScript + TailwindCSS |
| Auth | JWT (7d expiry) en localStorage |
| Pagos | MercadoPago SDK v2 |
| Infra | Docker Compose (postgres:16 en :5432) |

---

## Estructura de archivos clave

```
prometeo-tattoo/
├── backend/
│   ├── .env.example               ← Template de variables de entorno
│   ├── prisma/
│   │   ├── schema.prisma          ← Modelos: User, Product, Category, Cart, Order, StoreConfig
│   │   └── seed.ts                ← Seed completo con categorías + productos + admin user
│   └── src/
│       ├── app.ts                 ← Express + CORS dinámico desde ALLOWED_ORIGINS + Helmet
│       ├── server.ts              ← Entry point
│       ├── config/
│       │   ├── env.ts             ← Validación estricta: crashea en prod si faltan vars críticas
│       │   └── prisma.ts          ← PrismaClient singleton
│       ├── middlewares/
│       │   ├── auth.ts            ← JWT verify → req.user
│       │   ├── adminOnly.ts       ← req.user.role === 'ADMIN'
│       │   ├── errorHandler.ts    ← Captura errores con statusCode
│       │   └── validate.ts        ← Zod validation middleware
│       ├── services/
│       │   ├── authService.ts     ← register, login, getMe (bcrypt + JWT)
│       │   ├── cartService.ts     ← get, add, update, remove, clear
│       │   ├── categoryService.ts ← CRUD categorías
│       │   ├── productService.ts  ← findAll (filtros/paginación), findBySlug, CRUD
│       │   ├── orderService.ts    ← createOrder: subtotal + shipping desde StoreConfig (✅ FIJO)
│       │   ├── paymentService.ts  ← createPreference MP (notification_url alineada)
│       │   └── adminService.ts    ← stats dashboard, CRUD productos/categorías, updateOrderStatus
│       ├── controllers/
│       │   ├── paymentController.ts ← webhook con firma MP + consulta API + idempotencia (✅ FIJO)
│       │   └── ...resto igual
│       └── routes/
│           ├── index.ts           ← Monta todos los routers en /api/* (sin duplicados)
│           ├── paymentRoutes.ts   ← POST /api/payments/create-preference, POST /api/payments/webhook
│           └── ...resto igual
│
└── frontend/
    └── src/
        ├── services/api.ts        ← Axios instance + interceptor JWT desde localStorage
        ├── store/
        │   ├── authStore.ts       ← Zustand: user, token, isAuthenticated
        │   ├── cartStore.ts       ← Zustand: items, count, sincroniza con API
        │   ├── configStore.ts     ← Zustand: free_shipping_threshold, shipping_cost
        │   └── uiStore.ts         ← Zustand: drawer open/close, notifications
        └── pages/
            ├── Checkout.tsx       ← 2 pasos: Envío → Revisión → redirect a MP
            │                         Cálculo local: subtotal + shipping para mostrar al usuario
            │                         El total real lo calcula el backend con StoreConfig
            └── admin/
                ├── AdminDashboard.tsx  ← Charts: ventas mensuales, diarias, por categoría
                └── AdminSettings.tsx   ← Config: umbral envío gratis, costo envío
```

---

## Modelos Prisma

- **User**: id, email, password (bcrypt), name, role (CUSTOMER|ADMIN), createdAt
- **Product**: id, name, slug, description, price, comparePrice, onSale, stock, images[], brand, featured, categoryId
- **Category**: id, name, slug, image
- **Cart + CartItem**: userId único, @@unique([cartId, productId])
- **Order**: total (subtotal+shipping), status (PENDING→CONFIRMED→SHIPPED→DELIVERED→CANCELLED), address, phone, notes, mpPaymentId
- **OrderItem**: orderId, productId, quantity, price, name
- **StoreConfig**: key/value — `free_shipping_threshold`, `shipping_cost`

---

## Flujo de Checkout (estado actual ✅)

1. Usuario agrega productos → cart sincronizado con DB
2. `/checkout` → dirección + teléfono + notas
3. Frontend muestra: subtotal + shipping calculado desde `configStore` (solo display)
4. Confirmar → `POST /api/orders`:
   - Backend lee `StoreConfig` de DB para calcular shipping
   - Crea orden con `total = subtotal + shippingCost` (fuente de verdad)
   - Descuenta stock en transacción atómica
5. → `POST /api/payments/create-preference` → MP crea preferencia
6. → Redirect a `sandboxInitPoint` / `initPoint`
7. MP llama `POST /api/payments/webhook`:
   - Valida firma `x-signature` con `MERCADOPAGO_WEBHOOK_SECRET`
   - Consulta API de MP con `payment_id` para verificar estado real
   - Solo si `status === 'approved'` actualiza orden a CONFIRMED
   - Idempotente: solo actúa si orden está en PENDING

---

## Variables de entorno (backend)

```env
# Obligatorias (crashean en prod si no están)
DATABASE_URL=postgresql://user:pass@host:5432/prometeo
JWT_SECRET=<random 64 bytes hex>
MERCADOPAGO_ACCESS_TOKEN=APP_USR-... (o TEST-... en dev)
MERCADOPAGO_WEBHOOK_SECRET=<secreto del panel de MP → Webhooks>
FRONTEND_URL=https://tu-dominio.com
BACKEND_URL=https://api.tu-dominio.com

# Opcionales
MERCADOPAGO_PUBLIC_KEY=APP_USR-...
ALLOWED_ORIGINS=https://tu-dominio.com,https://www.tu-dominio.com
PORT=4000
NODE_ENV=production
```

**Dev mínimo** (en `backend/.env`):
```env
DATABASE_URL=postgresql://prometeo:prometeo@localhost:5432/prometeo
JWT_SECRET=cualquier-string-largo-para-dev
MERCADOPAGO_ACCESS_TOKEN=TEST-...
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000
ALLOWED_ORIGINS=http://localhost:5173
NODE_ENV=development
```

---

## Para levantar en desarrollo

```bash
cd prometeo-tattoo

# Docker (Postgres)
docker-compose up -d

# Backend
cd backend
cp .env.example .env   # Completar vars
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev   # :4000

# Frontend
cd ../frontend
npm install
npm run dev   # :5173
```

---

## Estado de producción — Fixes aplicados (07 Mar 2026)

| # | Problema | Estado |
|---|----------|--------|
| ✅ | Total de orden no incluía shipping | **FIJO** — `orderService.ts` lee StoreConfig y suma shipping |
| ✅ | Webhook MP sin validación de firma | **FIJO** — valida `x-signature`, consulta API de MP, idempotente |
| ✅ | `external_reference` leído del lugar incorrecto | **FIJO** — se obtiene desde la respuesta de la API de MP |
| ✅ | `env.ts` con fallbacks inseguros | **FIJO** — crashea en prod si faltan vars críticas |
| ✅ | CORS hardcodeado a localhost | **FIJO** — dinámico desde `ALLOWED_ORIGINS` |
| ✅ | Route `/webhooks` duplicada en routes/index.ts | **FIJO** — eliminada |
| ✅ | `notification_url` apuntaba a ruta inexistente | **FIJO** — alineada a `/api/payments/webhook` |
| ✅ | Stock no se restauraba al cancelar una orden | **FIJO** — `adminService.ts` restaura stock en tx atómica |
| ✅ | Sin logout automático al expirar JWT | **FIJO** — interceptor 401 en `api.ts` llama `logout()` |
| ✅ | CheckoutFailure/Pending no leían params de MP | **FIJO** — muestran `payment_id` y `external_reference` |

---

## Lo que FALTA para producción

### 🟡 IMPORTANTE

1. **Imágenes: solo URLs manuales**
   - No hay upload (Cloudinary, S3, etc.)
   - OK para MVP si las imágenes son URLs externas (ej: links de Drive, Cloudinary manual)

2. **Sin paginación en admin**
   - `adminGetProducts` y `adminGetOrders` traen todo sin límite
   - Con pocos productos no es problema, pero escalar requiere cursor/offset pagination

### 🟢 MEJORAS — Post-MVP

3. **Sin emails transaccionales** — confirmación de compra, cambio de estado de orden
4. **Sin rate limiting** — login/register sin límite de intentos (riesgo de brute force)
5. **Sin tests** — ni unitarios ni E2E

---

## Próximo paso: Deploy

### Railway (backend + postgres)
1. Crear proyecto en Railway → Add service: PostgreSQL
2. Add service: GitHub repo
   - Root directory: `prometeo-tattoo/backend`
   - Build: `npm run build`
   - Start: `node dist/server.js`
3. Cargar todas las env vars (ver `.env.example`)
4. Tras primer deploy en consola Railway:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```
   (`postinstall` ya corre `prisma generate` automáticamente)

### Vercel (frontend)
1. Importar repo en Vercel
2. Root directory: `prometeo-tattoo/frontend`
3. `VITE_API_URL=https://tu-backend.railway.app/api`
4. Build: `npm run build` / Output: `dist`
5. El `vercel.json` incluido maneja SPA routing de React Router

### MercadoPago — webhook en producción
- Panel MP → Tus integraciones → Webhooks
- URL: `https://tu-backend.railway.app/api/payments/webhook`
- Evento: `payment`
- Copiar "Clave secreta" → `MERCADOPAGO_WEBHOOK_SECRET` en Railway
