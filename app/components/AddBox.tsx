'use client';

import { useState, useRef } from "react";

export default function AddBoxModalWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boxName, setBoxName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = (name: string) => {
    console.log("Box added:", name, imageFile);
    // something something
    setIsModalOpen(false);
    setBoxName("");
    setImageFile(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBoxName("");
    setImageFile(null);
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-4 py-2 border text-black rounded cursor-pointer hover:opacity-50 transition"
      >
        Add New Box
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-md px-10 py-8 shadow-lg w-[640px] flex flex-col gap-6">

            {/* Name input row */}
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
              />
            </div>

            {/* Image input row */}
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

            {/* Reminder text */}
            <p className="text-red-600 text-sm">
              REMEMBER: you must be standing at or near the location of the bird box
              to ensure the correct geo-coordinates are stored.
            </p>

            {/* Buttons */}
            <div className="flex justify-between gap-6 mt-2">
              <button
                onClick={() => handleConfirm(boxName)}
                className="flex-1 px-8 py-4 bg-teal-700 text-white text-xl font-serif font-semibold rounded-sm cursor-pointer hover:bg-teal-800 transition"
              >
                Add New Box
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-8 py-4 border border-black text-black text-xl font-serif font-semibold rounded-sm cursor-pointer hover:bg-gray-100 transition"
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