"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { siteConfig } from "@/lib/config";

export function AboutSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setMessage("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Check reCAPTCHA v2 checkbox token (must be completed by user)
      if (!recaptchaToken) {
        setMessage("Por favor verifica el reCAPTCHA antes de descargar.");
        setIsLoading(false);
        return;
      }

      // Aquí puedes enviar los datos a tu servidor si lo deseas
      // await fetch('/api/download-brochure', {
      //   method: 'POST',
      //   body: JSON.stringify({ ...formData, token }),
      // });

      // Descargar el PDF (usa encodeURI para manejar espacios/caracteres)
      const link = document.createElement('a');
      link.href = encodeURI(siteConfig.brochure.filePath);
      link.download = siteConfig.brochure.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessage("¡Descarga iniciada! Revisa tu carpeta de descargas.");
      
      // Reset form
      setFormData({ name: "", email: "", phone: "" });
      // Reset reCAPTCHA widget
      try {
        recaptchaRef.current?.reset();
      } catch (err) {
        // ignore
      }
      setRecaptchaToken(null);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error('Download error:', error);
      setMessage("Error al descargar. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom section-padding">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Tu nuevo hogar, una inversión en tu futuro.
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            En <span className="font-semibold text-primary-custom">Bosques de La Ponderosa</span> descubre la tranquilidad y plusvalía de un desarrollo inmobiliario único en El Progreso.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="bg-primary-custom text-white p-8 rounded-lg">
              <p className="text-sm leading-relaxed mb-4">
                En Bosques de La Ponderosa, la seguridad de tu familia es nuestra prioridad. Por eso contamos con tecnología de última generación y un sistema de acceso restringido que te permite vivir con total confianza y paz.
              </p>

              <p className="text-sm leading-relaxed mb-4">
                Diseñado para la vida en familia, la residencial cuenta con amplias áreas verdes, parques infantiles, espacios recreativos y viviendas modernas que responden a las necesidades de tu hogar.
              </p>

              <p className="text-sm leading-relaxed">
                Además, su ubicación privilegiada en El Progreso te permite tener todo a tu alcance: centros educativos, servicios de salud, financieros, comercios, principales vías de acceso y la cercanía a Distrito Sur, la zona de mayor plusvalía de la ciudad.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/images/quincy-penthouse-kitchen.webp"
              alt="Modern Living Room"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
              quality={85}
            />
            {/* Navigation arrows for image carousel */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Brochure Download Section */}
        <div className="bg-secondary-custom rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                DESCARGA NUESTRO<br />
                BROCHURE:
              </h3>
            </div>

            {/* Right Form */}
            <div className="space-y-4">
              <form onSubmit={handleDownload} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre*"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:border-white"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:border-white"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono*"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:border-white"
                  required
                />

                {/* reCAPTCHA Info */}
                <div className="flex items-center space-x-3 bg-white/20 p-3 rounded text-white text-xs">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.72a1.066 1.066 0 01-2.131 0v-6.72c0-.566-.566-1.034-1.066-1.034a1.066 1.066 0 00-.1 2.131v.822c0 .566-.566 1.033-1.066 1.033H7.3c-.566 0-1.066-.466-1.066-1.033v-.822A1.065 1.065 0 004.07 4.11c-.5 0-1.066.368-1.066 1.035v6.71a1.066 1.066 0 01-2.131 0v-6.71c0-1.591.895-2.979 2.195-3.656z" clipRule="evenodd" />
                  </svg>
                  <span>Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Política de Privacidad</a> y <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Términos de Servicio</a> de Google.</span>
                </div>

                {/* reCAPTCHA v2 checkbox */}
                <div className="flex justify-center pt-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteConfig.recaptcha.siteKey}
                    onChange={(token: string | null) => setRecaptchaToken(token)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-custom text-white py-3 rounded font-semibold hover:bg-primary-custom/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Descargando..." : "Descargar"}
                </button>
              </form>

              {/* Message */}
              {message && (
                <div className={`p-3 rounded text-sm text-white text-center ${message.includes("Error") ? "bg-red-500/50" : "bg-green-500/50"}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
