import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy">Ürünü Düzenle</h1>
      <p className="mt-2 text-navy/60">{product.title}</p>
      <div className="mt-8">
        <ProductForm initial={product} />
      </div>
    </AdminShell>
  );
}
