import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SiteShell } from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

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

  return (
    <SiteShell>
      <PageHero eyebrow={product.category} title={product.title} lead={formatPrice(product.price)} />
      <section className="container-lilyum grid gap-10 py-16 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-navy/10 bg-[linear-gradient(135deg,#FFF1E6,#FFE8D8)]">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Image src="/images/logo-mark.png" alt="" width={180} height={180} />
            </div>
          )}
        </div>
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
