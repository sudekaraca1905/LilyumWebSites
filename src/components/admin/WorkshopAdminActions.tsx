"use client";

import { useRouter } from "next/navigation";

export function WorkshopAdminActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const router = useRouter();

  async function toggle() {
    await fetch(`/api/workshops/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
  }

  async function remove() {
    if (!confirm("Bu atölyeyi silmek istiyor musunuz?")) return;
    await fetch(`/api/workshops/${id}`, { method: "DELETE" });
    router.refresh();
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
