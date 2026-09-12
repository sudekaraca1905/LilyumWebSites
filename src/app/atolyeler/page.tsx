import type { Metadata } from "next";
import { WorkshopCard } from "@/components/Cards";
import { EmptyState, PageHero, SiteShell } from "@/components/SiteShell";
import { getPublishedWorkshops, getSeoSettings } from "@/lib/firestore";
import { coverImage } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const page = seo.pages.atolyeler;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/atolyeler" },
    openGraph: { title: page.title, description: page.description, url: "/atolyeler" },
  };
}

export default async function WorkshopsPage() {
  const workshops = await getPublishedWorkshops();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Okul etkinlikleri"
        title="Atölyeler"
        lead="3D baskı ile desteklenen, çocukların üreterek öğrendiği okul atölyeleri."
      />
      <section className="container-lilyum py-16">
        {workshops.length === 0 ? (
          <EmptyState
            title="Atölyeler yakında"
            description="Okul atölyelerimiz çok yakında burada listelenecek."
            href="/iletisim"
            cta="İletişime Geç"
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workshops.map((w) => (
              <WorkshopCard
                key={w.id}
                title={w.title}
                summary={w.summary}
                slug={w.slug}
                ageGroup={w.ageGroup}
                duration={w.duration}
                imageUrl={coverImage(w.images)}
              />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
