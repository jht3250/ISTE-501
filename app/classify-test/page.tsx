"use client";
import { useState, useEffect } from "react";

const DEVICES = ["DEV-001","DEV-002","DEV-003","DEV-004","DEV-005","DEV-006"];

const SPECIES_COLORS: Record<string, string> = {
  kestrel: "#f59e0b",
  bat: "#8b5cf6",
  other: "#64748b",
};

interface ClassifyResult {
  event_id: string;
  species: string;
  confidence: number;
  all_probs: Record<string, number>;
  image_url: string;
}

export default function ClassifyTest() {
  const [images, setImages] = useState<{ label: string; path: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);

  useEffect(() => {
    fetch("/api/images")
      .then(r => r.json())
      .then(data => {
        setImages(data);
        if (data.length > 0) setSelectedImage(data[0].path);
      });
  }, []);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClassify() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const imgRes = await fetch(selectedImage);
      if (!imgRes.ok) throw new Error("Could not load image");
      const blob = await imgRes.blob();

      const form = new FormData();
      form.append("file", blob, "image.jpg");
      form.append("serial_number", selectedDevice);
      form.append("occupancy", "1");

      const res = await fetch("/api/classify", { method: "POST", body: form });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Classify & Save</h1>
        <p className="text-gray-600 text-sm mt-1">
          Select an image and a device to classify it and save the event to the database.
        </p>
      </div>

      {/* Image picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black">Image</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-sm text-slate-200"
          value={selectedImage}
          onChange={e => { setSelectedImage(e.target.value); setResult(null); setError(null); }}
        >
          {images.map(img => (
            <option key={img.path} value={img.path}>{img.label}</option>
          ))}
        </select>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full max-h-52 object-contain rounded-lg bg-slate-800 border border-slate-700"
          />
        )}
      </div>

      {/* Device picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black">Device</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-sm text-slate-200"
          value={selectedDevice}
          onChange={e => setSelectedDevice(e.target.value)}
        >
          {DEVICES.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <button
        onClick={handleClassify}
        disabled={loading}
        className="w-full bg-[#6489a0] hover:bg-[#508090] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
      >
        {loading ? "Classifying..." : "Classify & Save to Database"}
      </button>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <div
            className="text-3xl font-extrabold uppercase tracking-wide"
            style={{ color: SPECIES_COLORS[result.species] ?? "#e2e8f0" }}
          >
            {result.species}
          </div>
          <p className="text-slate-400 text-sm">{result.confidence}% confidence</p>

          <div className="space-y-2">
            {Object.entries(result.all_probs).map(([name, prob]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-16 text-sm text-slate-400 capitalize">{name}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${prob}%`, background: SPECIES_COLORS[name] ?? "#94a3b8" }}
                  />
                </div>
                <span className="w-14 text-right text-sm font-semibold text-slate-200">{prob}%</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-700">
            Saved as event #{result.event_id} &mdash; {result.image_url}
          </p>
        </div>
      )}
    </div>
  );
}
