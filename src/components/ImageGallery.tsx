"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [];
  const current = safeImages[active] || null;

  if (!current) {
    return (
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-navy/10 bg-[linear-gradient(135deg,#FFF1E6,#FFE8D8)]">
        <Image src="/images/logo-mark.png" alt="" width={180} height={180} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-navy/10 bg-[linear-gradient(135deg,#FFF1E6,#FFE8D8)]">
        <Image
          src={current}
          alt={`${alt} - ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 50vw"
          priority
        />
      </div>
      {safeImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {safeImages.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                index === active
                  ? "border-coral ring-2 ring-coral/30"
                  : "border-navy/10 hover:border-coral/40"
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
