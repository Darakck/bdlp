"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LocationSection() {
  const [selectedTransport, setSelectedTransport] = useState("car");

  const transportMethods = [
    { id: "car", icon: "🚗", label: "Automóvil" },
    { id: "bike", icon: "🚴", label: "Bicicleta" },
    { id: "walk", icon: "🚶", label: "Caminando" },
  ];

  const references = {
    car: [
      { name: "Centro de El Progreso", time: "10 min" },
      { name: "Distrito Sur", time: "1 min" },
      { name: "Aeropuerto Ramon Villeda Morales", time: "25 min" },
    ],
    bike: [
      { name: "Centro de El Progreso", time: "25 min" },
      { name: "Distrito Sur", time: "4 min" },
      { name: "Aeropuerto Ramon Villeda Morales", time: "45 min" },
    ],
    walk: [
      { name: "Distrito Sur", time: "10 min" },
      { name: "Plaza 1804", time: "10 min" },
      { name: "Plaza Redmil", time: "5 min" },
      { name: "Discovery School", time: "15 min" },
    ],
  };

  return (
    <section id="location" className="py-12 md:py-20 bg-white">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map */}
          <div className="relative rounded-lg shadow-lg overflow-hidden" style={{ height: '450px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8880.260953202078!2d-87.80363967524387!3d15.363391193170528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6615005af4f2cb%3A0x3638541baf1d31d5!2sResidencial%20Bosques%20de%20la%20Ponderosa!5e1!3m2!1ses-419!2shn!4v1768338728712!5m2!1ses-419!2shn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de Residencial Bosques de la Ponderosa"
            ></iframe>
          </div>

          {/* Location Info */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                Ubicación privilegiada en El Progreso
              </h2>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary-custom mb-4 md:mb-6">
                VIVE CERCA DE TODO LO QUE IMPORTA EN BOSQUES DE LA PONDEROSA
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                A solo minutos de las mejores escuelas, centros comerciales y servicios, Bosques de La Ponderosa te ofrece la conveniencia de la ciudad con la tranquilidad de un fraccionamiento exclusivo.
              </p>
            </div>

            {/* Transport Method Selection */}
            <div>
              <p className="text-sm md:text-base text-gray-700 font-medium mb-3 md:mb-4">
                Referencias caminando, automóvil y bicicleta
              </p>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {transportMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={selectedTransport === method.id ? "default" : "outline"}
                    className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base ${
                      selectedTransport === method.id
                        ? "bg-primary-custom text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTransport(method.id)}
                  >
                    <span className="mr-2">{method.icon}</span>
                    {method.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* References List */}
            <div className="space-y-2 md:space-y-3">
              {references[selectedTransport as keyof typeof references].map((ref, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm md:text-base font-medium text-gray-700">{ref.name}</span>
                  </div>
                  <span className="text-sm md:text-base text-gray-600 flex-shrink-0 ml-2">{ref.time}</span>
                </div>
              ))}
            </div>

            {/* How to get there */}
            <div className="pt-4 md:pt-6">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                ¿Cómo llegar?
              </h4>
              <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Residencial+Bosques+de+La+Ponderosa,+El+Progreso,+Yoro,+Honduras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-custom hover:text-primary-custom/80 transition-colors"
                >
                  <Image
                    src="/images/icons/google-maps.png"
                    alt="Google Maps"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded"
                  />
                  <span className="font-medium">Ver en Google Maps</span>
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=50494518153&text=Hola%2C%20estaba%20revisando%20la%20p%C3%A1gina%20web%20y%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-600/80 transition-colors"
                >
                  <Image
                    src="/images/whatsapp-icon.svg"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="font-medium">Escríbenos</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
