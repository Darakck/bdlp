"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const recaptchaRef = useRef<any>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
      setMessage('Por favor completa los campos requeridos');
      return;
    }

    if (!recaptchaToken) {
      setMessage('Por favor verifica el reCAPTCHA');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const payload = {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        token: recaptchaToken,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error en el servidor');

      setMessage('Formulario enviado correctamente. Te contactaremos pronto.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      try { recaptchaRef.current?.reset(); } catch (_) {}
      setRecaptchaToken(null);
      setTimeout(() => setMessage(''), 5000);
    } catch (err: any) {
      console.error('Submit error', err);
      setMessage(err?.message || 'Error al enviar el formulario');
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/+50494541054?text=${encodeURIComponent("Hola! Estoy interesado en las propiedades de Bosques de La Ponderosa.")}`;
  const phoneUrl = "tel:+50426473891";

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Tu nuevo hogar te espera.
              </h2>
              <h3 className="text-xl text-gray-700 mb-6">
                Da el primer paso para conocerlo.
              </h3>
              <p className="text-secondary-custom text-sm leading-relaxed">
                Completa el formulario y te contactaremos de inmediato para ofrecerte una cotización personalizada o agendar tu visita.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre*"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-custom"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellidos*"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-custom"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-custom"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono*"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-custom"
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Mensaje"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-custom resize-none"
              ></textarea>

              {/* reCAPTCHA v2 checkbox */}
              <div className="flex items-center justify-center border border-gray-300 p-3 rounded">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={siteConfig.recaptcha.siteKey}
                  onChange={(token: string | null) => setRecaptchaToken(token)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-custom hover:bg-primary-custom/90 text-white py-3 font-semibold rounded"
              >
                ¡QUIERO MI COTIZACIÓN!
              </Button>
            </form>
          </div>

          {/* Agent Info */}
          <div className="bg-primary-custom rounded-lg p-8 text-white text-center">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded overflow-hidden relative">
                <Image
                  src="/images/desarrollos-logo.png"
                  alt="Desarrollos S.A. de C.V."
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Desarrollos S.A. de C.V.</h3>

              <div className="space-y-2 mb-8">
                <p className="text-sm">
                  <span className="font-semibold">Whatsapp:</span> +(504)9454-1054
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Teléfono:</span> +(504)2647-3891
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#7c9e6d] hover:bg-[#6b8a5c] text-white px-4 py-3 rounded font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Image
                    src="/images/whatsapp-icon.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span>ESCRÍBENOS</span>
                </a>
                <a
                  href={phoneUrl}
                  className="bg-white text-primary-custom hover:bg-gray-100 px-4 py-3 rounded font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📞</span>
                  <span>LLÁMANOS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
