"use client";

import { deleteProduct } from "@/lib/firestore";

export function DeleteProductButton({ id, onDeleted }: { id: string; onDeleted: () => void }) {
  async function onDelete() {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await deleteProduct(id);
    onDeleted();
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
