export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatPrice(price: number | null | undefined) {
  if (price == null) return "Fiyat için iletişime geçin";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
}

export function parseImages(value?: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    // Legacy single URL string stored by mistake
    if (value.startsWith("/")) return [value];
    return [];
  }
}

export function coverImage(value?: string | null): string | null {
  return parseImages(value)[0] || null;
}

export function serializeImages(images: string[]): string {
  return JSON.stringify(images.filter(Boolean));
}

export const PRODUCT_CATEGORIES = [
  "Anahtarlık",
  "Rozet",
  "Oyuncak / Mini Figür",
  "Plaket",
  "Dekorasyon",
  "Kutu / Konteyner",
  "Diğer",
] as const;
