"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { SeoForm } from "@/components/admin/SeoForm";
import { getSeoSettings } from "@/lib/firestore";
import type { SeoSettings } from "@/lib/site";

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<SeoSettings | null>(null);

  useEffect(() => {
    getSeoSettings().then(setSettings);
  }, []);

  return (
    <AdminShell>
      <div>
        <h1 className="font-display text-3xl text-navy">SEO</h1>
        <p className="mt-2 text-navy/60">
          Sayfa başlıkları, açıklamaları ve paylaşım kartı ayarları.
        </p>
      </div>
      <div className="mt-6">
        {settings ? (
          <SeoForm initial={settings} />
        ) : (
          <p className="text-navy/60">Yükleniyor...</p>
        )}
      </div>
    </AdminShell>
  );
}
