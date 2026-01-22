'use client'

import Link from 'next/link'

export default function ListView() {
  return (
    <main className='m-8 bg-white'>
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:underline"
        >
          <span className="text-xl">←</span>
          <span>Salmon Creek</span>
        </Link>

        <button className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
          Download (month) data
        </button>
      </div>

      {/* Table controls */}
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-teal-600" />
          Toggle List View
        </label>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button>{'<'}</button>
          <span>June</span>
          <button>{'>'}</button>
        </div>

        <span className="text-sm">ⓘ</span>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2 text-left">Date</th>
              <th className="border px-3 py-2 text-left">Timestamp</th>
              <th className="border px-3 py-2 text-left">Animal Type</th>
              <th className="border px-3 py-2 text-left">Box Location</th>
              <th className="border px-3 py-2 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="border px-3 py-2">06/24/2025</td>
              <td className="border px-3 py-2">18:18</td>
              <td className="border px-3 py-2">
                <span className="rounded-full bg-orange-400 px-3 py-1 text-xs text-white">
                  Kestrel
                </span>
              </td>
              <td className="border px-3 py-2">Salmon Creek</td>
              <td className="border px-3 py-2 text-center">🖼️</td>
            </tr>

            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="even:bg-gray-100">
                <td className="border px-3 py-4" />
                <td className="border px-3 py-4" />
                <td className="border px-3 py-4" />
                <td className="border px-3 py-4" />
                <td className="border px-3 py-4" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}