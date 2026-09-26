export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: "https://www.danovacreators.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.danovacreators.com/servicios/diseno-web",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.danovacreators.com/servicios/seo-local",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.danovacreators.com/servicios/redes-sociales",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.danovacreators.com/servicios/mantenimiento-web",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.danovacreators.com/servicios/diseno-de-logo",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.danovacreators.com/a-coruna",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.danovacreators.com/seo-local-a-coruna",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
