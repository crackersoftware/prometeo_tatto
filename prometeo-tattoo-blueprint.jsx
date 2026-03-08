import { useState } from "react";

const C = {
  bg: "#08080a", surface: "#111114", card: "#16161a", border: "#222228",
  accent: "#c62828", gold: "#d4a24e", blue: "#4a90d9",
  green: "#3d9970", text: "#ddd", dim: "#777", muted: "#444",
};
const font = `'Courier New', monospace`;

function Badge({ children, color = C.accent }) {
  return <span style={{ background: color + "18", color, padding: "2px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: font }}>{children}</span>;
}
function Section({ title, children }) {
  return <div style={{ marginBottom: 28 }}>
    <h3 style={{ color: C.gold, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, paddingBottom: 8, marginBottom: 16, fontFamily: font }}>{title}</h3>
    {children}
  </div>;
}
function Box({ children, accent, style }) {
  return <div style={{ background: C.card, border: `1px solid ${accent ? C.accent + "44" : C.border}`, borderRadius: 6, padding: "16px 20px", marginBottom: 12, ...style }}>{children}</div>;
}
function Code({ children }) {
  return <pre style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 5, padding: 14, fontSize: 11, lineHeight: 1.65, color: C.dim, margin: 0, overflowX: "auto", fontFamily: font }}>{children}</pre>;
}
function Tree({ items, depth = 0 }) {
  return <div style={{ fontFamily: font, fontSize: 11.5 }}>
    {items.map((it, i) => <div key={i}>
      <div style={{ padding: `2px 0 2px ${depth * 18}px`, color: it.c ? C.gold : C.dim }}>
        <span style={{ color: C.muted, marginRight: 5 }}>{it.c ? "+" : " "}</span>
        {it.n}{it.d && <span style={{ color: C.muted, marginLeft: 8 }}>// {it.d}</span>}
      </div>
      {it.c && <Tree items={it.c} depth={depth + 1} />}
    </div>)}
  </div>;
}

// ─── TAB: VISION ───
function Vision() {
  return <>
    <Section title="Que es Prometeo Tattoo">
      <Box><p style={{ color: C.text, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
        <strong style={{ color: C.accent }}>Prometeo Tattoo</strong> es un ecommerce especializado en venta de insumos profesionales para tatuadores. Tintas, agujas, maquinas, fuentes de poder, grips, transfer papers, aftercare y equipamiento completo.
      </p></Box>
    </Section>
    <Section title="Problema que resuelve">
      <Box><p style={{ color: C.dim, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
        Los tatuadores compran insumos en tiendas fisicas con stock limitado y precios inflados. Prometeo centraliza el catalogo, ofrece filtros inteligentes por marca y categoria, y simplifica la compra con checkout agil.
      </p></Box>
    </Section>
    <Section title="Publico objetivo">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[["Tatuadores PRO", "Compran por volumen, marcas especificas"], ["Aprendices", "Kits starter, guias, precios accesibles"], ["Estudios", "Compras recurrentes, cuentas corporativas"]].map(([t, d], i) =>
          <Box key={i}><div style={{ color: C.text, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{t}</div><div style={{ color: C.dim, fontSize: 12 }}>{d}</div></Box>
        )}
      </div>
    </Section>
    <Section title="Propuesta de valor">
      <Box accent>{["Catalogo completo de insumos tattoo", "Filtrado por categoria, marca y precio", "Checkout rapido con validacion", "100% responsive (mobile + desktop)", "Dockerizado: Mac, Windows, Linux", "Full TypeScript end-to-end", "Arquitectura escalable y profesional"].map((v, i) =>
        <div key={i} style={{ color: C.text, fontSize: 13, padding: "4px 0", display: "flex", gap: 8 }}><span style={{ color: C.accent }}>▹</span>{v}</div>
      )}</Box>
    </Section>
  </>;
}

// ─── TAB: STACK ───
function StackTab() {
  const stacks = [
    { name: "FRONTEND", color: C.blue, items: [["React 18", "Componentes, hooks, ecosistema maduro"], ["TypeScript", "Tipado estatico, menos bugs"], ["Vite", "Build ultrarapido, HMR"], ["TailwindCSS", "Utility-first, dark theme"], ["React Router v6", "Routing declarativo"], ["Zustand", "Estado global simple y tipado"], ["Axios", "HTTP client con interceptors"]] },
    { name: "BACKEND", color: C.green, items: [["Node.js 20 LTS", "Runtime JS servidor"], ["Express", "Framework HTTP flexible"], ["TypeScript", "Type safety compartido"], ["Prisma ORM", "Type-safe queries, migraciones"], ["JWT", "Auth stateless"], ["Zod", "Validacion runtime"], ["bcrypt", "Hash de passwords"], ["cors + helmet", "Seguridad HTTP"]] },
    { name: "INFRA", color: C.gold, items: [["Docker", "Contenedores portables"], ["Docker Compose", "Orquesta front+back+DB"], ["PostgreSQL 15", "Base robusta, relaciones"], ["tsx / nodemon", "Hot reload backend"]] },
  ];
  return <>{stacks.map((s, i) => <Section key={i} title={s.name}>
    <Box>{s.items.map(([n, d], j) => <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: j < s.items.length - 1 ? `1px solid ${C.border}` : "none" }}>
      <Badge color={s.color}>{n}</Badge><span style={{ color: C.dim, fontSize: 12 }}>{d}</span>
    </div>)}</Box>
  </Section>)}</>;
}

// ─── TAB: DOCKER ───
function DockerTab() {
  return <>
    <Section title="docker-compose.yml">
      <Code>{`version: "3.8"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:4000/api
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://prometeo:tattoo@database:5432/prometeo_db
      - JWT_SECRET=your-super-secret-key-change-in-production
      - PORT=4000
    depends_on:
      database:
        condition: service_healthy

  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: prometeo
      POSTGRES_PASSWORD: tattoo
      POSTGRES_DB: prometeo_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U prometeo"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:`}</Code>
    </Section>
    <Section title="Dockerfiles">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div><div style={{ color: C.blue, fontWeight: 700, marginBottom: 8, fontSize: 12, fontFamily: font }}>frontend/Dockerfile</div>
          <Code>{`FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]`}</Code></div>
        <div><div style={{ color: C.green, fontWeight: 700, marginBottom: 8, fontSize: 12, fontFamily: font }}>backend/Dockerfile</div>
          <Code>{`FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "dev"]`}</Code></div>
      </div>
    </Section>
    <Section title="Comandos esenciales">
      <Box>{[
        ["docker compose up --build", "Levantar todo (primera vez)"],
        ["docker compose up", "Levantar (ya buildeado)"],
        ["docker compose down", "Apagar todo"],
        ["docker compose down -v", "Apagar + borrar DB"],
        ["docker compose logs -f backend", "Ver logs backend"],
        ["docker exec -it <container> npx prisma migrate dev", "Correr migracion"],
        ["docker exec -it <container> npx prisma studio", "Abrir Prisma Studio (GUI)"],
      ].map(([cmd, desc], i) => <div key={i} style={{ display: "flex", gap: 12, padding: "5px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none", alignItems: "baseline", flexWrap: "wrap" }}>
        <code style={{ color: C.accent, fontSize: 11, fontFamily: font }}>{cmd}</code>
        <span style={{ color: C.dim, fontSize: 11 }}>{desc}</span>
      </div>)}</Box>
    </Section>
    <Section title=".env.example">
      <Code>{`POSTGRES_USER=prometeo
POSTGRES_PASSWORD=tattoo
POSTGRES_DB=prometeo_db
DATABASE_URL=postgresql://prometeo:tattoo@database:5432/prometeo_db
JWT_SECRET=cambiar-en-produccion
PORT=4000
VITE_API_URL=http://localhost:4000/api`}</Code>
    </Section>
  </>;
}

// ─── TAB: ESTRUCTURA ───
function EstructuraTab() {
  const fe = [{ n: "frontend/", c: [{ n: "src/", c: [
    { n: "components/", c: [{ n: "ui/", d: "Button, Input, Modal, Badge, Loader, Select" }, { n: "layout/", d: "Navbar, Footer, Sidebar, PageWrapper" }, { n: "product/", d: "ProductCard, ProductGrid, Filters, SearchBar" }, { n: "cart/", d: "CartDrawer, CartItem, CartSummary, QuantitySelector" }, { n: "auth/", d: "AuthForm, ProtectedRoute" }] },
    { n: "pages/", c: [{ n: "Home.tsx" }, { n: "Shop.tsx" }, { n: "ProductDetail.tsx" }, { n: "Cart.tsx" }, { n: "Checkout.tsx" }, { n: "Login.tsx" }, { n: "Register.tsx" }, { n: "Profile.tsx" }, { n: "Contact.tsx" }, { n: "NotFound.tsx" }] },
    { n: "hooks/", c: [{ n: "useCart.ts" }, { n: "useAuth.ts" }, { n: "useProducts.ts" }, { n: "useDebounce.ts" }] },
    { n: "services/", c: [{ n: "api.ts", d: "Axios instance + interceptors" }, { n: "productService.ts" }, { n: "authService.ts" }, { n: "cartService.ts" }, { n: "orderService.ts" }] },
    { n: "store/", c: [{ n: "cartStore.ts" }, { n: "authStore.ts" }, { n: "uiStore.ts" }] },
    { n: "types/", c: [{ n: "product.ts" }, { n: "user.ts" }, { n: "cart.ts" }, { n: "order.ts" }, { n: "api.ts" }] },
    { n: "utils/", d: "formatPrice, cn, validators" },
    { n: "assets/", c: [{ n: "images/" }, { n: "icons/" }] },
    { n: "styles/", d: "globals.css" },
    { n: "App.tsx" }, { n: "main.tsx" }, { n: "router.tsx" },
  ]}, { n: "public/" }, { n: "package.json" }, { n: "tsconfig.json" }, { n: "vite.config.ts" }, { n: "tailwind.config.ts" }, { n: "Dockerfile" }] }];

  const be = [{ n: "backend/", c: [{ n: "src/", c: [
    { n: "controllers/", c: [{ n: "productController.ts" }, { n: "authController.ts" }, { n: "cartController.ts" }, { n: "orderController.ts" }, { n: "categoryController.ts" }] },
    { n: "routes/", c: [{ n: "productRoutes.ts" }, { n: "authRoutes.ts" }, { n: "cartRoutes.ts" }, { n: "orderRoutes.ts" }, { n: "index.ts", d: "Agrupa rutas" }] },
    { n: "services/", c: [{ n: "productService.ts" }, { n: "authService.ts" }, { n: "cartService.ts" }, { n: "orderService.ts" }] },
    { n: "middlewares/", c: [{ n: "auth.ts" }, { n: "errorHandler.ts" }, { n: "validate.ts" }] },
    { n: "schemas/", d: "Zod schemas", c: [{ n: "productSchema.ts" }, { n: "authSchema.ts" }, { n: "cartSchema.ts" }, { n: "orderSchema.ts" }] },
    { n: "config/", c: [{ n: "env.ts" }, { n: "prisma.ts", d: "Prisma singleton" }] },
    { n: "utils/" }, { n: "app.ts" }, { n: "server.ts" },
  ]}, { n: "prisma/", c: [{ n: "schema.prisma" }, { n: "seed.ts" }, { n: "migrations/" }] }, { n: "package.json" }, { n: "tsconfig.json" }, { n: "Dockerfile" }] }];

  return <>
    <Section title="Raiz del proyecto">
      <Box><Tree items={[{ n: "prometeo-tattoo/", c: [{ n: "frontend/", d: "React+TS+Vite+Tailwind" }, { n: "backend/", d: "Node+Express+TS+Prisma" }, { n: "docker-compose.yml" }, { n: ".gitignore" }, { n: ".env.example" }, { n: "README.md" }] }]} /></Box>
    </Section>
    <Section title="Frontend"><Box><Tree items={fe} /></Box></Section>
    <Section title="Backend"><Box><Tree items={be} /></Box></Section>
  </>;
}

// ─── TAB: PAGINAS ───
function PaginasTab() {
  const pages = [
    { name: "Home", route: "/", desc: "Landing: hero banner, categorias, productos populares, CTA.", comps: "HeroBanner, CategoryGrid, FeaturedProducts", ux: "Scroll vertical. Hero → categorias → productos." },
    { name: "Shop", route: "/shop", desc: "Catalogo con filtros, busqueda, sort y paginacion.", comps: "SearchBar, Filters, ProductGrid, Pagination, Sort", ux: "2 columnas. Filtros colapsables en mobile." },
    { name: "ProductDetail", route: "/product/:slug", desc: "Galeria, info, precio, stock, add to cart, relacionados.", comps: "ImageGallery, ProductInfo, AddToCart, Related", ux: "Imagen izq, info der. Scroll → relacionados." },
    { name: "Cart", route: "/cart", desc: "Items, cantidades, totales, CTA checkout.", comps: "CartItemList, CartSummary, QuantitySelector", ux: "Lista clara. Update instantaneo." },
    { name: "Checkout", route: "/checkout", desc: "Envio, pago, resumen, confirmar.", comps: "ShippingForm, PaymentSelect, OrderSummary, Stepper", ux: "3 pasos: Envio → Pago → Confirmar." },
    { name: "Login", route: "/login", desc: "Auth email/password.", comps: "AuthForm, Input, Button", ux: "Form centrado. Link a registro." },
    { name: "Register", route: "/register", desc: "Registro nombre/email/pass.", comps: "AuthForm, Input, Button", ux: "Form centrado. Link a login." },
    { name: "Profile", route: "/profile", desc: "Datos, ordenes, direcciones. Protegida.", comps: "ProfileForm, OrderHistory, Tabs", ux: "Tabs internas." },
    { name: "Contact", route: "/contact", desc: "Formulario + info empresa.", comps: "ContactForm, CompanyInfo", ux: "Form simple." },
  ];
  return <>
    {pages.map((p, i) => <Section key={i} title={p.name}>
      <Box>
        <div style={{ marginBottom: 8 }}><Badge color={C.blue}>{p.route}</Badge></div>
        <p style={{ color: C.text, fontSize: 13, margin: "8px 0" }}>{p.desc}</p>
        <p style={{ color: C.dim, fontSize: 12, margin: "4px 0" }}><strong style={{ color: C.gold }}>Componentes:</strong> {p.comps}</p>
        <p style={{ color: C.dim, fontSize: 12, margin: "4px 0 0" }}><strong style={{ color: C.gold }}>UX:</strong> {p.ux}</p>
      </Box>
    </Section>)}
    <Section title="Flujo de compra">
      <Box accent><div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontSize: 12, alignItems: "center" }}>
        {["Home", "→", "Shop", "→", "Filtrar", "→", "Producto", "→", "Add Cart", "→", "Cart", "→", "Checkout", "→", "Orden OK"].map((s, i) =>
          <span key={i} style={{ color: s === "→" ? C.muted : C.text, fontWeight: s === "→" ? 400 : 700 }}>{s}</span>
        )}
      </div></Box>
    </Section>
  </>;
}

// ─── TAB: API & DB ───
function ApiTab() {
  const eps = [
    ["GET", "/api/products", "Listar (query: category, brand, search, sort, page)"],
    ["GET", "/api/products/:slug", "Detalle producto"],
    ["GET", "/api/categories", "Listar categorias"],
    ["POST", "/api/auth/register", "Registro (name, email, password)"],
    ["POST", "/api/auth/login", "Login → JWT"],
    ["GET", "/api/auth/me", "Usuario autenticado (JWT)"],
    ["GET", "/api/cart", "Ver carrito (JWT)"],
    ["POST", "/api/cart/items", "Agregar item (JWT)"],
    ["PATCH", "/api/cart/items/:id", "Update cantidad (JWT)"],
    ["DELETE", "/api/cart/items/:id", "Eliminar item (JWT)"],
    ["POST", "/api/orders", "Crear orden (JWT)"],
    ["GET", "/api/orders", "Historial ordenes (JWT)"],
    ["GET", "/api/orders/:id", "Detalle orden (JWT)"],
  ];
  const mc = { GET: C.green, POST: C.blue, PATCH: C.gold, DELETE: C.accent };
  return <>
    <Section title="Endpoints REST">
      <Box>{eps.map(([m, p, d], i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", borderBottom: i < eps.length - 1 ? `1px solid ${C.border}` : "none", flexWrap: "wrap" }}>
        <span style={{ background: mc[m] + "18", color: mc[m], padding: "2px 6px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: font, width: 50, textAlign: "center" }}>{m}</span>
        <code style={{ color: C.text, fontSize: 12, fontFamily: font, minWidth: 180 }}>{p}</code>
        <span style={{ color: C.dim, fontSize: 11 }}>{d}</span>
      </div>)}</Box>
    </Section>
    <Section title="Prisma Schema">
      <Code>{`generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(CUSTOMER)
  orders    Order[]
  cart      Cart?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
enum Role { CUSTOMER  ADMIN }

model Category {
  id       String    @id @default(uuid())
  name     String    @unique
  slug     String    @unique
  image    String?
  products Product[]
}

model Product {
  id          String      @id @default(uuid())
  name        String
  slug        String      @unique
  description String
  price       Float
  stock       Int         @default(0)
  image       String
  brand       String
  featured    Boolean     @default(false)
  category    Category    @relation(fields: [categoryId], references: [id])
  categoryId  String
  cartItems   CartItem[]
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Cart {
  id     String     @id @default(uuid())
  user   User       @relation(fields: [userId], references: [id])
  userId String     @unique
  items  CartItem[]
}

model CartItem {
  id        String  @id @default(uuid())
  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  cartId    String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int     @default(1)
  @@unique([cartId, productId])
}

model Order {
  id        String      @id @default(uuid())
  user      User        @relation(fields: [userId], references: [id])
  userId    String
  items     OrderItem[]
  total     Float
  status    OrderStatus @default(PENDING)
  address   String
  phone     String?
  notes     String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
enum OrderStatus { PENDING  CONFIRMED  SHIPPED  DELIVERED  CANCELLED }

model OrderItem {
  id        String  @id @default(uuid())
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Float
}`}</Code>
    </Section>
    <Section title="Categorias seed">
      <Box><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {["Tintas", "Agujas", "Maquinas", "Fuentes de poder", "Grips & Tips", "Transfer & Stencil", "Aftercare", "Mobiliario", "Accesorios"].map((c, i) =>
          <div key={i} style={{ background: C.bg, padding: "8px 12px", borderRadius: 4, color: C.dim, fontSize: 12, border: `1px solid ${C.border}` }}>{c}</div>
        )}
      </div></Box>
    </Section>
  </>;
}

// ─── TAB: COMPONENTES ───
function CompTab() {
  const comps = [
    ["Navbar", "Logo, links, SearchBar, icono carrito con badge, login/avatar"],
    ["Footer", "3 columnas: Categorias, Empresa, Soporte. Redes + copyright"],
    ["ProductCard", "Imagen, nombre, precio, badge categoria, hover, boton agregar"],
    ["ProductGrid", "Grid responsive: 4 cols desktop, 2 tablet, 1 mobile + skeleton"],
    ["Filters", "Checkboxes categoria, rango precio, filtro marca, limpiar filtros"],
    ["SearchBar", "Input debounce 300ms, icono lupa, boton clear"],
    ["CartDrawer", "Sidebar derecho deslizable, lista items, subtotal, CTAs"],
    ["CartItem", "Imagen mini, nombre, QuantitySelector, precio, eliminar"],
    ["QuantitySelector", "Botones +/- con input numerico, min 1 max stock"],
    ["Button", "Variantes: primary/secondary/ghost/danger. Sizes: sm/md/lg. Loading state"],
    ["Input", "Label flotante, error message, iconos opcionales. Forms compatible"],
    ["Modal", "Overlay animado. Cierra ESC + click fuera. Composable"],
    ["Badge", "Categoria, estado orden, notificacion. Colores por variante"],
    ["Loader", "Skeleton para cards/listas. Spinner para acciones"],
    ["Breadcrumb", "Home > Shop > Producto"],
    ["StepIndicator", "Pasos del checkout con paso activo resaltado"],
    ["ProtectedRoute", "Wrapper que redirige a /login si no hay JWT"],
  ];
  return <Section title="Componentes reutilizables">
    {comps.map(([n, d], i) => <Box key={i}>
      <span style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{n}</span>
      <div style={{ color: C.dim, fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>{d}</div>
    </Box>)}
  </Section>;
}

// ─── TAB: UI/UX ───
function UITab() {
  return <>
    <Section title="Paleta de colores">
      <Box><div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        {[["#0a0a0a", "Background"], ["#141414", "Surface"], ["#c62828", "Accent"], ["#d4a24e", "Gold"], ["#e8e8e8", "Text"]].map(([hex, name], i) =>
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ width: "100%", height: 44, background: hex, borderRadius: 6, border: `1px solid ${C.border}`, marginBottom: 4 }} />
            <div style={{ color: C.text, fontSize: 11, fontWeight: 700 }}>{name}</div>
            <div style={{ color: C.muted, fontSize: 10 }}>{hex}</div>
          </div>
        )}
      </div></Box>
    </Section>
    <Section title="Tipografia">
      <Box>
        <p style={{ color: C.dim, fontSize: 13, margin: "0 0 6px" }}><strong style={{ color: C.gold }}>Display:</strong> Bebas Neue o Oswald — condensada, impactante</p>
        <p style={{ color: C.dim, fontSize: 13, margin: "0 0 6px" }}><strong style={{ color: C.gold }}>Body:</strong> DM Sans o Outfit — limpia, legible</p>
        <p style={{ color: C.dim, fontSize: 13, margin: 0 }}><strong style={{ color: C.gold }}>Mono:</strong> JetBrains Mono — precios, codigo</p>
      </Box>
    </Section>
    <Section title="Estilo visual">
      <Box>
        {[["Theme", "Dark mode. Estetica industrial/tattoo shop"], ["Cards", "Bordes sutiles, hover glow rojo tenue, transicion 200ms"], ["Botones", "Primary rojo, secondary outline, radius 6px"], ["Espaciado", "Generoso: padding 16-24px cards, gap 12-16px grids"], ["Imagenes", "Ratio consistente 4:3 o 1:1. Object-fit cover"], ["Animaciones", "Fade-in scroll, hover scale 1.02, skeleton loaders"]].map(([t, d], i) =>
          <p key={i} style={{ color: C.dim, fontSize: 13, margin: "0 0 6px" }}><strong style={{ color: C.text }}>{t}:</strong> {d}</p>
        )}
      </Box>
    </Section>
    <Section title="Tailwind config">
      <Code>{`// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#141414",
        accent: "#c62828",
        gold: "#d4a24e",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
}`}</Code>
    </Section>
    <Section title="Assets necesarios">
      <Box><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[["Hero banner", "1920x600"], ["Fotos productos", "Tintas, agujas, maquinas"], ["Iconos categorias", "1 por categoria"], ["Logo SVG", "Light + dark"], ["Texturas", "Fondo tattoo-inspired"], ["Placeholder", "Default sin foto"]].map(([t, d], i) =>
          <div key={i} style={{ background: C.bg, padding: "8px 12px", borderRadius: 4, border: `1px solid ${C.border}` }}>
            <span style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{t}</span>
            <span style={{ color: C.muted, fontSize: 11, marginLeft: 8 }}>{d}</span>
          </div>
        )}
      </div></Box>
    </Section>
  </>;
}

// ─── TAB: ROADMAP ───
function RoadmapTab() {
  const weeks = [
    { w: 1, t: "Fundacion & Infra", c: C.accent, tasks: ["Repo Git + .gitignore", "Docker Compose setup", "Frontend: Vite+React+TS+Tailwind", "Backend: Express+TS+Prisma", "Prisma schema + migracion", "Seed categorias y productos", "Layout: Navbar + Footer", "React Router rutas", "Tailwind theme dark", "Home con hero estatico"] },
    { w: 2, t: "Catalogo & Productos", c: C.blue, tasks: ["API GET /products filtros", "API GET /products/:slug", "API GET /categories", "ProductCard componente", "ProductGrid responsive", "Shop layout 2 columnas", "Filters componente", "SearchBar + debounce", "ProductDetail pagina", "Paginacion + Sort", "Skeleton loaders", "Responsive catalogo"] },
    { w: 3, t: "Carrito, Auth & Estado", c: C.green, tasks: ["API auth register+login", "JWT middleware", "API cart CRUD", "Zustand authStore", "Zustand cartStore", "Login + Register pages", "ProtectedRoute", "CartDrawer sidebar", "Cart page completa", "QuantitySelector", "Axios JWT interceptor", "Profile basico"] },
    { w: 4, t: "Checkout, Polish & Deploy", c: C.gold, tasks: ["API orders CRUD", "Checkout + StepIndicator", "ShippingForm + Zod", "OrderSummary + confirm", "Historial ordenes", "Contacto page", "Error handling global", "Loading states", "Responsive audit", "README.md docs", "Docker prod build", "Testing basico"] },
  ];
  return <>
    {weeks.map((wk, i) => <Section key={i} title={`SEMANA ${wk.w} — ${wk.t}`}>
      <Box style={{ borderLeft: `3px solid ${wk.c}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {wk.tasks.map((t, j) => <div key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: C.dim, padding: "3px 0" }}>
            <span style={{ color: wk.c, fontSize: 8, marginTop: 5 }}>●</span>{t}
          </div>)}
        </div>
      </Box>
    </Section>)}
    <Section title="Entregable final">
      <Box accent><p style={{ color: C.text, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
        MVP funcional: catalogo, filtros, busqueda, carrito, auth JWT, checkout, ordenes. Dockerizado, portable (Mac/Win/Linux), TypeScript end-to-end, listo para escalar.
      </p></Box>
    </Section>
  </>;
}

// ─── TAB: MEJORAS ───
function MejorasTab() {
  const items = [
    ["Panel Admin", "CRUD productos, ordenes, dashboard metricas", "Alta"],
    ["Pagos", "MercadoPago/Stripe + webhooks", "Alta"],
    ["Reviews", "Rating + comentarios por producto", "Media"],
    ["Wishlist", "Lista deseos por usuario", "Media"],
    ["Emails", "Confirmacion orden, envio. Nodemailer/Resend", "Media"],
    ["Busqueda avanzada", "Full-text search PostgreSQL", "Baja"],
    ["PWA", "Offline + instalable", "Baja"],
    ["Analytics", "GA o Plausible + tracking conversiones", "Baja"],
    ["CI/CD", "GitHub Actions: lint, test, deploy", "Media"],
  ];
  const pc = { Alta: C.accent, Media: C.gold, Baja: C.dim };
  return <Section title="Mejoras futuras (post-MVP)">
    {items.map(([n, d, p], i) => <Box key={i}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{n}</span>
        <Badge color={pc[p]}>{p}</Badge>
      </div>
      <div style={{ color: C.dim, fontSize: 12 }}>{d}</div>
    </Box>)}
  </Section>;
}

// ─── MAIN ───
const TABS = ["Vision", "Stack", "Docker", "Estructura", "Paginas", "API & DB", "Componentes", "UI/UX", "Roadmap", "Mejoras"];
const CONTENT = [Vision, StackTab, DockerTab, EstructuraTab, PaginasTab, ApiTab, CompTab, UITab, RoadmapTab, MejorasTab];

export default function App() {
  const [tab, setTab] = useState(0);
  const Tab = CONTENT[tab];
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "24px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: C.accent }}>PROMETEO</span> <span style={{ color: C.text }}>TATTOO</span>
          </h1>
          <span style={{ color: C.muted, fontSize: 12, fontFamily: font, letterSpacing: 2 }}>BLUEPRINT v1.0</span>
        </div>
        <p style={{ color: C.dim, fontSize: 13, margin: "6px 0 0" }}>
          Arquitectura completa — React + TypeScript + Node.js + Docker — 30 dias
        </p>
      </div>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", overflowX: "auto" }}>
        {TABS.map((t, i) => <button key={i} onClick={() => setTab(i)} style={{
          background: "none", border: "none", cursor: "pointer", padding: "12px 16px", fontSize: 11, fontWeight: 600,
          color: tab === i ? C.accent : C.dim, borderBottom: tab === i ? `2px solid ${C.accent}` : "2px solid transparent",
          fontFamily: font, letterSpacing: 0.5, whiteSpace: "nowrap",
        }}>{t}</button>)}
      </div>
      <div style={{ padding: "28px 32px", maxWidth: 960 }}><Tab /></div>
      <div style={{ padding: "16px 32px", borderTop: `1px solid ${C.border}`, color: C.muted, fontSize: 10, fontFamily: font, textAlign: "center" }}>
        PROMETEO TATTOO — React + TS + Node + Express + Prisma + PostgreSQL + Docker
      </div>
    </div>
  );
}
