"use client";

import { FormEvent, useState } from "react";
import { updateSeoSettings } from "@/lib/firestore";
import type { SeoPageKey, SeoSettings } from "@/lib/site";

const PAGE_LABELS: Record<SeoPageKey, string> = {
  home: "Ana Sayfa",
  urunler: "Ürünler",
  atolyeler: "Atölyeler",
  ozelTasarim: "Özel Tasarım",
  iletisim: "İletişim",
};

const PAGE_KEYS: SeoPageKey[] = ["home", "urunler", "atolyeler", "ozelTasarim", "iletisim"];

export function SeoForm({ initial }: { initial: SeoSettings }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);
    const form = new FormData(e.currentTarget);

    const payload: SeoSettings = {
      siteName: String(form.get("siteName") || ""),
      siteDescription: String(form.get("siteDescription") || ""),
      ogImage: String(form.get("ogImage") || ""),
      pages: Object.fromEntries(
        PAGE_KEYS.map((key) => [
          key,
          {
            title: String(form.get(`${key}.title`) || ""),
            description: String(form.get(`${key}.description`) || ""),
          },
        ])
      ) as SeoSettings["pages"],
    };

    try {
      await updateSeoSettings(payload);
      setSaved(true);
    } catch {
      setError("Kayıt başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-navy/10 bg-white/80 p-6">
      <div>
        <h2 className="font-display text-xl text-navy">Site geneli</h2>
        <p className="mt-1 text-sm text-navy/55">
          Tüm sayfalarda varsayılan olarak kullanılır (paylaşım kartı, sekme başlığı vb.).
        </p>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Site adı</span>
        <input
          name="siteName"
          required
          defaultValue={initial.siteName}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Site açıklaması</span>
        <textarea
          name="siteDescription"
          required
          rows={3}
          defaultValue={initial.siteDescription}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Paylaşım görseli (OG image) URL
        </span>
        <input
          name="ogImage"
          required
          defaultValue={initial.ogImage}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>

      <div className="border-t border-navy/10 pt-5">
        <h2 className="font-display text-xl text-navy">Sayfa bazlı SEO</h2>
        <p className="mt-1 text-sm text-navy/55">
          Boş bırakılan alanlar için varsayılan metin kullanılır.
        </p>
      </div>
      {PAGE_KEYS.map((key) => (
        <div key={key} className="rounded-2xl border border-navy/10 bg-cream/40 p-4">
          <p className="mb-3 text-sm font-semibold text-navy">{PAGE_LABELS[key]}</p>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Başlık</span>
            <input
              name={`${key}.title`}
              defaultValue={initial.pages[key].title}
              className="w-full rounded-2xl border border-navy/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-coral"
            />
          </label>
          <label className="mt-3 block">
            <span className="mb-2 block text-sm font-medium">Açıklama</span>
            <textarea
              name={`${key}.description`}
              rows={2}
              defaultValue={initial.pages[key].description}
              className="w-full rounded-2xl border border-navy/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-coral"
            />
          </label>
        </div>
      ))}

      {error ? <p className="text-sm text-coral-deep">{error}</p> : null}
      {saved ? (
        <p className="text-sm text-navy/70">
          Kaydedildi. Sitede görünmesi için GitHub Actions&apos;tan &quot;Değişiklikleri
          Yayınla&quot; ile yeniden yayınlamanız gerekir.
        </p>
      ) : null}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
