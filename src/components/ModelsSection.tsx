"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import useScrollReveal from "@/lib/useScrollReveal";

// Lazy load InteractivePlan solo cuando se necesite
const InteractivePlan = dynamic(() => import("./InteractivePlan"), {
  loading: () => <div className="flex items-center justify-center min-h-[400px]"><p className="text-gray-500">Cargando mapa...</p></div>,
  ssr: false, // No renderizar en servidor (tiene dependencias de navegador)
});

export function ModelsSection() {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activeStage, setActiveStage] = useState<"etapa1" | "etapa2">("etapa1");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const models = [
    {
      id: "bosque",
      name: "BOSQUE",
      buttonIcon: "🌲",
      title: "MODELO BOSQUE",
      area: "168.15 m²",
      lotSize: "114 m²",
      description: "El espacio que tu familia necesita para crecer. Con 168 m² construidos, esta casa es el hogar ideal para quienes buscan comodidad y funcionalidad. Su diseño incluye una cochera techada, un estudio perfecto para trabajar o estudiar, y un patio trasero para momentos al aire libre. La recámara principal con vestidor te ofrece un santuario privado, mientras que sus 3 baños completos y cocina equipada te garantizan el confort que mereces. Un espacio pensado para ti y tus seres queridos.",
      features: [
        { icon: "/images/icons/area-lavado-bosque.svg", name: "Área de Lavado" },
        { icon: "/images/icons/estudio-bosque.svg", name: "Estudio" },
        { icon: "/images/icons/patio-bosque.svg", name: "Patio trasero" },
        { icon: "/images/icons/cochera-bosque.svg", name: "Cochera techada" },
        { icon: "/images/icons/recamara-principal-bosque.svg", name: "Recámara principal con vestidor" },
        { icon: "/images/icons/recamaras-secundarias-bosque.svg", name: "2 Recámaras secundarias con clóset" },
        { icon: "/images/icons/banos-bosque.svg", name: "3 Baños completos" },
        { icon: "/images/icons/cocina-bosque.svg", name: "Cocina equipada tipo C" },
      ],
      floorPlan: "https://ext.same-assets.com/3241657345/4163054020.png",
      images: [
        "https://ext.same-assets.com/3241657345/3486140163.png",
        "https://ext.same-assets.com/3241657345/2132192840.png",
        "https://ext.same-assets.com/3241657345/3136423789.png",
      ],
    },
    {
      id: "pradera",
      name: "PRADERA",
      buttonIcon: "🏞️",
      title: "MODELO PRADERA",
      area: "168.81 m²",
      lotSize: "114 m²",
      description: "Vive el diseño y el confort en cada rincón. Sus 168 m² han sido inteligentemente distribuidos para ofrecerte una experiencia de vida única. La cocina equipada tipo isla es el corazón del hogar, ideal para la convivencia. La recámara principal, con su propio vestidor y terraza, es un oasis de tranquilidad. Con un estudio y un amplio patio trasero, este modelo se adapta a todas tus actividades. Descubre el equilibrio perfecto entre lujo y practicidad.",
      features: [
        { icon: "/images/icons/area-lavado-pradera.svg", name: "Área de Lavado" },
        { icon: "/images/icons/estudio-pradera.svg", name: "Estudio" },
        { icon: "/images/icons/patio-pradera.svg", name: "Patio trasero" },
        { icon: "/images/icons/recamara-pradera.svg", name: "Recámara principal con vestidor y terraza" },
        { icon: "/images/icons/recamaras-sec-pradera.svg", name: "2 Recámaras secundarias" },
        { icon: "/images/icons/banos-pradera.svg", name: "2 1/2 Baños completos" },
        { icon: "/images/icons/cocina-pradera.svg", name: "Cocina equipada tipo isla" },
      ],
      floorPlan: "https://ext.same-assets.com/3241657345/2418955189.png",
      images: [
        "https://ext.same-assets.com/3241657345/2511417231.png",
        "https://ext.same-assets.com/3241657345/2871725894.png",
        "https://ext.same-assets.com/3241657345/1407773389.png",
      ],
    },
    {
      id: "tundra",
      name: "TUNDRA",
      buttonIcon: "🏔️",
      title: "MODELO TUNDRA",
      area: "166.32 m²",
      lotSize: "114 m²",
      description: "Tu refugio personal con un toque de exclusividad. Este modelo de 166 m² combina a la perfección la privacidad y la funcionalidad. La recámara principal con vestidor y terraza privada te invita a disfrutar de momentos de paz, mientras que el diseño de sus espacios comunes facilita la vida en familia. Con un patio trasero ideal para tus hobbies y una cocina equipada, esta casa es más que una vivienda: es un espacio para vivir plenamente. Tu escape diario te espera en el Modelo Tundra.",
      features: [
        { icon: "/images/icons/area-lavado-tundra.svg", name: "Área de Lavado" },
        { icon: "/images/icons/patio-tundra.svg", name: "Patio trasero" },
        { icon: "/images/icons/cochera-tundra.svg", name: "1/2 Cochera" },
        { icon: "/images/icons/recamara-tundra.svg", name: "Recámara principal con vestidor y terraza" },
        { icon: "/images/icons/recamaras-sec-tundra.svg", name: "2 Recámaras secundarias con clóset" },
        { icon: "/images/icons/banos-tundra.svg", name: "2 1/2 Baños" },
        { icon: "/images/icons/cocina-tundra.svg", name: "Cocina equipada tipo C" },
      ],
      floorPlan: "https://ext.same-assets.com/3241657345/3970139800.png",
      images: [
        "https://ext.same-assets.com/3241657345/1580940357.png",
        "https://ext.same-assets.com/3241657345/508839465.png",
        "https://ext.same-assets.com/3241657345/3026288660.png",
      ],
    },
  ];
  const activeModel = models[activeModelIndex];
  const galleryImages = [...activeModel.images, activeModel.floorPlan];
  const stageContent = {
    etapa1: {
      label: "ETAPA 1",
      helper: "Seleccionada",
    },
    etapa2: {
      label: "ETAPA 2",
      helper: "Seleccionada",
    },
  } as const;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Auto-rotate gallery every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [galleryImages.length]);

  const revealRef = useRef<HTMLElement | null>(null);
  useScrollReveal(revealRef);

  return (
    <section id="models" className="py-20 bg-gray-50">
      <div className="container-custom section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {(Object.keys(stageContent) as Array<keyof typeof stageContent>).map(stageKey => {
                const isStageActive = activeStage === stageKey;

                return (
                  <Button
                    key={stageKey}
                    onClick={() => setActiveStage(stageKey)}
                    className={`px-8 py-3 transition-colors ${
                      isStageActive
                        ? "bg-primary-custom text-white hover:bg-primary-custom/90"
                        : "bg-white text-primary-custom border border-[#22312c] hover:border-[#22312c] hover:bg-[#22312c]/5"
                    }`}
                  >
                    {stageContent[stageKey].label}
                  </Button>
                );
              })}
            </div>

              <div ref={revealRef as any} className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden scroll-reveal">
              <div className="px-6 py-4 border-b border-gray-100 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {stageContent[activeStage].label}
                </h3>
                {activeStage === "etapa1" && <p className="text-sm text-gray-500">Mapa de la etapa</p>}
              </div>
              <div className="w-full px-4 py-6">
                {activeStage === "etapa1" ? (
                  <InteractivePlan image="/images/Plano%20de%20Ventas%20BDLP-Modelo.webp" />
                ) : (
                  <div className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center rounded-lg" style={{backgroundImage: "url('/images/Plano%20de%20Ventas%20BDLP-Modelo.webp')"}}>
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-lg"></div>
                    <h2 className="relative text-4xl md:text-5xl font-bold text-primary-custom z-10">Próximamente</h2>
                  </div>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            MODELOS DISPONIBLES
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            Descubre la casa de tus sueños en armonía con la naturaleza.
            Cada uno de nuestros modelos ha sido diseñado para ofrecer el espacio perfecto para tu familia, combinando diseño moderno y funcionalidad.
          </p>

          {/* Model Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {models.map((model, index) => {
              const isActive = index === activeModelIndex;

              return (
                <Button
                  key={model.id}
                  onClick={() => {
                    setActiveModelIndex(index);
                    setActiveImageIndex(0);
                  }}
                  className={`px-8 py-3 transition-colors ${
                    isActive
                      ? "bg-primary-custom text-white hover:bg-primary-custom/90"
                      : "bg-white text-primary-custom border border-[#22312c] hover:border-[#22312c] hover:bg-[#22312c]/5"
                  }`}
                >
                  <span className="mr-2" aria-hidden>
                    {model.buttonIcon ?? "🏡"}
                  </span>
                  {model.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Models */}
        <div id="models-detail" className="space-y-20">
          <div key={activeModel.id} className="bg-white rounded-lg shadow-lg overflow-hidden fade-in">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Gallery Carousel */}
              <div className="relative bg-gray-100 flex items-center justify-center p-6 md:p-10">
                <div className="w-full mx-auto">
                  <div className="relative overflow-hidden rounded-xl shadow">
                    <img
                      src={galleryImages[activeImageIndex]}
                      alt={
                        activeImageIndex === galleryImages.length - 1
                          ? `${activeModel.title} Plano`
                          : `${activeModel.title} Vista ${activeImageIndex + 1}`
                      }
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 px-4 py-1 rounded-full text-xs text-gray-700">
                      {activeImageIndex + 1} / {galleryImages.length}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center gap-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={image}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === activeImageIndex ? "bg-primary-custom" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Mostrar imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Model Details */}
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-custom mb-6">
                  {activeModel.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {activeModel.area}
                    </p>
                    <p className="text-sm text-gray-600">Superficie Construida</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {activeModel.lotSize}
                    </p>
                    <p className="text-sm text-gray-600">Metraje del Terreno</p>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {activeModel.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img src={feature.icon} alt="" className="w-6 h-6" />
                      <span className="text-sm text-gray-700">{feature.name}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={scrollToContact}
                  className="w-full bg-primary-custom hover:bg-primary-custom/90 text-white py-3 font-semibold"
                >
                  COTIZAR AHORA
                </Button>
              </div>
            </div>

            {/* Model Description */}
            <div className="p-8 bg-gray-50">
              <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                {activeModel.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
