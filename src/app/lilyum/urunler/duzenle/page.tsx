"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById, type Product } from "@/lib/firestore";

function EditProductInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      router.replace("/lilyum/urunler");
      return;
    }
    getProductById(id).then((p) => {
      if (!p) {
        router.replace("/lilyum/urunler");
        return;
      }
      setProduct(p);
    });
  }, [id, router]);

  if (!product) {
    return <p className="text-navy/60">Yükleniyor...</p>;
  }

  return (
    <>
      <h1 className="font-display text-3xl text-navy">Ürünü Düzenle</h1>
      <p className="mt-2 text-navy/60">{product.title}</p>
      <div className="mt-8">
        <ProductForm initial={product} />
      </div>
    </>
  );
}

export default function EditProductPage() {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-navy/60">Yükleniyor...</p>}>
        <EditProductInner />
      </Suspense>
    </AdminShell>
  );
}
