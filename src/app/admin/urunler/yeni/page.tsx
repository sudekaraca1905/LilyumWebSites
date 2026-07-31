import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy">Yeni Ürün</h1>
      <p className="mt-2 text-navy/60">Ürün sitede hemen görünecek şekilde eklenebilir.</p>
      <div className="mt-8">
        <ProductForm />
      </div>
    </AdminShell>
  );
}
