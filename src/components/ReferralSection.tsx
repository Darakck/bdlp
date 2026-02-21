"use client";

import { Button } from "@/components/ui/button";

export function ReferralSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-custom to-secondary-custom">
      <div className="container-custom section-padding">
        <div className="relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage: "url('https://ext.same-assets.com/3241657345/1362709518.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/90 to-secondary-custom/90 rounded-lg"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white py-16 px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                RESERVA YA Y
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">
                RECIBE NUESTRO PRECIO PRE-VENTA
              </h3>

              <div className="mb-6">
                <span className="text-xl md:text-2xl font-semibold block mb-2">
                  DESCUENTOS HASTA
                </span>
                <span className="text-5xl md:text-7xl font-bold text-secondary-custom">
                  170,000
                </span>
                <span className="text-2xl md:text-3xl font-medium ml-4">
                  LEMPS.
                </span>
              </div>

              <p className="text-sm md:text-base mb-8 max-w-2xl mx-auto">
                Reserva tu hogar hoy y recibe nuestro precio especial con descuentos de hasta 170 mil lempiras.
              </p>

              <Button
                className="bg-primary-custom hover:bg-primary-custom/90 text-white px-8 py-4 text-lg font-semibold rounded-lg"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                ¡QUIERO SABER CÓMO!
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20">
            <img
              src="https://ext.same-assets.com/3241657345/1362709518.png"
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20">
            <img
              src="https://ext.same-assets.com/3241657345/1362709518.png"
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
