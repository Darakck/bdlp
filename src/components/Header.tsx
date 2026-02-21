"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container-custom section-padding">
        <div className="relative flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#hero"
              aria-label="Ir al inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="inline-flex items-center"
            >
              <img
                src="/images/bosques-ponderosa-logo.png"
                alt="Bosques de la Ponderosa"
                className="w-auto object-contain shrink-0 h-44 sm:h-48 lg:h-52"
                loading="eager"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12 uppercase tracking-wide text-base">
            {siteConfig.navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-primary-custom transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir menú de navegación"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {isMobileMenuOpen ? (
            <div className="absolute top-full left-0 right-0 mt-3 rounded-lg border border-gray-200 bg-white shadow-md md:hidden">
              <nav className="flex flex-col px-6 py-4 space-y-4">
                {siteConfig.navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-base font-medium text-gray-700 hover:text-primary-custom transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
