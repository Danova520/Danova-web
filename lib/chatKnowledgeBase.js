export const chatStrings = {
  es: {
    name: "Asistente DANOVA",
    status: "Respuestas automáticas",
    placeholder: "Escribe tu pregunta...",
    greeting: "¡Hola! Soy el asistente de DANOVA. Puedes pulsar una de estas preguntas o escribir la tuya:",
    fallback: "No tengo una respuesta exacta para eso. Escríbenos por WhatsApp y te ayudamos en persona:",
    waCta: "Hablar por WhatsApp",
    restart: "Ver preguntas de nuevo",
  },
  en: {
    name: "DANOVA Assistant",
    status: "Automated answers",
    placeholder: "Type your question...",
    greeting: "Hi! I'm the DANOVA assistant. Tap one of these questions or type your own:",
    fallback: "I don't have an exact answer for that. Message us on WhatsApp and we'll help in person:",
    waCta: "Talk on WhatsApp",
    restart: "See questions again",
  },
  gl: {
    name: "Asistente DANOVA",
    status: "Respostas automáticas",
    placeholder: "Escribe a túa pregunta...",
    greeting: "Ola! Son o asistente de DANOVA. Preme unha destas preguntas ou escribe a túa:",
    fallback: "Non teño unha resposta exacta para iso. Escríbenos por WhatsApp e axudámoste en persoa:",
    waCta: "Falar por WhatsApp",
    restart: "Ver preguntas de novo",
  },
};

// key -> { es, en, gl } para pregunta (chip) y respuesta
export const chatKnowledgeBase = [
  {
    key: "precio",
    q: { es: "¿Cuánto cuesta?", en: "How much does it cost?", gl: "Canto custa?" },
    a: {
      es: "Depende del alcance real de tu negocio. No publicamos tarifas cerradas: hablamos primero de lo que necesitas y te damos un presupuesto ajustado a eso.",
      en: "It depends on the real scope of your business. We don't publish fixed rates: we first talk about what you need and give you a budget adjusted to that.",
      gl: "Depende do alcance real do teu negocio. Non publicamos tarifas pechadas: falamos primeiro do que precisas e dámosche un orzamento axustado a iso.",
    },
    kw: ["precio", "coste", "costo", "cuesta", "tarifa", "presupuesto", "cost", "price", "how much", "custa", "prezo"],
  },
  {
    key: "tiempo",
    q: { es: "¿Cuánto tarda un proyecto?", en: "How long does a project take?", gl: "Canto tarda un proxecto?" },
    a: {
      es: "Varía según el nivel de servicio y el contenido a producir. Te damos un plazo concreto tras la fase de descubrimiento, no antes.",
      en: "It varies depending on the service level and content to produce. We give you a specific timeline after the discovery phase, not before.",
      gl: "Varía segundo o nivel de servizo e o contido a producir. Dámosche un prazo concreto tras a fase de descubrimento, non antes.",
    },
    kw: ["tarda", "plazo", "tiempo", "cuanto tiempo", "duracion", "how long", "time", "tarde", "prazo"],
  },
  {
    key: "servicios",
    q: { es: "¿Qué servicios ofrecéis?", en: "What services do you offer?", gl: "Que servizos ofrecedes?" },
    a: {
      es: "Diseño y desarrollo web, gestión de redes sociales y contenido, dirección de arte y fotografía, y SEO y presencia local — todo como un mismo sistema.",
      en: "Web design and development, social media and content management, art direction and photography, and SEO and local presence — all as one system.",
      gl: "Deseño e desenvolvemento web, xestión de redes sociais e contido, dirección de arte e fotografía, e SEO e presenza local — todo como un mesmo sistema.",
    },
    kw: ["servicio", "servizo", "ofreceis", "hacer", "service", "offer", "que haceis", "facedes"],
  },
  {
    key: "mantenimiento",
    q: { es: "¿Incluye mantenimiento?", en: "Does it include maintenance?", gl: "Inclúe mantemento?" },
    a: {
      es: "Sí, tenemos tres niveles de mantenimiento: Básico (100 €/mes), Medio (350 €/mes) y Máximo (650 €/mes), según el nivel de atención que necesite tu web.",
      en: "Yes, we offer three maintenance tiers: Basic (€100/month), Standard (€350/month) and Maximum (€650/month), depending on the level of attention your website needs.",
      gl: "Si, temos tres niveis de mantemento: Básico (100 €/mes), Medio (350 €/mes) e Máximo (650 €/mes), segundo o nivel de atención que precise a túa web.",
    },
    kw: ["mantenimiento", "maintenance", "mantemento", "precio mantenimiento"],
  },
  {
    key: "zona",
    q: { es: "¿Trabajáis fuera de Galicia?", en: "Do you work outside Galicia?", gl: "Traballades fóra de Galicia?" },
    a: {
      es: "Sí, trabajamos con negocios de cualquier parte del mundo. Nuestra base está en Carballo y Galicia, pero gestionamos proyectos a distancia sin importar dónde esté tu negocio.",
      en: "Yes, we work with businesses anywhere in the world. We're based in Carballo and Galicia, but we manage remote projects no matter where your business is.",
      gl: "Si, traballamos con negocios de calquera parte do mundo. A nosa base está en Carballo e Galicia, pero xestionamos proxectos a distancia sen importar onde estea o teu negocio.",
    },
    kw: ["fuera de galicia", "zona", "ubicacion", "donde", "outside", "location", "where", "fora", "onde", "europa", "europe", "mundo", "world", "internacional", "international"],
  },
  {
    key: "contacto",
    q: { es: "Quiero hablar con alguien", en: "I want to talk to someone", gl: "Quero falar con alguén" },
    a: {
      es: "¡Claro! Escríbenos directamente por WhatsApp y te respondemos en persona:",
      en: "Of course! Message us directly on WhatsApp and we'll reply in person:",
      gl: "Claro! Escríbenos directamente por WhatsApp e respondémosche en persoa:",
    },
    kw: ["hablar", "contacto", "llamar", "persona", "humano", "talk", "contact", "call", "human", "falar", "contacto"],
  },
];

export function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function matchKnowledgeBase(rawText) {
  const text = normalize(rawText);
  return chatKnowledgeBase.find((item) => item.kw.some((k) => text.includes(normalize(k))));
}
