'use client'

import '@/lib/chartSetup'  
import { Line } from 'react-chartjs-2'
import type { VisitCount } from '@/lib/types'

interface Props {
    data: VisitCount[]
    month: number
    year: number
    setMonth: (m: number) => void
    setYear: (y: number) => void
}

export default function VisitsChart({ data, month, year, setMonth, setYear }: Props) {
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

    const filtered = [...data]
        .filter((d) => {
            const parsed = new Date(`${d.date} ${year}`)
            return parsed.getMonth() === month
        })
        .sort(
            (a, b) =>
                new Date(`${a.date} ${year}`).getTime() -
                new Date(`${b.date} ${year}`).getTime()
        )

    const chartData = {
        labels: filtered.map((d) => d.date),
        datasets: [
            {
                label: 'Kestrel',
                data: filtered.map((d) => d.kestrel),
                borderColor: '#D47456',
                backgroundColor: '#D47456',
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Bat',
                data: filtered.map((d) => d.bat),
                borderColor: '#F3BA45',
                backgroundColor: '#F3BA45',
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Other',
                data: filtered.map((d) => d.other),
                borderColor: '#72B0E5',
                backgroundColor: '#72B0E5',
                tension: 0.3,
                pointRadius: 4,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: { color: '#000', boxWidth: 20 },
            },
        },
        scales: {
            x: {
                grid: { color: '#e0e0e0' },
                ticks: { color: '#000' },
            },
            y: {
                beginAtZero: true,
                suggestedMax: 5,
                max: Math.max(5, ...chartData.datasets.flatMap((d) => d.data)) + 1,
                grid: { color: '#e0e0e0' },
                ticks: { color: '#000', precision: 0 },
                title: { display: true, text: 'Visitors (by quantity)' },
            },
        },
    }

    return (
        <div className="mt-12 w-full p-4 rounded-md">
            <div className="flex items-center justify-between mb-4">
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

            <div className="h-[350px]">
                {filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-sm text-zinc-400 italic">
                        No data for {monthLabel}
                    </div>
                ) : (
                    <Line data={chartData} options={options} />
                )}
            </div>
        </div>
    )
}