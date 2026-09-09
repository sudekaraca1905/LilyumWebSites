import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/ImageGallery";
import { PageHero, SiteShell } from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { formatPrice, parseImages } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  return { title: product?.title || "Ürün" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.published) notFound();

  const images = parseImages(product.images);

  return (
    <SiteShell>
      <PageHero eyebrow={product.category} title={product.title} lead={formatPrice(product.price)} />
      <section className="container-lilyum grid gap-10 py-16 lg:grid-cols-2">
        <ImageGallery images={images} alt={product.title} />
        <div>
          <p className="leading-relaxed text-navy/75">{product.description}</p>
          <Link href="/iletisim" className="btn-primary mt-8">
            Sipariş / Bilgi Al
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
