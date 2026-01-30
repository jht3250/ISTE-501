'use client'

import { EventRow } from '@/lib/types'
import { SPECIES_COLORS } from '@/lib/speciesColors'

type Props = { events: EventRow[] }

export default function ListView({ events }: Props) {
  return (
    <div>
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
            {events.map(event => {
              const date = new Date(event.timestamp * 1000)

              return (
                <tr key={event.event_id} className="even:bg-gray-100">
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
                    <span className={`rounded-full px-3 py-1 text-xs
                                        ${SPECIES_COLORS[event.common_name] ?? SPECIES_COLORS.Other}
                                    `}>
                      {event.common_name}
                    </span>
                  </td>

                  <td className="border px-3 py-2">
                    {event.box_name}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {event.image_url ? '🖼️' : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
