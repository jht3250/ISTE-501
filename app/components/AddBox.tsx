'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddBoxModalWrapper() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boxName, setBoxName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = async () => {
    if (!boxName.trim()) return;

    setLoading(true);
    setError(null);

    // Get current geolocation
    let lat: number, lng: number;
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch {
      setError("Could not get your location. Please allow location access and try again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", boxName.trim());
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("/api/add-box", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to add box");
        setLoading(false);
        return;
      }

      // Close modal and refresh the page so the new box appears
      setIsModalOpen(false);
      setBoxName("");
      setImageFile(null);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBoxName("");
    setImageFile(null);
    setError(null);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-4 py-2 border text-black rounded cursor-pointer hover:opacity-50 transition"
      >
        Add New Box
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-md px-10 py-8 shadow-lg w-160 flex flex-col gap-6">

            <div className="flex items-center gap-4">
              <label className="text-xl font-serif font-semibold w-30 shrink-0">
                Box Name:
              </label>
              <input
                type="text"
                placeholder="Name here..."
                value={boxName}
                onChange={(e) => setBoxName(e.target.value)}
                className="flex-1 border border-gray-400 px-4 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-teal-600"
                disabled={loading}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-xl font-serif font-semibold w-30 shrink-0">
                Image:
              </label>
              <div className="flex-1 flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-gray-400 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  disabled={loading}
                >
                  Choose File
                </button>
                <span className="text-sm text-gray-500 truncate">
                  {imageFile ? imageFile.name : "No file chosen"}
                </span>
                {imageFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-gray-400 hover:text-red-500 transition text-lg leading-none cursor-pointer"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <p className="text-red-600 text-sm">
              REMEMBER: you must be standing at or near the location of the bird box
              to ensure the correct geo-coordinates are stored.
            </p>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-between gap-6 mt-2">
              <button
                onClick={handleConfirm}
                disabled={loading || !boxName.trim()}
                className="flex-1 px-8 py-4 bg-teal-700 text-white text-xl font-serif font-semibold rounded-sm cursor-pointer hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding…" : "Add New Box"}
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-8 py-4 border border-black text-black text-xl font-serif font-semibold rounded-sm cursor-pointer hover:bg-gray-100 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
