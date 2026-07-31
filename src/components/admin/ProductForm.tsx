"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/utils";

type ProductFormValues = {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number | null;
  imageUrl?: string | null;
  featured?: boolean;
  published?: boolean;
};

export function ProductForm({ initial }: { initial?: ProductFormValues }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    setUploading(false);
    if (!res.ok) {
      setError("Görsel yüklenemedi");
      return;
    }
    const data = await res.json();
    setImageUrl(data.url);
  }

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
      imageUrl: imageUrl || null,
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
    };

    const res = await fetch(initial?.id ? `/api/products/${initial.id}` : "/api/products", {
      method: initial?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Kayıt başarısız");
      return;
    }

    router.push("/admin/urunler");
    router.refresh();
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

      <div>
        <span className="mb-2 block text-sm font-medium">Görsel</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadImage(file);
          }}
          className="block w-full text-sm"
        />
        {uploading ? <p className="mt-2 text-sm text-navy/55">Yükleniyor...</p> : null}
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Ürün" className="mt-4 h-40 w-40 rounded-2xl object-cover" />
        ) : null}
      </div>

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
