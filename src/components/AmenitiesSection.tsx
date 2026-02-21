import Image from "next/image";

export function AmenitiesSection() {
  const amenities = [
    {
      icon: "/images/icons/area-deportiva.svg",
      name: "Áreas Deportivas",
    },
    {
      icon: "/images/icons/gimnasio.svg",
      name: "Gimnasio al aire libre",
    },
    {
      icon: "/images/icons/mascotas.svg",
      name: "Áreas para mascotas",
    },
    {
      icon: "/images/asadores-amenidades.svg",
      name: "Asadores",
    },
    {
      icon: "/images/kioskos-amenidades.svg",
      name: "Kioskos para eventos",
    },
    {
      icon: "/images/areas-lectura.svg",
      name: "Áreas para lectura",
    },
  ];

  return (
    <section id="amenities" className="py-20 bg-gray-50">
      <div className="container-custom section-padding">
        {/* Yoga/Lifestyle Image */}
        <div className="mb-20">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://ext.same-assets.com/3241657345/1362709518.png"
              alt="Lifestyle"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              quality={80}
            />
            <div className="absolute inset-0 bg-black/20 z-10"></div>
          </div>
        </div>

        {/* Amenities Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/icons/amenidades-icon.svg"
              alt="Amenities Icon"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            AMENIDADES
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-gray-700">
              Más que una casa, un estilo de vida de bienestar.
            </p>
            <p className="text-lg font-semibold text-gray-800">
              En Bosques de La Ponderosa, las amenidades son una extensión de tu hogar.
            </p>
            <p className="text-lg text-gray-700">
              Disfruta de actividades al aire libre, mantente activo en el gimnasio al aire libre o crea nuevos recuerdos con tu familia.
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Un paraíso de comodidades para toda la familia.
            </p>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {amenities.map((amenity, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src={amenity.icon}
                  alt={amenity.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-700">
                {amenity.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Additional descriptive text */}
        <div className="text-center mt-16">
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada amenidad ha sido cuidadosamente diseñada para promover el bienestar y la convivencia familiar.
            Desde espacios para el ejercicio hasta áreas de relajación, Bosques de La Ponderosa te ofrece todo lo que necesitas
            para disfrutar de un estilo de vida pleno y saludable.
          </p>
        </div>
      </div>
    </section>
  );
}
