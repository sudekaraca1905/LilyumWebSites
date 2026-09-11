"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { getMessages, getProducts, getWorkshops } from "@/lib/firestore";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<{ products: number; workshops: number; unread: number } | null>(
    null
  );

  useEffect(() => {
    Promise.all([getProducts(), getWorkshops(), getMessages()]).then(
      ([products, workshops, messages]) => {
        setCounts({
          products: products.length,
          workshops: workshops.length,
          unread: messages.filter((m) => !m.read).length,
        });
      }
    );
  }, []);

  const cards = [
    { label: "Ürün", value: counts?.products ?? "–", href: "/admin/urunler" },
    { label: "Atölye", value: counts?.workshops ?? "–", href: "/admin/atolyeler" },
    { label: "Okunmamış mesaj", value: counts?.unread ?? "–", href: "/admin/mesajlar" },
  ];

  return (
    <AdminShell>
      <div>
        <h1 className="font-display text-3xl text-navy">Özet</h1>
        <p className="mt-2 text-navy/60">Sitenin güncel durumu</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-3xl border border-navy/10 bg-white/80 p-6 shadow-soft transition hover:-translate-y-0.5"
          >
            <p className="text-sm text-navy/55">{card.label}</p>
            <p className="mt-3 font-display text-4xl text-navy">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-navy/10 bg-white/80 p-6">
        <h2 className="font-display text-xl text-navy">Hızlı işlem</h2>
        <p className="mt-2 text-sm text-navy/60">
          Yeni 3D ürün eklemek için ürünler sayfasını kullanın. Görsel yükleyebilir,
          fiyat ve kategori girebilirsiniz.
        </p>
        <Link href="/admin/urunler/yeni" className="btn-primary mt-5">
          Yeni Ürün Ekle
        </Link>
      </div>
    </AdminShell>
  );
}
