export const siteConfig = {
  // reCAPTCHA Configuration
  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lc3QBgsAAAAADdxIcNhwKHz1hlhA4wr2iyOaRlT", // Replace with your actual site key
  },

  // Brochure Configuration
  brochure: {
    // Update to the PDF filename you have in `public/`.
    filePath: "/Bosques de La Ponderosa Presentación-01.pdf",
    fileName: "Residencial Bosques de la Ponderosa",
  },

  // Company Information
  company: {
    name: "Your Company Name",
    subtitle: "Your Development Name",
    description: "Your company description goes here. Customize this text to describe your development, location, and unique selling points.",
    phone: "+1 (555) 123-4567",
    whatsapp: "+1 (555) 123-4567",
    email: "contact@yourcompany.com",
    address: "Your Address Here",
    logo: "/images/bosques-ponderosa-logo.png", // Place your logo in public folder
  },

  // Hero Section
  hero: {
    title: "¡Preventa de lotes ya empezó!",
    subtitle: "Precios desde $160 v²",
    backgroundImage: "https://ext.same-assets.com/3241657345/1338783558.png",
    description: "Asegura tu patrimonio con ubicaciones únicas y plusvalía.",
  },

  // Navigation Menu
  navigation: [
    { name: "About", href: "#about" },
    { name: "Models", href: "#models" },
    { name: "Amenities", href: "#amenities" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ],

  // About Section
  about: {
    title: "Your new home, an investment in your future.",
    description: "At Your Development, discover the tranquility and added value of a unique real estate development in your city.",
    features: [
      "State-of-the-art security systems and controlled access",
      "Designed for family coexistence",
      "Green areas, playgrounds, recreational areas",
      "Modern homes adapted to your family's needs",
      "Strategic location with easy access to everything you need",
    ],
    images: [
      "https://ext.same-assets.com/3241657345/3486140163.png",
      "https://ext.same-assets.com/3241657345/2132192840.png",
    ],
  },

  // Property Models
  models: [
    {
      id: "model-1",
      name: "FOREST MODEL",
      subtitle: "Example Model",
      area: "168.15 m²",
      lotSize: "114 m²",
      description: "The space your family needs to grow. With 168 m² built, this house is the ideal home for those seeking comfort and functionality.",
      features: [
        { icon: "🏠", name: "Laundry Area" },
        { icon: "📚", name: "Study" },
        { icon: "🌿", name: "Backyard" },
        { icon: "🚗", name: "Covered Garage" },
        { icon: "🛏️", name: "Master Bedroom with Closet" },
        { icon: "🛏️", name: "2 Secondary Bedrooms with Closet" },
        { icon: "🚿", name: "3 Complete Bathrooms" },
        { icon: "🍳", name: "Equipped Kitchen Type C" },
      ],
      floorPlan: "https://ext.same-assets.com/3241657345/4163054020.png",
      images: [
        "https://ext.same-assets.com/3241657345/3486140163.png",
        "https://ext.same-assets.com/3241657345/2132192840.png",
        "https://ext.same-assets.com/3241657345/3136423789.png",
      ],
    },
    // Add more models as needed
  ],

  // Amenities
  amenities: {
    title: "AMENITIES",
    subtitle: "More than a house, a lifestyle of well-being.",
    description: "At Your Development, amenities are an extension of your home. Enjoy an afternoon at the pool, stay active in the outdoor gym, or create new memories at the clubhouse. A paradise of comfort for the whole family.",
    features: [
      { icon: "🏊", name: "Pool" },
      { icon: "⚽", name: "Sports Areas" },
      { icon: "💪", name: "Outdoor Gym" },
      { icon: "🐕", name: "Pet Areas" },
      { icon: "🏢", name: "Clubhouse Pool" },
    ],
  },

  // Location
  location: {
    title: "Privileged Location",
    subtitle: "Live close to everything that matters",
    description: "Just minutes from the best schools, shopping centers, and services, Your Development offers you the convenience of the city with the tranquility of an exclusive subdivision.",
    mapImage: "https://ext.same-assets.com/3241657345/3583026333.png",
    references: [
      { name: "School 1", time: "14 min", icon: "🚗" },
      { name: "Shopping Center", time: "8 min", icon: "🚗" },
      { name: "Hospital", time: "12 min", icon: "🚗" },
    ],
  },

  // Referral Program
  referral: {
    title: "REFER AND EARN UP TO",
    amount: "$30,000",
    currency: "USD",
    subtitle: "FOR EACH REFERRAL",
    description: "When your referral buys and closes with us, you earn 1% of the value of their home",
    ctaText: "I WANT TO KNOW HOW!",
    backgroundImage: "https://ext.same-assets.com/3241657345/1362709518.png",
  },

  // Contact
  contact: {
    title: "Your new home awaits you.",
    subtitle: "Take the first step to get to know it.",
    description: "Complete the form and we will contact you immediately to offer you a personalized quote or schedule your visit.",
    agent: {
      name: "Your Agent Name",
      photo: "https://ext.same-assets.com/3241657345/1787886278.png",
      whatsapp: "+1 (555) 123-4567",
      phone: "+1 (555) 123-4567",
    },
  },

  // Footer
  footer: {
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms and Conditions", href: "#" },
    ],
    social: [
      { name: "Facebook", href: "#", icon: "facebook" },
      { name: "Instagram", href: "#", icon: "instagram" },
    ],
    developer: "Site Developed by: Your Agency",
    copyright: "All Rights Reserved. 2024 Your Company",
  },

  // WhatsApp Widget
  whatsapp: {
    enabled: true,
    number: "+1 (555) 123-4567",
    message: "Hello! I'm interested in your properties.",
    text: "Need help?",
  },
};
