import Image from "next/image";
import Link from "next/link";

export function WorkshopCard({
  title,
  summary,
  slug,
  ageGroup,
  duration,
  imageUrl,
}: {
  title: string;
  summary: string;
  slug: string;
  ageGroup?: string | null;
  duration?: string | null;
  imageUrl?: string | null;
}) {
  return (
    <Link
      href={`/atolyeler/${slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white/80 shadow-soft transition hover:-translate-y-1 hover:border-coral/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#FFF1E6,#FFE8D8)]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={120}
              height={120}
              className="opacity-70 transition group-hover:scale-110"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Atölye</p>
        <h3 className="mt-2 font-display text-2xl text-navy transition group-hover:text-coral-deep">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-navy/65">{summary}</p>
        {(ageGroup || duration) && (
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-navy/55">
            {ageGroup ? (
              <span className="rounded-full bg-cream-deep px-3 py-1">{ageGroup}</span>
            ) : null}
            {duration ? (
              <span className="rounded-full bg-cream-deep px-3 py-1">{duration}</span>
            ) : null}
          </div>
        )}
      </div>
    </Link>
  );
}

export function ProductCard({
  title,
  description,
  slug,
  category,
  priceLabel,
  imageUrl,
}: {
  title: string;
  description: string;
  slug: string;
  category: string;
  priceLabel: string;
  imageUrl?: string | null;
}) {
  return (
    <Link
      href={`/urunler/${slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white/80 shadow-soft transition hover:-translate-y-1 hover:border-gold/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#FFF1E6,#FFE8D8)]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={120}
              height={120}
              className="opacity-70 transition group-hover:scale-110"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
          {category}
        </p>
        <h3 className="mt-2 font-display text-xl text-navy">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-navy/65">{description}</p>
        <p className="mt-4 text-sm font-semibold text-coral">{priceLabel}</p>
      </div>
    </Link>
  );
}
