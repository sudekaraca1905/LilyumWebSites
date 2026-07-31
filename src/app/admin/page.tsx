import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, workshopCount, unreadMessages] = await Promise.all([
    prisma.product.count(),
    prisma.workshop.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Ürün", value: productCount, href: "/admin/urunler" },
    { label: "Atölye", value: workshopCount, href: "/admin/atolyeler" },
    { label: "Okunmamış mesaj", value: unreadMessages, href: "/admin/mesajlar" },
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
