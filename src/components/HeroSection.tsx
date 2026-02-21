"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function HeroSection() {
  const heroImages = [
    "/images/render-portico-atardecer.png",
    "/images/bosques-entrada.jpg", // coloca esta imagen en public/images/
    siteConfig.hero.backgroundImage,
  ];
  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % heroImages.length);
  };

  // Auto-rotate carousel every 3s, pause on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [paused, heroImages.length]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Pasarela-style carousel: images side-by-side and slide horizontal */}
      <div
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="h-full flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeImage * 100}%)` }}
        >
          {heroImages.map((src, idx) => (
            <div
              key={src + idx}
              className="w-full flex-shrink-0 relative"
              aria-hidden={idx !== activeImage}
            >
              <Image
                src={src}
                alt={`Hero image ${idx + 1}`}
                fill
                priority={idx === 0}
                quality={85}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/30 z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow">
            {siteConfig.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl font-semibold drop-shadow">
            <span className="inline-block bg-secondary-custom text-primary-custom px-6 py-2 rounded-md shadow-lg">
              {siteConfig.hero.subtitle}
            </span>
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="bg-primary-custom hover:bg-primary-custom/90 text-white px-8 py-3 text-base"
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Aparta tu lote
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border-white/40 text-white px-8 py-3 text-base"
            onClick={() => {
              const el = document.querySelector('#location');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver ubicación
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="bg-primary-custom text-white px-4 py-6 md:px-8 md:py-10 md:w-1/2 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">Preventa de Lotes</h2>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-secondary-custom text-white px-4 py-6 md:px-8 md:py-10 md:w-1/2 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">Desde $160 v²</h2>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\s+/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all flex items-center space-x-2"
        >
          <div className="w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          <span className="hidden md:block text-sm font-medium">¿Necesitas ayuda?</span>
        </a>
      </div>
    </section>
  );
}
