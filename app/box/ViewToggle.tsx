'use client'
import { useState } from 'react'
import ListView from './ListView'
import CalendarView from './CalendarView'
import { EventRow } from '@/lib/types'

import Link from 'next/link'
import Legend from '../components/Legend'

type Props = { events: EventRow[] }

export default function ViewToggle({ events }: Props) {
    const [view, setView] = useState<'list' | 'calendar'>('calendar')

    // Get current month/year
    const [year, setYear] = useState(() => new Date().getFullYear())
    const [month, setMonth] = useState(() => new Date().getMonth())

    const monthName = new Date(year, month).toLocaleString('default', {
        month: 'long',
    })

    function goPrev() {
        setMonth(m => (m === 0 ? 11 : m - 1))
        setYear(y => (month === 0 ? y - 1 : y))
    }

    function goNext() {
        setMonth(m => (m === 11 ? 0 : m + 1))
        setYear(y => (month === 11 ? y + 1 : y))
    }

    return (
        <main className="m-10 mx-20">
            {/* Header section */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 group"
                >
                    <span className="text-xl">&lt;</span>
                    <span className='hover:underline text-xl font-[var(--font-noto-serif)]'>Salmon Creek</span>
                </Link>

                <button className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                    Download {monthName} data
                </button>
            </div>
            {/* Table controls */}
            <div className="flex items-center justify-between m-8 relative">
                {/* Toggle switch */}
                <div className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={view === 'list'}
                        onChange={() => setView(view === 'list' ? 'calendar' : 'list')}
                    />
                    <img 
                        src={view === 'list' ? '/toggle-list.png' : '/toggle-calendar.png'}
                        alt="Toggle View"
                        className="w-8 h-4 cursor-pointer"
                        onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
                    />
                    <span 
                        className="cursor-pointer"
                        onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
                    >
                        Toggle List View
                    </span>
                </div>

                {/* Centered month navigation */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-sm font-medium">
                    <button className="text-lg" onClick={goPrev}>{'<'}</button>
                    <span className="text-xl font-[var(--font-noto-serif)]">{monthName}</span>
                    <button className="text-lg" onClick={goNext}>{'>'}</button>
                </div>

                <Legend />
            </div>

            <div className='m-8'>
                {/* Conditional render */}
                {view === 'list' ? (
                    <ListView
                        events={events}
                        year={year}
                        month={month}
                    />
                ) : (
                    <CalendarView
                        events={events}
                        year={year}
                        month={month}
                    />
                )}
            </div>
        </main>
    )
}
