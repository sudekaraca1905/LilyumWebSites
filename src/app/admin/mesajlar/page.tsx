import { AdminShell } from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";
import { MarkMessageReadButton } from "@/components/admin/MarkMessageReadButton";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy">Mesajlar</h1>
      <p className="mt-2 text-navy/60">İletişim formundan gelen talepler</p>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-navy/10 bg-white/80 p-10 text-center text-navy/60">
            Henüz mesaj yok.
          </div>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-3xl border p-5 ${
                message.read
                  ? "border-navy/10 bg-white/70"
                  : "border-coral/30 bg-white shadow-soft"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-navy">
                    {message.name} · {message.subject}
                  </p>
                  <p className="mt-1 text-sm text-navy/55">
                    {message.email}
                    {message.phone ? ` · ${message.phone}` : ""} ·{" "}
                    {new Date(message.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                {!message.read ? <MarkMessageReadButton id={message.id} /> : null}
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-navy/75">
                {message.message}
              </p>
            </article>
          ))
        )}
      </div>
    </AdminShell>
  );
}
