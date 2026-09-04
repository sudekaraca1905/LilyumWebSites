import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";
import { WorkshopAdminActions } from "@/components/admin/WorkshopAdminActions";

export const dynamic = "force-dynamic";

export default async function AdminWorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy">Atölyeler</h1>
          <p className="mt-2 text-navy/60">
            Dokümandaki atölyeler yüklü. Yayında olup olmadığını buradan yönetebilirsiniz.
          </p>
        </div>
        <Link href="/admin/atolyeler/yeni" className="btn-primary">
          Yeni Atölye
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-navy/10 bg-white/80">
        <div className="divide-y divide-navy/10">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                  {workshop.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={workshop.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-navy/40">
                      Yok
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-navy">{workshop.title}</p>
                  <p className="text-sm text-navy/55">
                    {workshop.published ? "Yayında" : "Gizli"} · sıra {workshop.sortOrder}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/atolyeler/${workshop.id}`}
                  className="rounded-full border border-navy/15 px-4 py-2 text-sm hover:border-coral hover:text-coral"
                >
                  Düzenle
                </Link>
                <WorkshopAdminActions id={workshop.id} published={workshop.published} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
