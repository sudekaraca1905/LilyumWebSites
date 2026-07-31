"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type WorkshopFormValues = {
  id?: string;
  title?: string;
  summary?: string;
  description?: string;
  steps?: string;
  learnings?: string;
  output?: string | null;
  ageGroup?: string | null;
  duration?: string | null;
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
};

function linesToArray(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function arrayToLines(value?: string) {
  if (!value) return "";
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.join("\n") : "";
  } catch {
    return "";
  }
}

export function WorkshopForm({ initial }: { initial?: WorkshopFormValues }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const payload = {
      title: String(form.get("title") || ""),
      summary: String(form.get("summary") || ""),
      description: String(form.get("description") || ""),
      steps: linesToArray(String(form.get("steps") || "")),
      learnings: linesToArray(String(form.get("learnings") || "")),
      output: String(form.get("output") || "") || null,
      ageGroup: String(form.get("ageGroup") || "") || null,
      duration: String(form.get("duration") || "") || null,
      sortOrder: Number(form.get("sortOrder") || 99),
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
    };

    const res = await fetch(
      initial?.id ? `/api/workshops/${initial.id}` : "/api/workshops",
      {
        method: initial?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Kayıt başarısız");
      return;
    }

    router.push("/admin/atolyeler");
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
        <span className="mb-2 block text-sm font-medium">Kısa özet</span>
        <input
          name="summary"
          required
          defaultValue={initial?.summary || ""}
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
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Adımlar (her satır bir adım)</span>
        <textarea
          name="steps"
          rows={5}
          defaultValue={arrayToLines(initial?.steps)}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Öğrenimler (her satır bir madde)</span>
        <textarea
          name="learnings"
          rows={5}
          defaultValue={arrayToLines(initial?.learnings)}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Yaş grubu</span>
          <input
            name="ageGroup"
            defaultValue={initial?.ageGroup || ""}
            className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Süre</span>
          <input
            name="duration"
            defaultValue={initial?.duration || ""}
            className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Sıra</span>
          <input
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 99}
            className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Çıktı</span>
        <input
          name="output"
          defaultValue={initial?.output || ""}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-coral"
        />
      </label>
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
