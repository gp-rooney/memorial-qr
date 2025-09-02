// Purpose: Minimal image uploader (demo). Drag/drop or pick files, shows thumbnails, "uploads" to data URLs, emits callback.
"use client";

import { useCallback, useRef, useState } from "react";

export type UploadedFile = {
  name: string;
  size: number; // bytes
  url: string;  // data URL for demo preview/storage
};

type Props = {
  maxFiles?: number;      // default 10
  maxSizeMB?: number;     // per-file limit, default 10 MB
  onUploaded?: (files: UploadedFile[]) => void; // called when files are processed
};

export default function Uploader({ maxFiles = 10, maxSizeMB = 10, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      setError(null);
      if (!fileList) return;

      const files = Array.from(fileList);
      const remainingSlots = Math.max(0, maxFiles - items.length);
      const toUse = files.slice(0, remainingSlots);

      const overLimit = files.length > remainingSlots;
      if (overLimit) setError(`Only ${remainingSlots} more file(s) allowed (max ${maxFiles}).`);

      const tooBig = toUse.find((f) => f.size > maxSizeMB * 1024 * 1024);
      if (tooBig) {
        setError(`"${tooBig.name}" is larger than ${maxSizeMB} MB.`);
        return;
      }

      // Convert to data URLs so previews persist on refresh if saved to localStorage later
      Promise.all(
        toUse.map(
          (f) =>
            new Promise<UploadedFile>((resolve) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({ name: f.name, size: f.size, url: String(reader.result) });
              reader.readAsDataURL(f);
            }),
        ),
      ).then((converted) => {
        setItems((prev) => {
          const next = [...prev, ...converted];
          onUploaded?.(next);
          return next;
        });
      });
    },
    [items.length, maxFiles, maxSizeMB, onUploaded],
  );

  const onInputChange = (e: any) => {
    handleFiles(e.target.files);
    // allow re-selecting same file later
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer?.files ?? null);
  };

  const removeAt = (idx: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      onUploaded?.(next);
      return next;
    });
  };

  return (
    <div className="grid gap-3">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
          dragOver ? "bg-gray-50" : ""
        }`}
        onClick={() => inputRef.current?.click()}
        role="button"
        aria-label="Upload images"
        tabIndex={0}
      >
        <p className="font-medium">Drag & drop images here</p>
        <p className="text-sm text-gray-600">or click to choose files (up to {maxFiles})</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Thumbnails */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((it, i) => (
            <div key={`${it.name}-${i}`} className="relative border rounded overflow-hidden">
              <img src={it.url} alt={it.name} className="w-full h-auto" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 flex justify-between items-center">
                <span className="truncate">{it.name}</span>
                <button
                  className="ml-2 px-2 py-0.5 rounded bg-white/20 hover:bg-white/30"
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${it.name}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
