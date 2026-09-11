"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { WorkshopForm } from "@/components/admin/WorkshopForm";
import { getWorkshopById, type Workshop } from "@/lib/firestore";

function EditWorkshopInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [workshop, setWorkshop] = useState<Workshop | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      router.replace("/admin/atolyeler");
      return;
    }
    getWorkshopById(id).then((w) => {
      if (!w) {
        router.replace("/admin/atolyeler");
        return;
      }
      setWorkshop(w);
    });
  }, [id, router]);

  if (!workshop) {
    return <p className="text-navy/60">Yükleniyor...</p>;
  }

  return (
    <>
      <h1 className="font-display text-3xl text-navy">Atölyeyi Düzenle</h1>
      <p className="mt-2 text-navy/60">{workshop.title}</p>
      <div className="mt-8">
        <WorkshopForm initial={workshop} />
      </div>
    </>
  );
}

export default function EditWorkshopPage() {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-navy/60">Yükleniyor...</p>}>
        <EditWorkshopInner />
      </Suspense>
    </AdminShell>
  );
}
