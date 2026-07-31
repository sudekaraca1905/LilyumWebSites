"use client";

import { useRouter } from "next/navigation";

export function MarkMessageReadButton({ id }: { id: string }) {
  const router = useRouter();

  async function mark() {
    await fetch(`/api/messages/${id}`, { method: "PUT" });
    router.refresh();
  }

  return (
    <button
      onClick={mark}
      className="rounded-full border border-navy/15 px-4 py-2 text-sm hover:border-coral hover:text-coral"
    >
      Okundu
    </button>
  );
}
