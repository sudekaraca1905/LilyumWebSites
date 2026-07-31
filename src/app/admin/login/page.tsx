"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Giriş başarısız");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,184,77,0.35),_transparent_40%),linear-gradient(180deg,#FFF8F3,#FFE8D6)] px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[2rem] border border-navy/10 bg-white/85 p-8 shadow-soft"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Yönetim</p>
        <h1 className="mt-3 font-display text-3xl text-navy">Admin Girişi</h1>
        <p className="mt-2 text-sm text-navy/60">
          Ürün ve içerikleri buradan yöneteceksiniz.
        </p>

        <label className="mt-8 block">
          <span className="mb-2 block text-sm font-medium text-navy/80">Kullanıcı adı</span>
          <input
            name="username"
            required
            defaultValue="admin"
            className="w-full rounded-2xl border border-navy/15 bg-cream/70 px-4 py-3 text-sm outline-none focus:border-coral"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-navy/80">Şifre</span>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-2xl border border-navy/15 bg-cream/70 px-4 py-3 text-sm outline-none focus:border-coral"
          />
        </label>

        {error ? <p className="mt-4 text-sm text-coral-deep">{error}</p> : null}

        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
