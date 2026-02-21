import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

// Optimizar fuentes con next/font
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bosques de La Ponderosa | Residencial en El Progreso, Yoro",
  description: "Tu nuevo hogar, una inversión en tu futuro. Residencial exclusivo con amenidades, seguridad 24/7 y ubicación privilegiada en El Progreso, Honduras.",
  keywords: "residencial, bosques de la ponderosa, el progreso, yoro, honduras, casas, vivienda, inmobiliaria",
  openGraph: {
    title: "Bosques de La Ponderosa",
    description: "Tu nuevo hogar, una inversión en tu futuro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://ext.same-assets.com" />
        
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
          strategy="lazyOnload"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        {/* reCAPTCHA script removed (using react-google-recaptcha v2 in the component) */}
      </head>
      <body suppressHydrationWarning className="antialiased overflow-x-hidden">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
