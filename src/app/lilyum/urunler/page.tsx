"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { getProducts, type Product } from "@/lib/firestore";
import { coverImage, formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  function reload() {
    getProducts().then(setProducts);
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy">Ürünler</h1>
          <p className="mt-2 text-navy/60">Sitede görünen ürün kataloğu</p>
        </div>
        <Link href="/lilyum/urunler/yeni" className="btn-primary">
          Yeni Ürün
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-navy/10 bg-white/80">
        {!products ? (
          <div className="p-10 text-center text-navy/60">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center text-navy/60">Henüz ürün yok. İlk ürünü ekleyin.</div>
        ) : (
          <div className="divide-y divide-navy/10">
            {products.map((product) => {
              const cover = coverImage(product.images);
              return (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] text-navy/40">
                          Yok
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-navy">{product.title}</p>
                      <p className="text-sm text-navy/55">
                        {product.category} · {formatPrice(product.price)} ·{" "}
                        {product.published ? "Yayında" : "Taslak"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/lilyum/urunler/duzenle?id=${product.id}`}
                      className="rounded-full border border-navy/15 px-4 py-2 text-sm hover:border-coral hover:text-coral"
                    >
                      Düzenle
                    </Link>
                    <DeleteProductButton id={product.id} onDeleted={reload} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
