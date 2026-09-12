import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteShell } from "@/components/SiteShell";
import { getSeoSettings } from "@/lib/firestore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const page = seo.pages.ozelTasarim;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/ozel-tasarim" },
    openGraph: { title: page.title, description: page.description, url: "/ozel-tasarim" },
  };
}

const categories = [
  {
    title: "Anahtarlık",
    detail: "İsim, tarih ve temalı tasarımlar. Yaklaşık 3×3 cm.",
  },
  {
    title: "Rozet",
    detail: "Karakter, emoji veya etkinlik temalı pinler. Yaklaşık 4×4 cm.",
  },
  {
    title: "Oyuncak / Mini Figür",
    detail: "Okul maskotu veya özel karakterler. 5–7 cm, boyalı detay.",
  },
  {
    title: "Plaket",
    detail: "İsim, tarih ve atölye adı ile standlı plaketler. 10×15 cm.",
  },
  {
    title: "Dekorasyon",
    detail: "Sınıf veya çocuk odası için temalı 3D sahneler. 15×20 cm.",
  },
  {
    title: "Özelleştirilmiş Kutu",
    detail: "İsim, logo ve tema yazılı saklama / hediye kutuları.",
  },
];

export default function CustomDesignPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Custom order"
        title="İsteğe özel tasarımlar"
        lead="Doğum günü, okul etkinliği veya marka hediyesi için çocuk-uygun, renkli 3D baskılı ürünler."
      />
      <section className="container-lilyum py-16">
        <div className="mb-10 rounded-[1.75rem] border border-navy/10 bg-white/70 p-6 sm:p-8">
          <p className="text-sm text-navy/70">
            Minimum sipariş: <strong className="text-navy">10+ adet</strong> · Üretim süresi
            sipariş adedine göre değişir.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-navy/10 bg-white/80 p-6 shadow-soft"
            >
              <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-r from-gold to-coral" />
              <h3 className="font-display text-xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/65">{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/iletisim" className="btn-primary">
            Özel sipariş için yazın
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
