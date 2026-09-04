"use client";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
};

export function ImageUploadField({
  label = "Fotoğraf",
  value,
  onChange,
  onError,
}: ImageUploadFieldProps) {
  async function uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) {
      onError?.("Görsel yüklenemedi");
      return;
    }
    const data = await res.json();
    onChange(data.url);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadImage(file);
        }}
        className="block w-full text-sm"
      />
      <p className="mt-2 text-xs text-navy/50">JPG, PNG veya WEBP yükleyebilirsiniz.</p>
      {value ? (
        <div className="mt-4 flex items-end gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Önizleme" className="h-40 w-40 rounded-2xl object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full border border-coral/30 px-4 py-2 text-sm text-coral-deep hover:bg-coral/10"
          >
            Fotoğrafı kaldır
          </button>
        </div>
      ) : null}
    </div>
  );
}
