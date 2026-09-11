"use client";

import { markMessageRead } from "@/lib/firestore";

export function MarkMessageReadButton({ id, onRead }: { id: string; onRead: () => void }) {
  async function mark() {
    await markMessageRead(id);
    onRead();
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
