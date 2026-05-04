# Estado del Proyecto — Prometeo Tattoo E-commerce
**Última actualización:** 04 May 2026
**Path local:** `/Users/alexisplescia/Desktop/Prometeo_claude/prometeo-tattoo`
**Repo GitHub:** `https://github.com/AlexisPlescia/prometeo.tatto`

---

## URLs de producción

| Servicio | URL |
|----------|-----|
| Frontend (Vercel) | https://prometeo-claude.vercel.app |
| Backend (Railway) | https://prometeoclaude-production-56f1.up.railway.app |
| Health check | https://prometeoclaude-production-56f1.up.railway.app/health |
| DB interna (Railway) | prometeoclaude.railway.internal:5432 |

---

## Stack

| Capa | Tech |
|------|------|
| Backend | Node.js 20 + Express + TypeScript + Prisma (PostgreSQL) |
| Frontend | React 18 + Vite + TypeScript + TailwindCSS |
| Auth | JWT (7d expiry) en localStorage |
| Pagos | MercadoPago SDK v2 |
| Deploy backend | Railway (Docker) |
| Deploy frontend | Vercel |

---

## Estado actual de deploy (08 Mar 2026)

### Frontend — Vercel ✅ BUILDEA OK
- Build pasa limpio
- `VITE_API_URL` configurado correctamente en Vercel apuntando a `https://prometeoclaude-production-56f1.up.railway.app/api`
- SPA routing manejado por `frontend/vercel.json`

### Backend — Railway ⚠️ EN VERIFICACIÓN
- Build Docker: ✅ pasa
- Deploy: ✅ pasa
- Healthcheck: ⚠️ fallaba hasta el último fix (ver abajo) — pendiente confirmar
- Servicio responde 502 — último fix pusheado, esperando nuevo deploy de Railway

---

## Historial de fixes aplicados (07–08 Mar 2026)

### Fixes de código (producción)
| Fix | Archivo | Commit |
|-----|---------|--------|
| Total de orden incluye shipping (lee StoreConfig) | `orderService.ts` | — |
| Webhook MP: valida firma + consulta API real + idempotente | `paymentController.ts` | — |
| env.ts: no crashea el proceso en vars faltantes | `config/env.ts` | `01b1800` |
| CORS dinámico desde `ALLOWED_ORIGINS` | `app.ts` | — |
| Route `/webhooks` duplicada eliminada | `routes/index.ts` | — |
| Stock restaurado al cancelar orden | `adminService.ts` | — |
| Logout automático en 401 | `frontend/api.ts` | — |
| CheckoutFailure/Pending leen params de MP | `CheckoutFailure.tsx`, `CheckoutPending.tsx` | — |
| Recharts formatter types para build de Vercel | `AdminDashboard.tsx` | `a422767`, `d7ee57e` |

### Fixes de infraestructura / deploy
| Fix | Archivo | Commit |
|-----|---------|--------|
| Git init en directorio correcto (no home) | — | `cfe93aa` |
| Dockerfile producción + .dockerignore | `backend/Dockerfile` | `8dda2a0` |
| Prisma binaryTargets: agrega x86-64 para Railway | `schema.prisma` | `2f992e7` |
| CMD usa `;` en vez de `&&` (server arranca aunque falle migration) | `Dockerfile` raíz | `7b06893` |
| `railway.toml` apunta a Dockerfile en raíz del repo | `railway.toml` | `d521560` |
| Dockerfile raíz con paths correctos (buildContext no soportado en railway.toml) | `Dockerfile` raíz | `4b1c338` |
| `COPY prisma ./prisma` antes de `npm ci` (postinstall necesita schema) | `Dockerfile` raíz | `81c832e` |
| `timeout 20` en prisma migrate para evitar hang si DB no responde | `Dockerfile` raíz y backend | `9ab78ce` |

---

## Causa raíz del 502 en Railway (diagnosticada 08 Mar 2026)

`prisma migrate deploy` se colgaba esperando conectar a la DB interna de Railway
(`prometeoclaude.railway.internal:5432`). Como el CMD usaba `;`, el servidor
igual esperaba que terminara el primer comando. Si la DB no era alcanzable, el
TCP timeout tardaba varios minutos → el container nunca respondía → healthcheck
fallaba → Railway mataba el container → 502.

**Fix aplicado:** `timeout 20 npx prisma migrate deploy || echo '...' ; node dist/server.js`
El servidor arranca siempre en máximo ~20 segundos independientemente de la DB.

---

## Variables de entorno — estado actual

### Railway (backend)
| Variable | Estado |
|----------|--------|
| `DATABASE_URL` | ⚠️ Viene del plugin Postgres — verificar que llegue al backend con `${{Postgres.DATABASE_URL}}` |
| `JWT_SECRET` | ✅ Configurado |
| `MERCADOPAGO_ACCESS_TOKEN` | ✅ Configurado (TEST-...) |
| `MERCADOPAGO_WEBHOOK_SECRET` | ✅ Configurado (provisional) |
| `FRONTEND_URL` | ✅ https://prometeo-claude.vercel.app |
| `BACKEND_URL` | ✅ https://prometeoclaude-production-56f1.up.railway.app |
| `ALLOWED_ORIGINS` | ✅ https://prometeo-claude.vercel.app,http://localhost:5173 |
| `NODE_ENV` | ✅ production |

### Vercel (frontend)
| Variable | Estado |
|----------|--------|
| `VITE_API_URL` | ✅ https://prometeoclaude-production-56f1.up.railway.app/api |

---

## Estructura de archivos clave

```
prometeo-tattoo/
├── ESTADO_PROYECTO.md          ← este archivo
├── README.md                   ← instrucciones de deploy
├── docker-compose.yml          ← dev local (Postgres)
├── backend/
│   ├── .env.example
│   ├── Dockerfile              ← (backup, Railway usa el de la raíz del repo)
│   ├── prisma/
│   │   ├── schema.prisma       ← binaryTargets: native + linux x86 + arm64
│   │   └── seed.ts
│   └── src/
│       ├── app.ts              ← Express + CORS dinámico + /health
│       ├── server.ts           ← listen 0.0.0.0:PORT
│       ├── config/
│       │   ├── env.ts          ← no crashea, solo warn en vars faltantes
│       │   └── prisma.ts       ← PrismaClient lazy
│       ├── services/           ← auth, cart, order, payment, admin, product, category
│       ├── controllers/
│       └── routes/
└── frontend/
    ├── .env.example
    ├── vercel.json             ← SPA routing (rewrite /* → index.html)
    └── src/
        ├── services/api.ts     ← Axios + interceptor JWT + logout en 401
        ├── store/              ← authStore, cartStore, configStore, uiStore
        └── pages/
            ├── admin/          ← Dashboard, Products, Categories, Orders, Settings
            └── Checkout.tsx    ← 2 pasos, calcula shipping desde configStore

/Users/alexisplescia/Desktop/Prometeo_claude/
├── Dockerfile                  ← ← ← Railway usa ESTE (raíz del repo)
├── railway.toml                ← apunta a este Dockerfile + healthcheck /health
└── .gitignore
```

---

## Flujo de deploy actual

### Railway (backend)
```
GitHub push → Railway detecta railway.toml → usa Dockerfile en raíz del repo
→ npm ci (con prisma schema copiado antes) → prisma generate → tsc build
→ CMD: timeout 20 migrate; node dist/server.js
→ healthcheck GET /health → debe responder {"status":"ok"}
```

### Vercel (frontend)
```
GitHub push → Vercel detecta prometeo-tattoo/frontend → npm install → tsc && vite build
→ dist/ servido como static → vercel.json maneja SPA routing
```

---

## Pendientes para tener la app 100% funcional

### 🔴 Verificar ahora mismo
1. **Confirmar healthcheck pasa** tras último deploy de Railway
   - `curl https://prometeoclaude-production-56f1.up.railway.app/health`
   - Debe devolver `{"status":"ok",...}`

2. **Verificar DATABASE_URL en backend Railway**
   - En Railway → servicio backend → Variables
   - Si no aparece con valor real, agregar: `DATABASE_URL=${{Postgres.DATABASE_URL}}`

3. **Correr migraciones en Railway** (solo la primera vez)
   - Railway → servicio backend → consola/shell:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

### 🟡 Pendientes técnicos
4. **MercadoPago en producción**
   - Reemplazar `TEST-...` por credenciales de producción `APP_USR-...`
   - Configurar webhook URL en panel MP: `https://prometeoclaude-production-56f1.up.railway.app/api/payments/webhook`
   - Actualizar `MERCADOPAGO_WEBHOOK_SECRET` con la clave real del panel

5. **Imágenes de productos**
   - Actualmente solo URLs manuales (sin upload)
   - Para MVP funciona si se usan URLs externas (Cloudinary, Drive, etc.)

### 🟢 Post-MVP
6. Emails transaccionales (confirmación de compra, cambio de estado)
7. Rate limiting en auth (login/register sin límite de intentos)
8. Paginación en panel admin
9. Tests unitarios / E2E
