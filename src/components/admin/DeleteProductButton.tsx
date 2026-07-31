"use client";

import { useRouter } from "next/navigation";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  async function onDelete() {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={onDelete}
      className="rounded-full border border-coral/30 px-4 py-2 text-sm text-coral-deep hover:bg-coral/10"
    >
      Sil
    </button>
  );
}
