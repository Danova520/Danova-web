export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: "https://danovacreators.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://danovacreators.com/servicios/diseno-web",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://danovacreators.com/servicios/seo-local",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://danovacreators.com/servicios/redes-sociales",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://danovacreators.com/servicios/mantenimiento-web",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
