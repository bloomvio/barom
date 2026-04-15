import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://barom.ai";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/assessment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/founding`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];
}
