import { useState } from "react";
import api from "../services/api";
import { ImagePlus, Loader2, X } from "lucide-react";

/**
 * Upload button + preview. Calls onUpload(url) once the image is hosted.
 */
export default function ImageUpload({ value, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(data.url);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-2">
        Cover image
      </label>

      {value ? (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[var(--color-rule)]">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onUpload("")}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-[16/9] rounded-xl border-2 border-dashed border-[var(--color-rule)] cursor-pointer hover:border-[var(--color-indigo)] hover:bg-[var(--color-indigo-soft)]/30 transition-colors">
          {uploading ? (
            <Loader2
              size={20}
              className="animate-spin text-[var(--color-indigo)]"
            />
          ) : (
            <>
              <ImagePlus size={20} className="text-[var(--color-muted)] mb-2" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
                Click to upload
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-2 font-[var(--font-body)]">
          {error}
        </p>
      )}
    </div>
  );
}
