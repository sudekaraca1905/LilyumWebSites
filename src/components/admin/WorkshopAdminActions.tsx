"use client";

import { deleteWorkshop, updateWorkshop } from "@/lib/firestore";

export function WorkshopAdminActions({
  id,
  published,
  onChanged,
}: {
  id: string;
  published: boolean;
  onChanged: () => void;
}) {
  async function toggle() {
    await updateWorkshop(id, { published: !published });
    onChanged();
  }

  async function remove() {
    if (!confirm("Bu atölyeyi silmek istiyor musunuz?")) return;
    await deleteWorkshop(id);
    onChanged();
  }

  return (
    <>
      <button
        onClick={toggle}
        className="rounded-full border border-navy/15 px-4 py-2 text-sm hover:border-gold"
      >
        {published ? "Gizle" : "Yayınla"}
      </button>
      <button
        onClick={remove}
        className="rounded-full border border-coral/30 px-4 py-2 text-sm text-coral-deep"
      >
        Sil
      </button>
    </>
  );
}
