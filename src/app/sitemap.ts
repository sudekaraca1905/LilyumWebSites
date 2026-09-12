import type { MetadataRoute } from "next";
import { getAllProductSlugs, getAllWorkshopSlugs } from "@/lib/firestore";

export const dynamic = "force-static";

const SITE_URL = "https://lilyumbaskiatolyesi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, workshopSlugs] = await Promise.all([
    getAllProductSlugs(),
    getAllWorkshopSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/urunler`, priority: 0.8 },
    { url: `${SITE_URL}/atolyeler`, priority: 0.8 },
    { url: `${SITE_URL}/ozel-tasarim`, priority: 0.6 },
    { url: `${SITE_URL}/iletisim`, priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/urunler/${slug}`,
    priority: 0.5,
  }));

  const workshopRoutes: MetadataRoute.Sitemap = workshopSlugs.map((slug) => ({
    url: `${SITE_URL}/atolyeler/${slug}`,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...workshopRoutes];
}
