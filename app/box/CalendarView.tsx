'use client'

import { EventRow } from '@/lib/types'

type Props = { events: EventRow[] }

export default function CalendarView({ events }: Props) {
    
    // Group events by day
    const eventsByDay: Record<string, EventRow[]> = {}
    events.forEach(e => {
        const day = new Date(e.timestamp * 1000).toISOString().split('T')[0]
        if (!eventsByDay[day]) eventsByDay[day] = []
        eventsByDay[day].push(e)
    })

    // Example: generate 30-day grid for January
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)

    return (
        <div className="grid grid-cols-7 gap-2 auto-rows-fr">
            {daysInMonth.map(day => {
                const dateKey = `2026-01-${day.toString().padStart(2, '0')}`
                const dayEvents = eventsByDay[dateKey] || []

                return (
                    <div key={day} className="p-2 bg-gray-100 rounded h-24 flex flex-col">
                        <div className="text-xs font-bold">{day}</div>
                        <div className="flex-1 flex flex-col gap-1 mt-1 overflow-y-auto">
                            {dayEvents.map(ev => (
                                <div
                                    key={ev.event_id}
                                    className="h-3 rounded bg-orange-400 text-[10px] text-white flex items-center justify-center"
                                >
                                    {new Date(ev.timestamp * 1000).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
