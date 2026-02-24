/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // TypeScript - permitir builds incluso con errores de tipos
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Permitir desarrollo local
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],

  // Optimización de imágenes
  // Nota: En Netlify, usar unoptimized: true para evitar problemas con el Image Optimization
  images: {
    unoptimized: true, // Cambio temporal para Netlify
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.justingalushaphotography.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
