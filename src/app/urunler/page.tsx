import { ProductCard } from "@/components/Cards";
import { EmptyState, PageHero, SiteShell } from "@/components/SiteShell";
import { getPublishedProducts } from "@/lib/firestore";
import { coverImage, formatPrice } from "@/lib/utils";

export const metadata = { title: "Ürünler" };

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <SiteShell>
      <PageHero
        eyebrow="3D baskı"
        title="Ürünler"
        lead="Anahtarlık, rozet, figür ve daha fazlası — 3D baskılı ürün kataloğumuz."
      />
      <section className="container-lilyum py-16">
        {products.length === 0 ? (
          <EmptyState
            title="Ürünler yakında"
            description="3D baskılı ürün kataloğumuz çok yakında burada olacak."
            href="/ozel-tasarim"
            cta="Özel Tasarımı İncele"
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                title={p.title}
                description={p.description}
                slug={p.slug}
                category={p.category}
                imageUrl={coverImage(p.images)}
                priceLabel={formatPrice(p.price)}
              />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
