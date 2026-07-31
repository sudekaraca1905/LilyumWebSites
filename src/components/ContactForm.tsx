"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Mesaj gönderilemedi");
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[1.75rem] border border-navy/10 bg-white/80 p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad Soyad" name="name" required />
        <Field label="E-posta" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefon" name="phone" />
        <Field label="Konu" name="subject" required placeholder="Okul atölyesi / özel ürün" />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-navy/80">Mesaj</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none transition focus:border-coral focus:bg-white"
          placeholder="Okulunuz, yaş grubu, tarih veya ürün talebinizi yazın..."
        />
      </label>
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>
      {status === "ok" ? (
        <p className="text-sm font-medium text-navy">Mesajınız alındı. En kısa sürede dönüş yapacağız.</p>
      ) : null}
      {status === "error" ? <p className="text-sm font-medium text-coral-deep">{error}</p> : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-navy/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-navy/15 bg-cream/60 px-4 py-3 text-sm outline-none transition focus:border-coral focus:bg-white"
      />
    </label>
  );
}
