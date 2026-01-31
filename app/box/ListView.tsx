'use client'

import { EventRow } from '@/lib/types'
import { SPECIES_COLORS } from '@/lib/speciesColors'

type Props = { events: EventRow[] }

export default function ListView({ events }: Props) {
  return (
    <div>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#CBC4BC]">
            <tr>
              <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Date</th>
              <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Timestamp</th>
              <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Animal Type</th>
              <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Box Location</th>
              <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Image</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => {
              const date = new Date(event.timestamp * 1000)

              return (
                <tr key={event.event_id} className={index === 0 ? 'bg-[#f2f2f1]' : index === 1 ? 'bg-[#e0dbd7]' : index % 2 === 0 ? 'bg-[#f2f2f1]' : 'bg-[#e0dbd7]'}>
                  <td className="border px-3 py-2">
                    {date.toLocaleDateString()}
                  </td>

                  <td className="border px-3 py-2">
                    {date.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>

                  <td className="border px-3 py-2">
                    <span className={`rounded-full px-4 py-0.5 text-xs whitespace-nowrap block min-w-[80px] text-center
                                        ${SPECIES_COLORS[event.common_name] ?? SPECIES_COLORS.Other}
                                    `}>
                      {event.common_name}
                    </span>
                  </td>

                  <td className="border px-3 py-2">
                    Salmon Creek
                  </td>

                  <td className="border px-3 py-2 text-center">
                    <img 
                      src="/image-icon.png" 
                      alt="Image" 
                      className="w-6 h-6 mx-auto"
                    />
                  </td>
                </tr>
              )
            })}
            
            {/* Add 8 empty rows */}
            {[...Array(8)].map((_, index) => {
              const rowIndex = events.length + index
              return (
                <tr key={`empty-${index}`} className={rowIndex % 2 === 0 ? 'bg-[#f2f2f1]' : 'bg-[#e0dbd7]'}>
                  <td className="border px-3 py-2 h-[40px]"></td>
                  <td className="border px-3 py-2 h-[40px]"></td>
                  <td className="border px-3 py-2 h-[40px]"></td>
                  <td className="border px-3 py-2 h-[40px]"></td>
                  <td className="border px-3 py-2 text-center h-[40px]"></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
