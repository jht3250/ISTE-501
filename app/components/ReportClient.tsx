'use client'

import { useState } from 'react'
import { KestrelReportViewer } from '@/app/components/KestrelReportViewer'
import type { EventRow } from '@/lib/types'
import Link from 'next/link'

interface Props {
    events: EventRow[]
    initialMonth: number
    initialYear: number
}

export default function ReportClient({ events, initialMonth, initialYear }: Props) {
    const [month, setMonth] = useState(initialMonth)
    const [year, setYear] = useState(initialYear)

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(year - 1) }
        else setMonth(month - 1)
    }

    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(year + 1) }
        else setMonth(month + 1)
    }

    const monthLabel = new Date(year, month).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    })

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 group"
                >
                    <span className="text-xl">&lt;</span>
                    <span className='hover:underline text-xl font-[var(--font-noto-serif)]'>Kestrel Boxes Report</span>
                </Link>
            </div>
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="px-3 py-1 rounded hover:bg-zinc-200 transition text-lg font-bold"
                >
                    ‹
                </button>
                <span className="text-sm font-semibold">{monthLabel}</span>
                <button
                    onClick={nextMonth}
                    className="px-3 py-1 rounded hover:bg-zinc-200 transition text-lg font-bold"
                >
                    ›
                </button>
            </div>

            <KestrelReportViewer events={events} month={month} year={year} />
        </div>
    )
}