import { EventRow } from "./types";

export function aggregateByDate(events: EventRow[]) {
  const map = new Map<string, { kestrel: number; bat: number; other: number }>()

  for (const e of events) {
    const date = new Date(e.timestamp * 1000)
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    if (!map.has(date)) {
      map.set(date, { kestrel: 0, bat: 0, other: 0 })
    }

    const row = map.get(date)!
    if (e.common_name === 'Kestrel') row.kestrel++
    else if (e.common_name === 'Bat') row.bat++
    else row.other++
  }

  return Array.from(map.entries()).map(([date, counts]) => ({
    date,
    ...counts,
  }))
}
