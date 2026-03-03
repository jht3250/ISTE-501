'use client'

import { EventRow } from '@/lib/types'
import { SPECIES_COLORS } from '@/lib/speciesColors'

type Props = {
    events: EventRow[]
    year: number
    month: number // 0–11 (JS Date) 
    onEventClick: (event: EventRow) => void
}

export default function CalendarView({ events, year, month, onEventClick }: Props) {
    // Group events by day
    const eventsByDay: Record<string, EventRow[]> = {}
    events.forEach(e => {
        const day = new Date(e.timestamp * 1000).toLocaleDateString('en-CA')
        if (!eventsByDay[day]) eventsByDay[day] = []
        eventsByDay[day].push(e)
    })


    // Calendar math
    const firstDay = new Date(year, month, 1).getDay() // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    // Build grid cells
    const totalCells = firstDay + daysInMonth <= 35 ? 35 : 42

    const cells = Array.from({ length: totalCells }, (_, i) => {
        const day = i - firstDay + 1

        if (day < 1) {
            return {
                day: daysInPrevMonth + day,
                inMonth: false,
                date: new Date(year, month - 1, daysInPrevMonth + day),
            }
        }

        if (day > daysInMonth) {
            return {
                day: day - daysInMonth,
                inMonth: false,
                date: new Date(year, month + 1, day - daysInMonth),
            }
        }

        return {
            day,
            inMonth: true,
            date: new Date(year, month, day),
        }
    })

    return (
        <div className="grid grid-cols-7 gap-2">
            {cells.map((cell, idx) => {
                const dateKey = cell.date.toLocaleDateString('en-CA')
                const dayEvents = eventsByDay[dateKey] ?? []

                return (
                    <div
                        key={idx}
                        className={`h-28 rounded p-2 flex flex-col relative shadow-sm
                            ${cell.inMonth ? 'bg-[#D9D9D6]' : 'bg-[#D9D9D6] opacity-50'}
                        `}
                    >
                        <div className="absolute top-0 left-0">
                            <span className="text-xs font-bold bg-[#C4C0B8] text-black rounded-tl px-2 py-1 inline-block">{cell.day}</span>
                        </div>

                        {/* Events */}
                        <div className="flex flex-col gap-1 overflow-hidden mt-8">
                            {dayEvents.map(event => (
                                <div
                                    key={event.event_id}
                                    className={`h-4 rounded-full text-[10px] px-2 truncate text-black cursor-pointer
                                        ${SPECIES_COLORS[event.common_name] ?? 'bg-blue-400'}
                                    `}
                                    onClick={() => onEventClick(event)}
                                >
                                    {new Date(event.timestamp * 1000).toLocaleTimeString([], {
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
