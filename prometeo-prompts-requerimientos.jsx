import { useState } from "react";

const C = {
  bg: "#07070a", surface: "#0f0f14", card: "#151519", border: "#1f1f26",
  accent: "#c62828", gold: "#d4a24e", blue: "#4a90d9",
  green: "#3d9970", cyan: "#22d3ee", text: "#d8d8d8", dim: "#6e6e78", muted: "#3a3a42",
};
const mono = `'Courier New', monospace`;

function Badge({ children, color = C.accent }) {
  return <span style={{ background: color+"15", color, padding:"2px 10px", borderRadius:3, fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", fontFamily:mono }}>{children}</span>;
}
function H({ children }) {
  return <h3 style={{ color:C.gold, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, paddingBottom:8, marginBottom:14, fontFamily:mono }}>{children}</h3>;
}
function Box({ children, accent, style }) {
  return <div style={{ background:C.card, border:`1px solid ${accent?C.accent+"44":C.border}`, borderRadius:6, padding:"14px 18px", marginBottom:10, ...style }}>{children}</div>;
}
function Code({ children, title }) {
  return <div style={{ marginBottom: 12 }}>
    {title && <div style={{ color: C.cyan, fontSize: 11, fontWeight: 700, fontFamily: mono, marginBottom: 6 }}>{title}</div>}
    <pre style={{ background:"#050507", border:`1px solid ${C.border}`, borderRadius:5, padding:14, fontSize:11.5, lineHeight:1.7, color:"#8a8a96", margin:0, overflowX:"auto", fontFamily:mono, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{children}</pre>
  </div>;
}
function CopyBlock({ children, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return <div style={{ position:"relative", marginBottom:14 }}>
    {label && <div style={{ color:C.gold, fontSize:11, fontWeight:700, fontFamily:mono, marginBottom:6, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span>{label}</span>
      <button onClick={handleCopy} style={{ background: copied ? C.green+"33" : C.muted+"44", border:"none", color: copied ? C.green : C.dim, padding:"3px 12px", borderRadius:3, fontSize:10, cursor:"pointer", fontFamily:mono }}>{copied ? "COPIADO ✓" : "COPIAR"}</button>
    </div>}
    <pre style={{ background:"#040406", border:`1px solid ${C.accent}33`, borderRadius:5, padding:16, fontSize:11.5, lineHeight:1.75, color:"#9a9aa6", margin:0, overflowX:"auto", fontFamily:mono, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{children}</pre>
  </div>;
}

// ─── TABS ───
const TABS = ["Estrategia", "Prompt Semana 1", "Prompt Semana 2", "Prompt Semana 3", "Prompt Semana 4", "Requerimientos", "Criterios de Aceptación"];

function Estrategia() {
  return <>
    <div style={{ marginBottom: 28 }}>
      <H>Filosofia de los prompts</H>
      <Box>
        <p style={{ color:C.text, fontSize:13, lineHeight:1.85, margin:0 }}>
          Cada prompt está diseñado como una <strong style={{color:C.accent}}>unidad de trabajo autónoma</strong>. Esto significa que podés copiar cualquier prompt, pegarlo en una nueva conversación con Claude, y va a producir código funcional sin necesitar contexto adicional.
        </p>
        <p style={{ color:C.dim, fontSize:13, lineHeight:1.85, margin:"12px 0 0" }}>
          Los prompts están ordenados cronológicamente (semana 1 → 4) y cada uno asume que el anterior ya fue ejecutado. Incluyen: contexto del proyecto, qué archivos crear, qué código escribir, y criterios de verificación.
        </p>
      </Box>
    </div>

    <div style={{ marginBottom: 28 }}>
      <H>Como usar estos prompts</H>
      <Box>{[
        ["1. Copiá el prompt", "Usá el botón COPIAR de cada bloque"],
        ["2. Abrí una conversación nueva", "En Claude, ChatGPT, o tu IDE con AI"],
        ["3. Pegalo y ejecutalo", "El prompt tiene todo el contexto necesario"],
        ["4. Revisá el output", "Verificá contra los criterios de aceptación"],
        ["5. Iterá si hace falta", "Pedí correcciones puntuales sobre lo generado"],
      ].map(([t,d],i) => <div key={i} style={{ display:"flex", gap:12, padding:"6px 0", borderBottom: i<4?`1px solid ${C.border}`:"none" }}>
        <span style={{ color:C.accent, fontWeight:700, fontSize:12, fontFamily:mono, minWidth:180 }}>{t}</span>
        <span style={{ color:C.dim, fontSize:12 }}>{d}</span>
      </div>)}</Box>
    </div>

    <div style={{ marginBottom: 28 }}>
      <H>Estructura de cada prompt</H>
      <Box>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            ["ROL", "Define la persona experta que Claude asume"],
            ["CONTEXTO", "Descripción completa del proyecto y stack"],
            ["TAREA", "Qué archivos crear, qué código escribir"],
            ["ESTRUCTURA", "Carpetas y archivos exactos esperados"],
            ["ESPECIFICACIONES", "Detalles técnicos, tipos, lógica de negocio"],
            ["CRITERIOS", "Cómo verificar que está bien hecho"],
          ].map(([t,d],i) => <div key={i} style={{ background:C.bg, padding:"10px 14px", borderRadius:4, border:`1px solid ${C.border}` }}>
            <div style={{ color:C.gold, fontSize:11, fontWeight:700, fontFamily:mono }}>{t}</div>
            <div style={{ color:C.dim, fontSize:11, marginTop:2 }}>{d}</div>
          </div>)}
        </div>
      </Box>
    </div>

    <div style={{ marginBottom: 28 }}>
      <H>Mapa de dependencias entre semanas</H>
      <Box accent>
        <div style={{ fontSize:12, color:C.text, lineHeight:2 }}>
          <div><Badge color={C.accent}>SEM 1</Badge> <span style={{color:C.muted}}>→</span> Docker + Estructura + Layout + Router + DB schema + Seed</div>
          <div style={{marginTop:6}}><Badge color={C.blue}>SEM 2</Badge> <span style={{color:C.muted}}>→</span> depende de SEM 1 → API productos + Catálogo + Filtros + Detail</div>
          <div style={{marginTop:6}}><Badge color={C.green}>SEM 3</Badge> <span style={{color:C.muted}}>→</span> depende de SEM 2 → Auth + Carrito + Estado global + Zustand</div>
          <div style={{marginTop:6}}><Badge color={C.gold}>SEM 4</Badge> <span style={{color:C.muted}}>→</span> depende de SEM 3 → Checkout + Orders + Polish + Deploy ready</div>
        </div>
      </Box>
    </div>

    <div>
      <H>Tip importante</H>
      <Box style={{ borderLeft:`3px solid ${C.accent}` }}>
        <p style={{ color:C.text, fontSize:13, lineHeight:1.8, margin:0 }}>
          Si un prompt genera demasiado código para una sola respuesta, pedile que lo divida: <em style={{color:C.gold}}>"Seguí con los archivos que faltan"</em> o <em style={{color:C.gold}}>"Ahora generá los componentes de la parte X"</em>. Los prompts están diseñados para que Claude pueda retomar sin perder contexto.
        </p>
      </Box>
    </div>
  </>;
}

function Semana1() {
  return <>
    <H>PROMPT — SEMANA 1: Fundación & Infraestructura</H>
    <p style={{ color:C.dim, fontSize:12, marginBottom:16 }}>Este prompt genera: Docker, estructura de carpetas, Prisma schema, seed, layout base, router y home estático.</p>
    <CopyBlock label="PROMPT COMPLETO — COPIAR Y PEGAR">{`Actúa como un software architect senior fullstack especializado en React + TypeScript + Node.js + Docker.

## PROYECTO
Estoy construyendo "Prometeo Tattoo", un ecommerce de venta de insumos para tatuadores (tintas, agujas, máquinas, grips, aftercare, etc).

## STACK EXACTO
- Frontend: React 18, TypeScript, Vite, TailwindCSS, React Router v6, Zustand, Axios
- Backend: Node.js 20, Express, TypeScript, Prisma ORM, JWT, Zod, bcrypt, cors, helmet
- DB: PostgreSQL 15
- Infra: Docker + Docker Compose
- Todo en un monorepo con carpetas /frontend y /backend

## TAREA — SEMANA 1: FUNDACIÓN
Necesito que generes TODOS los archivos necesarios para levantar el proyecto desde cero con Docker. El resultado debe ser: ejecuto "docker compose up --build" y tengo frontend + backend + DB corriendo.

### ARCHIVOS A GENERAR:

**Raíz del proyecto:**
- docker-compose.yml (3 servicios: frontend:5173, backend:4000, database:5432)
- .env.example
- .gitignore (node_modules, dist, .env, pgdata, uploads)

**Frontend (cada archivo completo, no parcial):**
- package.json (react, react-dom, react-router-dom, zustand, axios, typescript, tailwindcss, postcss, autoprefixer, @types/react, @types/react-dom, vite, @vitejs/plugin-react)
- tsconfig.json
- vite.config.ts
- tailwind.config.ts (theme: colores background:#0a0a0a, surface:#141414, accent:#c62828, gold:#d4a24e. Fonts: display "Bebas Neue", body "DM Sans", mono "JetBrains Mono")
- index.html (con Google Fonts: Bebas Neue, DM Sans, JetBrains Mono)
- src/styles/globals.css (Tailwind directives + custom dark theme)
- src/main.tsx (entry point)
- src/App.tsx (BrowserRouter + Routes)
- src/router.tsx (todas las rutas: /, /shop, /product/:slug, /cart, /checkout, /login, /register, /profile, /contact)
- src/types/product.ts (interface Product: id, name, slug, description, price, stock, image, brand, featured, categoryId, createdAt)
- src/types/user.ts (interface User: id, email, name, role)
- src/types/cart.ts (interface CartItem: id, productId, product, quantity)
- src/types/order.ts (interface Order: id, userId, items, total, status, address, createdAt)
- src/components/layout/Navbar.tsx (logo "PROMETEO TATTOO", links: Home, Shop, Contacto, ícono carrito, botón login. Dark theme, sticky top)
- src/components/layout/Footer.tsx (3 columnas: Categorías, Empresa, Soporte + copyright)
- src/components/layout/PageWrapper.tsx (wrapper con Navbar + Footer + children)
- src/pages/Home.tsx (hero banner con título "Insumos profesionales para tatuadores", subtítulo, botón CTA "Ver catálogo" → /shop. Sección de categorías con 9 cards. Sección de productos destacados placeholder)
- src/pages/Shop.tsx (placeholder: "Catálogo — Coming in Week 2")
- src/pages/ProductDetail.tsx (placeholder)
- src/pages/Cart.tsx (placeholder)
- src/pages/Checkout.tsx (placeholder)
- src/pages/Login.tsx (placeholder)
- src/pages/Register.tsx (placeholder)
- src/pages/Profile.tsx (placeholder)
- src/pages/Contact.tsx (placeholder)
- src/pages/NotFound.tsx (404 page)
- Dockerfile

**Backend (cada archivo completo):**
- package.json (express, cors, helmet, jsonwebtoken, bcryptjs, zod, @prisma/client, prisma, tsx, typescript, @types/express, @types/cors, @types/jsonwebtoken, @types/bcryptjs)
- tsconfig.json (target ES2020, module NodeNext, outDir dist)
- src/config/env.ts (variables tipadas: PORT, DATABASE_URL, JWT_SECRET)
- src/config/prisma.ts (PrismaClient singleton)
- src/app.ts (Express app: cors, helmet, json, routes, errorHandler)
- src/server.ts (listen en PORT)
- src/middlewares/errorHandler.ts (global error handler)
- src/routes/index.ts (router principal: /products, /categories, /auth, /cart, /orders)
- src/routes/productRoutes.ts (GET / y GET /:slug — placeholder controllers)
- src/routes/categoryRoutes.ts (GET /)
- src/routes/authRoutes.ts (POST /register, POST /login, GET /me — placeholder)
- src/routes/cartRoutes.ts (placeholder)
- src/routes/orderRoutes.ts (placeholder)
- src/controllers/productController.ts (placeholder: return [])
- src/controllers/categoryController.ts (placeholder)
- src/controllers/authController.ts (placeholder)
- src/controllers/cartController.ts (placeholder)
- src/controllers/orderController.ts (placeholder)
- prisma/schema.prisma (SCHEMA COMPLETO:
    User: id uuid, email unique, password, name, role enum CUSTOMER/ADMIN, orders[], cart?, timestamps
    Category: id uuid, name unique, slug unique, image?, products[]
    Product: id uuid, name, slug unique, description, price Float, stock Int default 0, image, brand, featured Boolean default false, category relation, cartItems[], orderItems[], timestamps
    Cart: id uuid, user relation unique, items[]
    CartItem: id uuid, cart relation cascade, product relation, quantity Int default 1, @@unique([cartId, productId])
    Order: id uuid, user relation, items[], total Float, status enum PENDING/CONFIRMED/SHIPPED/DELIVERED/CANCELLED, address, phone?, notes?, timestamps
    OrderItem: id uuid, order relation cascade, product relation, quantity Int, price Float
  )
- prisma/seed.ts (seed con:
    9 categorías: Tintas, Agujas, Máquinas, Fuentes de poder, Grips & Tips, Transfer & Stencil, Aftercare, Mobiliario, Accesorios
    Al menos 12 productos de ejemplo distribuidos en las categorías, con precios realistas en USD, nombres realistas de productos de tattoo, marcas como: Eternal Ink, Cheyenne, FK Irons, Bishop, Critical, Hustle Butter
    1 usuario admin: admin@prometeo.com / admin123
  )
- Dockerfile

### ESPECIFICACIONES DE DISEÑO
- Dark mode obligatorio en todo el frontend
- Colores: bg #0a0a0a, surface #141414, accent #c62828 (rojo), gold #d4a24e
- Font display: Bebas Neue (headings), body: DM Sans, mono: JetBrains Mono
- Navbar sticky con blur backdrop
- Hero del Home: full-width, gradiente oscuro, tipografía grande
- Todas las páginas usan PageWrapper
- Responsive desde el inicio (mobile-first con Tailwind)

### CRITERIOS DE VERIFICACIÓN
1. docker compose up --build levanta los 3 servicios sin errores
2. Frontend visible en localhost:5173 con Navbar + Home + Footer
3. Backend responde en localhost:4000/api/products (puede devolver [])
4. npx prisma migrate dev crea las tablas
5. npx prisma db seed carga categorías y productos
6. Todas las rutas del router funcionan (aunque sean placeholder)
7. El diseño es dark, profesional, con los colores y fonts especificados

Generá todos los archivos completos, no parciales. Si es mucho para una respuesta, dividilo en partes y avisame para pedirte la continuación.`}</CopyBlock>
  </>;
}

function Semana2() {
  return <>
    <H>PROMPT — SEMANA 2: Catálogo & Productos</H>
    <p style={{ color:C.dim, fontSize:12, marginBottom:16 }}>Este prompt genera: API de productos completa, página Shop con filtros, ProductCard, ProductGrid, SearchBar, ProductDetail, paginación.</p>
    <CopyBlock label="PROMPT COMPLETO — COPIAR Y PEGAR">{`Actúa como un fullstack developer senior. Estoy en la SEMANA 2 de desarrollo de "Prometeo Tattoo", un ecommerce de insumos para tatuadores.

## CONTEXTO (ya implementado en semana 1)
- Monorepo: /frontend (React+TS+Vite+Tailwind) + /backend (Node+Express+TS+Prisma) + Docker Compose + PostgreSQL
- DB tiene: User, Category, Product, Cart, CartItem, Order, OrderItem (Prisma)
- Seed con 9 categorías y 12+ productos
- Layout base: Navbar, Footer, PageWrapper, Router con todas las rutas
- Home page con hero y categorías
- Dark theme: bg #0a0a0a, surface #141414, accent #c62828, gold #d4a24e
- Fonts: Bebas Neue (display), DM Sans (body), JetBrains Mono (mono)

## TAREA — SEMANA 2: CATÁLOGO COMPLETO
Necesito implementar el catálogo de productos end-to-end. Backend API + Frontend completo.

### BACKEND — Archivos a crear/modificar:

**src/services/productService.ts:**
- getProducts(filters): query con Prisma, soporta:
  - category (slug de categoría)
  - brand (string)
  - search (busca en name y description, case-insensitive)
  - minPrice, maxPrice (rango)
  - sort: "price_asc", "price_desc", "name_asc", "newest"
  - page (default 1), limit (default 12)
- Retorna: { products, total, page, totalPages }
- getProductBySlug(slug): producto con categoría incluida
- getFeaturedProducts(): productos con featured=true, limit 8

**src/services/categoryService.ts:**
- getAll(): todas las categorías con count de productos

**src/controllers/productController.ts:**
- GET / → llama getProducts con query params
- GET /featured → getFeaturedProducts
- GET /:slug → getProductBySlug (404 si no existe)

**src/controllers/categoryController.ts:**
- GET / → getAll

### FRONTEND — Archivos a crear:

**src/services/api.ts:**
- Axios instance con baseURL VITE_API_URL, interceptor para JWT en headers

**src/services/productService.ts:**
- getProducts(params) → GET /products
- getProductBySlug(slug) → GET /products/:slug
- getFeaturedProducts() → GET /products/featured
- getCategories() → GET /categories

**src/hooks/useProducts.ts:**
- Custom hook que maneja: products[], loading, error, filters, pagination
- Función fetchProducts que llama al service con los filtros actuales
- useEffect que re-fetcha cuando cambian filtros o página

**src/hooks/useDebounce.ts:**
- Hook genérico de debounce (300ms default)

**src/components/product/ProductCard.tsx:**
- Props: product (Product type)
- Imagen del producto (aspect-ratio 4:3, object-cover)
- Badge de categoría (color gold)
- Nombre del producto (DM Sans, bold)
- Marca en texto dim
- Precio en JetBrains Mono, color accent
- Botón "Agregar" (hover effect, color accent)
- Hover en toda la card: scale 1.02, shadow, transición 200ms
- Click en la card → navegar a /product/:slug

**src/components/product/ProductGrid.tsx:**
- Props: products[], loading
- Grid responsive: 4 cols (lg), 3 cols (md), 2 cols (sm), 1 col (xs)
- Gap 16px
- Si loading: mostrar 8 skeleton cards (rectangulos animados pulse)
- Si no hay productos: mensaje "No se encontraron productos"

**src/components/product/Filters.tsx:**
- Sidebar de filtros (desktop: columna izquierda, mobile: modal/drawer)
- Secciones:
  - Categorías: lista de checkboxes con nombre y count
  - Marca: checkboxes con las marcas disponibles (extraer de productos)
  - Precio: inputs min/max con botón aplicar
- Botón "Limpiar filtros"
- onChange emite el objeto de filtros actualizado

**src/components/product/SearchBar.tsx:**
- Input con ícono de lupa (SVG inline)
- Placeholder: "Buscar tintas, agujas, máquinas..."
- Debounce 300ms con useDebounce
- Botón X para limpiar
- Estilo: bg surface, border, rounded, focus:border-accent

**src/components/ui/Loader.tsx:**
- Skeleton: div con animate-pulse, bg-surface, rounded
- Spinner: SVG circular animado, color accent

**src/components/ui/Badge.tsx:**
- Props: children, variant (default, accent, gold, success)
- Estilos por variante con colores del theme

**src/pages/Shop.tsx (COMPLETA):**
- Layout: SearchBar arriba, luego 2 columnas (Filters sidebar 280px + ProductGrid)
- URL query params sincronizados con filtros (useSearchParams)
- Paginación abajo: botones Previous/Next + indicador "Página X de Y"
- Sort dropdown: Relevancia, Precio ↑, Precio ↓, Nombre A-Z, Más nuevos
- Mobile: filtros en un drawer/modal activado con botón "Filtros"
- Título de página: "Catálogo" con contador de resultados

**src/pages/ProductDetail.tsx (COMPLETA):**
- Fetch producto por slug (useParams)
- Layout 2 columnas:
  - Izquierda: imagen grande (aspect-ratio 3:4)
  - Derecha: breadcrumb (Home > Shop > Categoría > Producto), nombre (Bebas Neue, grande), marca, precio (grande, JetBrains Mono), descripción, stock ("X unidades disponibles" en verde o "Sin stock" en rojo), botón "Agregar al carrito" (full-width, accent, grande)
- Sección inferior: "Productos relacionados" (misma categoría, max 4)
- Loading state con skeleton
- 404 si no existe

**Actualizar src/pages/Home.tsx:**
- Sección "Productos destacados": fetch de /products/featured, mostrar en grid con ProductCard
- Sección categorías: fetch de /categories, mostrar como cards clickeables → /shop?category=slug

### ESPECIFICACIONES DE DISEÑO
- ProductCard: bg surface, rounded-lg, overflow-hidden, hover:shadow-lg hover:shadow-accent/10
- Skeleton: bg surface animando a bg-surface/50
- Filtros sidebar: bg card, border-r border-border, padding 24px
- Paginación: botones ghost con border, activo con bg accent
- Precio siempre formateado: "$XX.XX" con toLocaleString
- Imágenes con fallback a un placeholder si no cargan

### CRITERIOS DE VERIFICACIÓN
1. GET /api/products retorna productos con paginación
2. GET /api/products?category=tintas filtra correctamente
3. GET /api/products?search=eternal busca por nombre
4. GET /api/products?sort=price_asc ordena
5. /shop muestra el grid con productos reales de la DB
6. Filtros actualizan URL y resultados en tiempo real
7. SearchBar filtra con debounce
8. Click en ProductCard navega a /product/:slug
9. ProductDetail muestra toda la info del producto
10. Responsive: funciona bien en mobile y desktop
11. Skeletons se muestran mientras carga

Generá todos los archivos completos. Si es mucho, dividí y avisame.`}</CopyBlock>
  </>;
}

function Semana3() {
  return <>
    <H>PROMPT — SEMANA 3: Auth, Carrito & Estado Global</H>
    <p style={{ color:C.dim, fontSize:12, marginBottom:16 }}>Este prompt genera: autenticación JWT completa, Zustand stores, carrito persistente en DB, páginas login/register/profile.</p>
    <CopyBlock label="PROMPT COMPLETO — COPIAR Y PEGAR">{`Actúa como un fullstack developer senior. SEMANA 3 de "Prometeo Tattoo", ecommerce de insumos para tatuadores.

## CONTEXTO (ya implementado)
- Monorepo: /frontend (React+TS+Vite+Tailwind) + /backend (Node+Express+TS+Prisma) + Docker + PostgreSQL
- DB: User, Category, Product, Cart, CartItem, Order, OrderItem
- API funcionando: GET /products (con filtros, paginación, sort), GET /products/:slug, GET /categories, GET /products/featured
- Frontend: Home, Shop (con filtros, search, grid, paginación), ProductDetail, Navbar, Footer
- Dark theme: bg #0a0a0a, accent #c62828, gold #d4a24e

## TAREA — SEMANA 3: AUTH + CARRITO + ESTADO

### BACKEND:

**src/services/authService.ts:**
- register(name, email, password): hash password con bcrypt (10 rounds), crear user, crear cart vacío, generar JWT (payload: {userId, role}, expiresIn: "7d"), retornar {user, token}
- login(email, password): buscar user, comparar hash, generar JWT, retornar {user, token}
- getMe(userId): buscar user por id, excluir password

**src/controllers/authController.ts:**
- POST /register: validar body con Zod (name min 2, email valid, password min 6), llamar service
- POST /login: validar con Zod, llamar service
- GET /me: requiere auth middleware, llamar getMe

**src/schemas/authSchema.ts:**
- registerSchema: Zod object {name, email, password}
- loginSchema: Zod object {email, password}

**src/middlewares/auth.ts:**
- Extraer token de header "Authorization: Bearer <token>"
- Verificar JWT, adjuntar userId y role a req (extender Request type)
- Si no hay token o es inválido: 401

**src/middlewares/validate.ts:**
- Middleware genérico: recibe Zod schema, valida req.body, 400 si falla con errores formateados

**src/services/cartService.ts:**
- getCart(userId): buscar cart con items incluidos (include product), si no existe crear vacío
- addItem(userId, productId, quantity): buscar o crear CartItem, si ya existe sumar quantity, validar stock
- updateItem(cartItemId, userId, quantity): verificar que el item pertenece al user, actualizar cantidad, validar stock
- removeItem(cartItemId, userId): verificar ownership, eliminar
- clearCart(userId): eliminar todos los items

**src/controllers/cartController.ts:**
- GET / → getCart (auth required)
- POST /items → addItem, body: {productId, quantity} validado con Zod
- PATCH /items/:id → updateItem, body: {quantity}
- DELETE /items/:id → removeItem

**src/schemas/cartSchema.ts:**
- addItemSchema: {productId: uuid, quantity: int min 1}
- updateItemSchema: {quantity: int min 1}

**Actualizar src/routes/:** conectar todos los controllers con auth middleware donde corresponda.

### FRONTEND:

**src/services/authService.ts:**
- register(data) → POST /auth/register
- login(data) → POST /auth/login
- getMe() → GET /auth/me

**src/services/cartService.ts:**
- getCart() → GET /cart
- addItem(productId, quantity) → POST /cart/items
- updateItem(itemId, quantity) → PATCH /cart/items/:id
- removeItem(itemId) → DELETE /cart/items/:id

**src/store/authStore.ts (Zustand):**
- State: user (User | null), token (string | null), loading (boolean)
- Actions: login(email, password), register(name, email, password), logout(), loadUser()
- Token se guarda en memoria (store) — NO en localStorage
- login/register: llaman al service, guardan user y token, setean token en axios defaults
- logout: limpian state, eliminan token de axios
- loadUser: si hay token, llama getMe para recuperar el user

**src/store/cartStore.ts (Zustand):**
- State: items (CartItem[]), loading (boolean), totalItems (computed), totalPrice (computed)
- Actions: fetchCart(), addItem(productId, qty), updateItem(itemId, qty), removeItem(itemId)
- Cada action llama al backend y actualiza el estado local con la respuesta
- totalItems: sum de quantities
- totalPrice: sum de item.product.price * item.quantity

**Actualizar src/services/api.ts:**
- Interceptor de request: si hay token en authStore, agregarlo como Bearer
- Interceptor de response: si 401, hacer logout

**src/components/auth/AuthForm.tsx:**
- Props: mode ("login" | "register")
- Formulario con inputs estilizados (bg surface, border, focus:accent)
- Login: email + password + botón "Iniciar sesión"
- Register: nombre + email + password + confirmar password + botón "Crear cuenta"
- Toggle link: "¿No tenés cuenta? Registrate" / "¿Ya tenés cuenta? Iniciá sesión"
- Loading state en botón
- Error messages del backend mostrados
- onSubmit: llama authStore.login o authStore.register, redirect a / on success

**src/components/auth/ProtectedRoute.tsx:**
- Si no hay user en authStore → redirect a /login
- Si hay user → render children
- Mostrar loader mientras carga

**src/components/cart/CartDrawer.tsx:**
- Sidebar derecho que se desliza (fixed, z-50, bg card, border-l)
- Header: "Tu carrito" + botón X cerrar
- Lista de CartItems
- Subtotal abajo (font mono, grande)
- Botón "Ver carrito" → /cart
- Botón "Checkout" → /checkout
- Si vacío: mensaje "Tu carrito está vacío" con link a /shop
- Animación slide-in/out con transition

**src/components/cart/CartItem.tsx:**
- Imagen mini (64x64), nombre producto, marca dim
- QuantitySelector (botones -/+ con input)
- Precio (price * quantity, font mono)
- Botón eliminar (ícono X, hover red)

**src/components/cart/QuantitySelector.tsx:**
- Props: value, min (1), max (stock), onChange
- Botón "-" (disabled si value <= min)
- Input numérico readonly
- Botón "+" (disabled si value >= max)
- Estilo compacto: bg surface, border, rounded

**Actualizar Navbar.tsx:**
- Si hay user: mostrar avatar/nombre + dropdown (Perfil, Mis órdenes, Cerrar sesión)
- Si no hay user: botón "Iniciar sesión" → /login
- Ícono carrito: mostrar badge con totalItems del cartStore
- Click en carrito: abrir CartDrawer

**src/pages/Login.tsx:**
- AuthForm mode="login"
- Centrado vertical y horizontal
- Redirect a / si ya está logueado

**src/pages/Register.tsx:**
- AuthForm mode="register"
- Mismo layout que login

**src/pages/Profile.tsx (protegida):**
- Tabs: "Mis datos" | "Mis órdenes"
- Tab datos: nombre, email (readonly), botón guardar (placeholder)
- Tab órdenes: placeholder "Historial de órdenes — Coming in Week 4"

**src/pages/Cart.tsx (COMPLETA):**
- Si no logueado: mensaje con CTA a login
- Lista de items con CartItem component
- Resumen lateral: subtotal, envío (placeholder), total
- Botón "Continuar al checkout" → /checkout
- Botón "Seguir comprando" → /shop
- Si vacío: ilustración/mensaje + CTA a /shop

**Actualizar ProductDetail.tsx:**
- Botón "Agregar al carrito": si logueado, llama cartStore.addItem. Si no, redirigir a login.
- Después de agregar: abrir CartDrawer automáticamente

### CRITERIOS DE VERIFICACIÓN
1. POST /api/auth/register crea usuario y devuelve JWT
2. POST /api/auth/login devuelve JWT válido
3. GET /api/auth/me con Bearer token devuelve el usuario
4. Requests sin token a rutas protegidas devuelven 401
5. Login/Register pages funcionan end-to-end
6. Después de login, Navbar muestra nombre de usuario
7. Agregar producto al carrito desde ProductDetail funciona
8. CartDrawer se abre y muestra items
9. Modificar cantidad actualiza precio
10. Eliminar item funciona
11. /cart muestra el carrito completo con totales
12. Logout limpia todo el estado
13. ProtectedRoute redirige a /login correctamente

Generá todos los archivos completos. Dividí si es necesario.`}</CopyBlock>
  </>;
}

function Semana4() {
  return <>
    <H>PROMPT — SEMANA 4: Checkout, Órdenes, Polish & Deploy-Ready</H>
    <p style={{ color:C.dim, fontSize:12, marginBottom:16 }}>Este prompt genera: checkout completo, órdenes, contacto, error handling, loading states, responsive final, y build de producción.</p>
    <CopyBlock label="PROMPT COMPLETO — COPIAR Y PEGAR">{`Actúa como un fullstack developer senior. SEMANA 4 (final) de "Prometeo Tattoo", ecommerce de insumos para tatuadores.

## CONTEXTO COMPLETO (semanas 1-3 implementadas)
- Monorepo Docker: frontend (React+TS+Vite+Tailwind :5173) + backend (Express+TS+Prisma :4000) + PostgreSQL
- DB: User, Category, Product, Cart, CartItem, Order, OrderItem
- API: productos (filtros, paginación, sort, slug), categorías, auth (register, login, me con JWT), cart CRUD
- Frontend: Home (hero, categorías, featured), Shop (filtros, search, grid, paginación, sort), ProductDetail, Login, Register, Profile, Cart, Navbar con auth + cart badge, CartDrawer, Footer
- Zustand: authStore (user, token, login, logout), cartStore (items, add, update, remove, totals)
- Dark theme: bg #0a0a0a, accent #c62828, gold #d4a24e, fonts Bebas Neue / DM Sans / JetBrains Mono

## TAREA — SEMANA 4: CHECKOUT + ORDERS + POLISH

### BACKEND:

**src/services/orderService.ts:**
- createOrder(userId, address, phone, notes?):
  1. Buscar cart del user con items (include product)
  2. Validar que el cart no esté vacío (400 si lo está)
  3. Validar stock de cada producto (400 si alguno no tiene stock)
  4. Calcular total: sum(item.quantity * item.product.price)
  5. Crear Order con OrderItems (guardar precio actual del producto)
  6. Decrementar stock de cada producto
  7. Limpiar el carrito del user
  8. Retornar la orden completa
  Todo dentro de una transacción Prisma (prisma.$transaction)

- getOrders(userId): órdenes del user, ordenadas por fecha desc, include items con producto
- getOrderById(orderId, userId): una orden específica, validar que pertenece al user

**src/controllers/orderController.ts:**
- POST / → createOrder (auth required), body: {address, phone, notes?}
- GET / → getOrders (auth required)
- GET /:id → getOrderById (auth required)

**src/schemas/orderSchema.ts:**
- createOrderSchema: {address: string min 5, phone: string min 8, notes?: string}

**Conectar rutas en src/routes/orderRoutes.ts con auth middleware.**

### FRONTEND:

**src/services/orderService.ts:**
- createOrder(data) → POST /orders
- getOrders() → GET /orders
- getOrderById(id) → GET /orders/:id

**src/pages/Checkout.tsx (COMPLETA):**
- Protegida (requiere auth)
- Si carrito vacío → redirect a /shop con mensaje
- Layout: formulario izquierda + resumen derecha
- Step indicator visual: 1. Envío → 2. Revisión → 3. Confirmación
- Step 1 - Envío:
  - Inputs: nombre completo (prellenado), dirección, ciudad, código postal, teléfono
  - Validación con Zod en frontend
  - Botón "Continuar"
- Step 2 - Revisión:
  - Lista de productos del carrito (imagen mini, nombre, qty, precio)
  - Dirección de envío mostrada
  - Subtotal, envío ($0 placeholder), total
  - Botón "Confirmar pedido" + botón "Volver"
- Step 3 - Confirmación:
  - Mensaje de éxito con ícono check verde
  - Número de orden
  - Resumen del pedido
  - Botón "Ver mis órdenes" → /profile (tab órdenes)
  - Botón "Seguir comprando" → /shop
- Loading state en el botón de confirmar
- Error handling: mostrar mensaje si falla

**src/components/ui/StepIndicator.tsx:**
- Props: steps string[], currentStep number
- Visual: círculos numerados conectados con línea
- Paso activo: accent color, bold. Completados: green. Futuros: muted
- Responsive: horizontal en desktop, simplificado en mobile

**Actualizar src/pages/Profile.tsx:**
- Tab "Mis órdenes" (reemplazar placeholder):
  - Fetch de /orders
  - Lista de OrderCards con: fecha, #orden, total, status badge, cantidad de items
  - Click en orden → expandir detalle inline (items, dirección, teléfono)
  - StatusBadge colores: PENDING amarillo, CONFIRMED blue, SHIPPED cyan, DELIVERED green, CANCELLED red
  - Si no hay órdenes: mensaje "Aún no tenés pedidos" + CTA shop

**src/components/ui/StatusBadge.tsx:**
- Props: status (OrderStatus)
- Mapeo de colores por status
- Texto en español: Pendiente, Confirmado, Enviado, Entregado, Cancelado

**src/pages/Contact.tsx (COMPLETA):**
- Layout 2 columnas:
  - Izquierda: formulario (nombre, email, asunto, mensaje, botón enviar)
  - Derecha: info de contacto (dirección ficticia, teléfono, email, horarios)
- Formulario: validación frontend, estado de envío (placeholder, no necesita backend real)
- Mensaje de éxito después de "enviar"

### POLISH & ERROR HANDLING:

**src/components/ui/ErrorBoundary.tsx:**
- Class component que atrapa errores de render
- UI de fallback: "Algo salió mal" + botón reintentar

**Error handling global frontend:**
- Axios interceptor: si error de red → toast "Error de conexión"
- 404 en ProductDetail → página NotFound
- 400/422 en formularios → mostrar errores inline

**Loading states:**
- Revisar TODAS las páginas: cada fetch debe tener skeleton o spinner
- Home: skeletons en featured products y categorías
- Shop: skeleton grid mientras carga
- ProductDetail: skeleton layout
- Cart: skeleton mientras carga
- Profile/Orders: skeleton lista

**Responsive audit:**
- Navbar: hamburger menu en mobile con drawer
- Shop: filtros en modal/bottom-sheet en mobile
- ProductDetail: stack vertical en mobile (imagen arriba, info abajo)
- Cart: stack vertical, resumen debajo de items
- Checkout: stack vertical, resumen colapsable
- Footer: stack vertical en mobile

**SEO básico:**
- document.title dinámico por página (useEffect)
- Home: "Prometeo Tattoo — Insumos profesionales para tatuadores"
- Shop: "Catálogo — Prometeo Tattoo"
- Product: "{nombre} — Prometeo Tattoo"

### BUILD DE PRODUCCIÓN:

**frontend/Dockerfile.prod:**
- Multi-stage: build con node → serve con nginx
- Copiar dist a nginx html

**backend/Dockerfile.prod:**
- Build TypeScript → run dist/server.js con node

**docker-compose.prod.yml:**
- Frontend: build prod, no volumes
- Backend: build prod, volumes solo para uploads
- Database: con healthcheck
- Sin puertos expuestos innecesarios

### CRITERIOS DE VERIFICACIÓN
1. Checkout flow completo: formulario → revisión → confirmar → orden creada
2. Stock se decrementa al crear orden
3. Carrito se vacía después de checkout
4. Profile muestra historial de órdenes real
5. StatusBadge muestra colores correctos
6. Contact page funcional con validación
7. Error handling: 404 muestra NotFound, errores de red muestran toast
8. Todas las páginas tienen loading states (no blank screens)
9. Mobile responsive en todas las páginas
10. Títulos de página dinámicos
11. docker compose -f docker-compose.prod.yml up --build funciona
12. Frontend build de producción sin errores de TypeScript

Generá todos los archivos completos. Si es mucho, dividí y avisame.`}</CopyBlock>
  </>;
}

function Requerimientos() {
  return <>
    <H>Análisis de Requerimientos Funcionales</H>
    {[
      { area: "Catálogo de productos", reqs: [
        "RF-01: El sistema debe mostrar productos con imagen, nombre, precio, marca y categoría",
        "RF-02: El usuario debe poder filtrar productos por categoría, marca y rango de precio",
        "RF-03: El usuario debe poder buscar productos por texto (nombre y descripción)",
        "RF-04: El sistema debe paginar resultados (12 por página configurable)",
        "RF-05: El usuario debe poder ordenar por precio, nombre y fecha",
        "RF-06: El sistema debe mostrar detalle completo de un producto en página dedicada",
        "RF-07: El sistema debe mostrar productos relacionados (misma categoría)",
        "RF-08: El sistema debe mostrar productos destacados en el home",
      ]},
      { area: "Autenticación", reqs: [
        "RF-09: El usuario debe poder registrarse con nombre, email y password",
        "RF-10: El sistema debe validar unicidad de email y formato de datos",
        "RF-11: El usuario debe poder iniciar sesión con email y password",
        "RF-12: El sistema debe emitir JWT con expiración de 7 días",
        "RF-13: Las rutas protegidas deben requerir token válido",
        "RF-14: El sistema debe tener roles: CUSTOMER y ADMIN",
      ]},
      { area: "Carrito de compras", reqs: [
        "RF-15: El usuario autenticado debe poder agregar productos al carrito",
        "RF-16: El sistema debe validar stock disponible al agregar",
        "RF-17: El usuario debe poder modificar cantidad de items",
        "RF-18: El usuario debe poder eliminar items del carrito",
        "RF-19: El carrito debe persistir en base de datos (no localStorage)",
        "RF-20: El sistema debe calcular subtotal y total en tiempo real",
        "RF-21: El carrito debe ser accesible desde un drawer lateral",
      ]},
      { area: "Checkout y órdenes", reqs: [
        "RF-22: El checkout debe requerir autenticación",
        "RF-23: El usuario debe ingresar dirección de envío y teléfono",
        "RF-24: El sistema debe mostrar resumen antes de confirmar",
        "RF-25: Al confirmar: crear orden, decrementar stock, vaciar carrito (transacción)",
        "RF-26: El usuario debe poder ver historial de órdenes en su perfil",
        "RF-27: Cada orden debe tener estado: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED",
      ]},
      { area: "Interfaz y UX", reqs: [
        "RF-28: Dark theme obligatorio con paleta definida",
        "RF-29: Responsive design (mobile-first)",
        "RF-30: Loading states (skeletons) en todas las cargas",
        "RF-31: Manejo de errores con feedback visual al usuario",
        "RF-32: Navegación con breadcrumbs en páginas de detalle",
        "RF-33: SEO básico: títulos dinámicos por página",
      ]},
      { area: "Infraestructura", reqs: [
        "RF-34: El proyecto debe correr con docker compose up --build",
        "RF-35: Debe funcionar igual en macOS, Windows y Linux",
        "RF-36: Base de datos con seed de datos iniciales",
        "RF-37: Configuración por variables de entorno (.env)",
        "RF-38: Build de producción optimizado (multi-stage Docker)",
      ]},
    ].map((group, gi) => <div key={gi} style={{ marginBottom: 20 }}>
      <Box>
        <div style={{ color: C.gold, fontWeight: 700, fontSize: 12, fontFamily: mono, marginBottom: 10 }}>{group.area.toUpperCase()}</div>
        {group.reqs.map((r, ri) => <div key={ri} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 12, color: C.dim, borderBottom: ri < group.reqs.length - 1 ? `1px solid ${C.border}` : "none" }}>
          <span style={{ color: C.accent, fontFamily: mono, fontSize: 11, minWidth: 48 }}>{r.split(":")[0]}</span>
          <span>{r.split(":").slice(1).join(":")}</span>
        </div>)}
      </Box>
    </div>)}

    <H>Requerimientos No Funcionales</H>
    <Box>
      {[
        "RNF-01: Tiempo de respuesta API < 200ms para consultas simples",
        "RNF-02: Frontend bundle < 500KB gzipped",
        "RNF-03: Passwords hasheados con bcrypt (10 rounds mínimo)",
        "RNF-04: JWT con expiración, no tokens permanentes",
        "RNF-05: Rate limiting en endpoints sensibles (auth)",
        "RNF-06: CORS configurado, helmet habilitado",
        "RNF-07: TypeScript strict mode en frontend y backend",
        "RNF-08: Prisma migrations versionadas en Git",
        "RNF-09: Variables sensibles nunca en código, solo en .env",
        "RNF-10: Imágenes optimizadas con lazy loading",
      ].map((r, i) => <div key={i} style={{ padding: "4px 0", fontSize: 12, color: C.dim, borderBottom: i < 9 ? `1px solid ${C.border}` : "none" }}>
        <span style={{ color: C.blue, fontFamily: mono, fontSize: 11 }}>{r.split(":")[0]}</span>: {r.split(":").slice(1).join(":")}
      </div>)}
    </Box>
  </>;
}

function Criterios() {
  return <>
    <H>Criterios de aceptación por funcionalidad</H>
    {[
      { feat: "Home page", tests: [
        "DADO que el usuario accede a /, ENTONCES ve hero banner, 9 categorías y productos destacados",
        "DADO que hace click en una categoría, ENTONCES navega a /shop?category=slug",
        "DADO que hace click en 'Ver catálogo', ENTONCES navega a /shop",
      ]},
      { feat: "Catálogo (Shop)", tests: [
        "DADO que el usuario accede a /shop, ENTONCES ve grid de productos con paginación",
        "CUANDO selecciona categoría 'Tintas', ENTONCES solo se muestran tintas y la URL se actualiza",
        "CUANDO escribe 'eternal' en search, ENTONCES se filtran productos con debounce 300ms",
        "CUANDO selecciona 'Precio ↑', ENTONCES los productos se reordenan por precio ascendente",
        "CUANDO no hay resultados, ENTONCES muestra mensaje 'No se encontraron productos'",
        "CUANDO está cargando, ENTONCES muestra skeleton grid (8 cards animadas)",
      ]},
      { feat: "Detalle de producto", tests: [
        "DADO que accede a /product/tinta-eternal-black, ENTONCES ve imagen, nombre, marca, precio, stock y descripción",
        "DADO que el producto tiene stock > 0, ENTONCES muestra 'X unidades disponibles' en verde",
        "DADO que el producto tiene stock = 0, ENTONCES muestra 'Sin stock' en rojo y botón deshabilitado",
        "DADO que accede a un slug inexistente, ENTONCES muestra página 404",
      ]},
      { feat: "Autenticación", tests: [
        "DADO que un usuario nuevo completa el registro, ENTONCES se crea la cuenta y se loguea automáticamente",
        "DADO un email ya registrado, ENTONCES muestra error 'Email ya registrado'",
        "DADO credenciales correctas en login, ENTONCES se loguea y redirige a /",
        "DADO credenciales incorrectas, ENTONCES muestra error sin revelar qué campo falló",
        "DADO un usuario logueado, ENTONCES Navbar muestra su nombre y opciones",
        "DADO que hace logout, ENTONCES se limpia el estado y redirige a /",
      ]},
      { feat: "Carrito", tests: [
        "DADO usuario logueado en ProductDetail, CUANDO hace click en 'Agregar', ENTONCES el item aparece en CartDrawer",
        "DADO que el item ya está en el carrito, CUANDO agrega de nuevo, ENTONCES incrementa la cantidad",
        "DADO CartDrawer abierto, CUANDO modifica cantidad, ENTONCES se actualiza precio y total",
        "DADO CartDrawer abierto, CUANDO elimina item, ENTONCES desaparece del carrito",
        "DADO usuario no logueado, CUANDO intenta agregar al carrito, ENTONCES redirige a /login",
        "DADO carrito vacío, ENTONCES muestra mensaje con link a /shop",
      ]},
      { feat: "Checkout", tests: [
        "DADO usuario logueado con items en carrito, CUANDO accede a /checkout, ENTONCES ve formulario de envío",
        "CUANDO completa datos válidos y avanza, ENTONCES ve resumen con productos y total",
        "CUANDO confirma el pedido, ENTONCES se crea la orden, se decrementa stock y se vacía el carrito",
        "CUANDO el pedido se crea exitosamente, ENTONCES ve pantalla de confirmación con número de orden",
        "DADO carrito vacío, CUANDO accede a /checkout, ENTONCES redirige a /shop",
        "DADO error de stock, ENTONCES muestra mensaje indicando qué producto no tiene stock",
      ]},
      { feat: "Perfil y órdenes", tests: [
        "DADO usuario logueado en /profile, ENTONCES ve sus datos y tab de órdenes",
        "DADO que tiene órdenes, ENTONCES las ve listadas con fecha, total y estado",
        "DADO que hace click en una orden, ENTONCES ve el detalle con items",
        "DADO que no tiene órdenes, ENTONCES ve mensaje 'Aún no tenés pedidos'",
      ]},
      { feat: "Responsive", tests: [
        "DADO viewport mobile (375px), ENTONCES Navbar muestra hamburger menu",
        "DADO viewport mobile en /shop, ENTONCES filtros están en modal, grid es 1 columna",
        "DADO viewport tablet (768px), ENTONCES grid es 2 columnas",
        "DADO viewport desktop (1280px), ENTONCES layout completo con sidebar filtros",
      ]},
      { feat: "Docker & Infra", tests: [
        "DADO un clone fresco del repo, CUANDO ejecuta docker compose up --build, ENTONCES los 3 servicios levantan",
        "DADO servicios corriendo, CUANDO ejecuta prisma migrate dev + seed, ENTONCES la DB tiene datos",
        "DADO un build de producción, CUANDO ejecuta docker compose -f prod, ENTONCES levanta con nginx",
      ]},
    ].map((group, gi) => <div key={gi} style={{ marginBottom: 16 }}>
      <Box>
        <div style={{ color: C.gold, fontWeight: 700, fontSize: 12, fontFamily: mono, marginBottom: 10 }}>{group.feat.toUpperCase()}</div>
        {group.tests.map((t, ti) => <div key={ti} style={{ padding: "5px 0", fontSize: 12, color: C.dim, borderBottom: ti < group.tests.length - 1 ? `1px solid ${C.border}` : "none", lineHeight: 1.6 }}>
          {t.split(/(DADO|CUANDO|ENTONCES)/).map((part, pi) =>
            ["DADO", "CUANDO", "ENTONCES"].includes(part)
              ? <strong key={pi} style={{ color: part === "DADO" ? C.blue : part === "CUANDO" ? C.gold : C.green, fontFamily: mono, fontSize: 11 }}>{part} </strong>
              : <span key={pi}>{part}</span>
          )}
        </div>)}
      </Box>
    </div>)}
  </>;
}

// ─── MAIN ───
const CONTENT = [Estrategia, Semana1, Semana2, Semana3, Semana4, Requerimientos, Criterios];

export default function App() {
  const [tab, setTab] = useState(0);
  const Tab = CONTENT[tab];
  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.text, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"22px 28px" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:14 }}>
          <h1 style={{ margin:0, fontSize:24, fontWeight:800, letterSpacing:-0.5 }}>
            <span style={{ color:C.accent }}>PROMETEO TATTOO</span>
          </h1>
          <span style={{ color:C.muted, fontSize:11, fontFamily:mono, letterSpacing:2 }}>PROMPTS & REQUERIMIENTOS</span>
        </div>
        <p style={{ color:C.dim, fontSize:12, margin:"5px 0 0" }}>Análisis de requerimientos + prompts de ejecución semana a semana — copiá y ejecutá</p>
      </div>
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"0 28px", display:"flex", overflowX:"auto" }}>
        {TABS.map((t,i) => <button key={i} onClick={()=>setTab(i)} style={{
          background:"none", border:"none", cursor:"pointer", padding:"11px 14px", fontSize:11, fontWeight:600,
          color: tab===i ? C.accent : C.dim, borderBottom: tab===i ? `2px solid ${C.accent}` : "2px solid transparent",
          fontFamily:mono, letterSpacing:0.5, whiteSpace:"nowrap",
        }}>{t}</button>)}
      </div>
      <div style={{ padding:"24px 28px", maxWidth:980 }}><Tab /></div>
      <div style={{ padding:"14px 28px", borderTop:`1px solid ${C.border}`, color:C.muted, fontSize:10, fontFamily:mono, textAlign:"center" }}>
        PROMETEO TATTOO — ANALYSIS & EXECUTION PROMPTS v1.0
      </div>
    </div>
  );
}
