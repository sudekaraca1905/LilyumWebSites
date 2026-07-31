import Link from "next/link";
import { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  title,
  lead,
  eyebrow,
}: {
  title: string;
  lead: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy/10 bg-[radial-gradient(circle_at_top_right,_rgba(255,184,77,0.28),_transparent_40%),radial-gradient(circle_at_20%_20%,_rgba(255,107,107,0.18),_transparent_35%),linear-gradient(180deg,#FFF8F3_0%,#FFEFE4_100%)] pt-28 pb-16">
      <div className="container-lilyum">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
          {title}
        </h1>
        <p className="section-lead">{lead}</p>
      </div>
    </section>
  );
}

export function EmptyState({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-navy/20 bg-white/50 px-8 py-16 text-center">
      <h3 className="font-display text-2xl text-navy">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-navy/65">{description}</p>
      {href && cta ? (
        <Link href={href} className="btn-primary mt-6">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}
