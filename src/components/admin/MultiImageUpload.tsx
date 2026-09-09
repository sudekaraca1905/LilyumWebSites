"use client";

import { useState } from "react";

type MultiImageUploadProps = {
  label?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  onError?: (message: string) => void;
  max?: number;
};

export function MultiImageUpload({
  label = "Fotoğraflar",
  value,
  onChange,
  onError,
  max = 12,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    const remaining = max - value.length;
    if (remaining <= 0) {
      onError?.(`En fazla ${max} fotoğraf ekleyebilirsiniz`);
      return;
    }

    setUploading(true);
    onError?.("");
    const next = [...value];

    try {
      const selected = Array.from(files).slice(0, remaining);
      for (const file of selected) {
        if (!file.type.startsWith("image/")) {
          onError?.("Sadece görsel dosyaları yükleyebilirsiniz");
          continue;
        }
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (!res.ok) {
          onError?.("Bazı görseller yüklenemedi");
          continue;
        }
        const data = await res.json();
        next.push(data.url);
      }
      onChange(next);
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    const tmp = next[index];
    next[index] = next[target];
    next[target] = tmp;
    onChange(next);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={uploading || value.length >= max}
        onChange={(e) => {
          void uploadFiles(e.target.files);
          e.target.value = "";
        }}
        className="block w-full text-sm"
      />
      <p className="mt-2 text-xs text-navy/50">
        Birden fazla fotoğraf seçebilirsiniz. İlk fotoğraf kapak olur. ({value.length}/{max})
      </p>
      {uploading ? <p className="mt-2 text-sm text-navy/55">Yükleniyor...</p> : null}

      {value.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="overflow-hidden rounded-2xl border border-navy/10 bg-cream/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Fotoğraf ${index + 1}`} className="h-32 w-full object-cover" />
              <div className="flex flex-wrap items-center justify-between gap-1 p-2">
                <span className="text-[11px] font-medium text-navy/60">
                  {index === 0 ? "Kapak" : `#${index + 1}`}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded-lg border border-navy/15 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === value.length - 1}
                    className="rounded-lg border border-navy/15 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="rounded-lg border border-coral/30 px-2 py-1 text-xs text-coral-deep"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
