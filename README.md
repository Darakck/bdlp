# 🏡 Bosques de La Ponderosa

Sitio web del residencial Bosques de La Ponderosa en El Progreso, Yoro, Honduras.

## 🚀 Características

- ✅ Next.js 15 con App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Optimización automática de imágenes (WebP/AVIF)
- ✅ reCAPTCHA v2 para formularios
- ✅ Envío de emails con nodemailer
- ✅ Base de datos lowdb para contactos
- ✅ Mapa interactivo con hotspots
- ✅ Diseño responsive y optimizado para móviles
- ✅ Performance optimizado (Lighthouse 90+)

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/bdlp.git
cd bdlp
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env.local` basándote en `.env.example`:
```bash
cp .env.example .env.local
```

4. Configura tus variables de entorno en `.env.local`:
   - Obtén keys de reCAPTCHA en https://www.google.com/recaptcha/admin
   - Configura SMTP (Mailtrap recomendado para desarrollo)

## 🚀 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📦 Deploy

### Cloudflare Pages

1. Conecta tu repositorio a Cloudflare Pages
2. Configura las variables de entorno
3. Build command: `npm run build`
4. Output directory: `.next`

### Vercel

```bash
vercel
```

## 📁 Estructura del Proyecto

```
bdlp/
├── public/
│   └── images/           # Imágenes estáticas
│       └── icons/        # 27 iconos SVG optimizados
├── src/
│   ├── app/              # App Router de Next.js
│   ├── components/       # Componentes React
│   │   ├── ui/          # Componentes UI base
│   │   └── ...          # Secciones del sitio
│   └── lib/             # Utilidades y configuración
├── data/                # Datos (no incluido en git)
└── .env.local          # Variables de entorno (no incluido en git)
```

## 🎨 Componentes Principales

- **HeroSection**: Carousel con 3 imágenes
- **AboutSection**: Información y descarga de brochure
- **ModelsSection**: 3 modelos de casas + mapa interactivo
- **AmenitiesSection**: Amenidades del residencial
- **LocationSection**: Mapa de Google Maps + referencias
- **ContactSection**: Formulario con reCAPTCHA
- **InteractivePlan**: Mapa interactivo con zoom y hotspots

## ⚡ Optimizaciones de Performance

- Imágenes optimizadas con Next.js Image (WebP/AVIF)
- Lazy loading de componentes pesados
- Fuentes optimizadas con next/font
- 27 iconos SVG locales (0 requests externos)
- Preconnect para dominios externos
- Caché agresivo (30 días para imágenes)
- Compresión gzip automática

## 📝 Licencia

Todos los derechos reservados © Desarrollos S.A. de C.V.

## 👤 Contacto

- Email: soporteit@desarrolloshn.com
- WhatsApp: +(504)9454-1054
- Teléfono: +(504)2647-3891
