import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://reviews.flairtek.com";
  const currentDate = new Date();

  const routes = [
    "",
    "/features",
    "/how-it-works",
    "/pricing",
    "/industries",
    "/integrations",
    "/about",
    "/contact",
    "/faq",
    "/login",
    "/signup",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/pricing" ? 0.9 : 0.8,
  }));
}
