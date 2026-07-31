import { AdminShell } from "@/components/AdminShell";
import { WorkshopForm } from "@/components/admin/WorkshopForm";

export default function NewWorkshopPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy">Yeni Atölye</h1>
      <div className="mt-8">
        <WorkshopForm />
      </div>
    </AdminShell>
  );
}
