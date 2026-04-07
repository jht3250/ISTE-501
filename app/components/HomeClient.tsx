'use client'

import { useState } from 'react'
import VisitsChart from './ui/VisitsChart'
import type { EventRow, VisitCount } from '@/lib/types'

interface Props {
    events: EventRow[]
    visitCounts: VisitCount[]
}

export default function HomeClient({ events, visitCounts }: Props) {
    const now = new Date()
    const [year, setYear] = useState(now.getFullYear())
    const [month, setMonth] = useState(now.getMonth())

    return (
        <div>
            <VisitsChart
                data={visitCounts}
                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
            />

            {/* Link to report page — passes month/year as search params */}
            <div className="flex justify-end mt-4">
                <a
                    href={`/report?month=${month}&year=${year}`}
                    className="lg:w-80 px-4 py-2 bg-[#609EA0] text-white text-center rounded cursor-pointer hover:opacity-50 transition"
                >
                    View Report
                </a>
            </div>
        </div>
    )
}