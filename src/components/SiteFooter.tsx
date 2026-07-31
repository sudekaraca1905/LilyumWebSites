import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-navy/10 bg-navy text-cream">
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />

      <div className="container-lilyum grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-mark.png"
              alt="Lilyum"
              width={52}
              height={52}
              className="h-12 w-12 rounded-xl bg-cream/95 object-contain p-1"
            />
            <div>
              <p className="font-display text-xl font-semibold">Lilyum Baskı Atölyesi</p>
              <p className="text-sm text-cream/70">Düşle, Tasarla, Şekillendir</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/75">
            Okullarda öğrenmeyi oyunla birleştiren 3D baskı atölyeleri ve isteğe özel
            ürünler üretiyoruz.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Keşfet
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            <Link href="/atolyeler" className="hover:text-white">
              Atölyeler
            </Link>
            <Link href="/urunler" className="hover:text-white">
              Ürünler
            </Link>
            <Link href="/ozel-tasarim" className="hover:text-white">
              Özel Tasarım
            </Link>
            <Link href="/iletisim" className="hover:text-white">
              İletişim
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            İletişim
          </p>
          <div className="mt-4 space-y-2 text-sm text-cream/80">
            <p>info@lilyum.com</p>
            <p>Instagram: @lilyumbaskiatolyesi</p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/55">
        Lilyum Baskı Atölyesi © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
