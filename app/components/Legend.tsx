'use client'

import { useState, useRef, useEffect } from 'react'
import { SPECIES_COLORS } from '@/lib/speciesColors'

export default function Legend() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="px-2 py-1"
        aria-label="Legend"
      >
        ⓘ
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-[var(--color-dark-gray)] shadow-lg p-3 text-sm z-50">
          <div className="font-semibold mb-2">Key</div>

          {Object.entries(SPECIES_COLORS).map(([label, color]) => (
            <div key={label} className="flex items-center mb-2">
              <span className={`w-30 px-2 py-1 rounded-lg ${color}`}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
