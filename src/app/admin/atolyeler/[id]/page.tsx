import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { WorkshopForm } from "@/components/admin/WorkshopForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditWorkshopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workshop = await prisma.workshop.findUnique({ where: { id } });
  if (!workshop) notFound();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy">Atölyeyi Düzenle</h1>
      <p className="mt-2 text-navy/60">{workshop.title}</p>
      <div className="mt-8">
        <WorkshopForm initial={workshop} />
      </div>
    </AdminShell>
  );
}
