"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/firestore";
import { PRODUCT_CATEGORIES, parseImages } from "@/lib/utils";
import { MultiImageUpload } from "./MultiImageUpload";

type ProductFormValues = {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number | null;
  images?: string | null;
  featured?: boolean;
  published?: boolean;
};

export function ProductForm({ initial }: { initial?: ProductFormValues }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(parseImages(initial?.images));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const priceRaw = String(form.get("price") || "").trim();
    const payload = {
      title: String(form.get("title") || ""),
      description: String(form.get("description") || ""),
      category: String(form.get("category") || ""),
      price: priceRaw ? Number(priceRaw) : null,
      images,
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
    };

    try {
      if (initial?.id) {
        await updateProduct(initial.id, payload);
      } else {
        await createProduct(payload);
      }
      router.push("/admin/urunler");
    } catch {
      setError("Kayıt başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-navy/10 bg-white/80 p-6">
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Başlık</span>
        <input
          name="title"
          required
          defaultValue={initial?.title || ""}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Açıklama</span>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={initial?.description || ""}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Kategori</span>
          <select
            name="category"
            defaultValue={initial?.category || PRODUCT_CATEGORIES[0]}
            className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Fiyat (₺, boş bırakılabilir)</span>
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            defaultValue={initial?.price ?? ""}
            className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
          />
        </label>
      </div>

      <MultiImageUpload
        label="Ürün fotoğrafları"
        value={images}
        onChange={setImages}
        onError={setError}
      />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input name="featured" type="checkbox" defaultChecked={initial?.featured} />
          Öne çıkan
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="published"
            type="checkbox"
            defaultChecked={initial?.published ?? true}
          />
          Yayında
        </label>
      </div>

      {error ? <p className="text-sm text-coral-deep">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
