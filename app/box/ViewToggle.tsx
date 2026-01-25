'use client'
import { useState } from 'react'
import ListView from './ListView'
import CalendarView from './CalendarView'
import { EventRow } from '@/lib/types'

import Link from 'next/link'

type Props = { events: EventRow[] }

export default function ViewToggle({ events }: Props) {
    const [view, setView] = useState<'list' | 'calendar'>('calendar')

    return (
        <main className="m-8 bg-white">
            {/* Header section */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 group"
                >
                    <span className="text-xl">&lt;</span>
                    <span className='hover:underline'>Salmon Creek</span>
                </Link>

                <button className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                    Download (month) data
                </button>
            </div>
            {/* Table controls */}
            <div className="flex items-center justify-between mb-4">
                {/* <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-teal-600" />
                    Toggle List View
                </label> */}
                {/* Toggle buttons */}
                <div className="flex gap-2">
                    <button
                        className={`px-2 py-1 rounded ${view === 'list' ? 'bg-teal-600 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setView('list')}
                    >
                        List
                    </button>
                    <button
                        className={`px-2 py-1 rounded ${view === 'calendar' ? 'bg-teal-600 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setView('calendar')}
                    >
                        Calendar
                    </button>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                    <button>{'<'}</button>
                    <span>January</span>
                    <button>{'>'}</button>
                </div>

                <span className="text-sm">ⓘ</span>
            </div>

            {/* Conditional render */}
            {view === 'list' ? (
                <ListView events={events} />
            ) : (
                <CalendarView events={events} />
            )}
        </main>
    )
}
