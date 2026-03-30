'use client'

import { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { VisitCount } from '@/lib/types'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

export default function VisitsChart({ data }: { data: VisitCount[] }) {
    const now = new Date()
    const [year, setYear] = useState(now.getFullYear())
    const [month, setMonth] = useState(now.getMonth()) // 0–11

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1) }
        else setMonth(m => m - 1)
    }

    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1) }
        else setMonth(m => m + 1)
    }

    const monthLabel = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })

    console.log('Chart data:', data)

    const filtered = [...data]
    .filter(d => {
        const parsed = new Date(`${d.date} ${year}`) 
        return parsed.getMonth() === month
    })
    .sort((a, b) => new Date(`${a.date} ${year}`).getTime() - new Date(`${b.date} ${year}`).getTime())

    const chartData = {
        labels: filtered.map(d => d.date),
        datasets: [
            {
                label: 'Kestrel',
                data: filtered.map(d => d.kestrel),
                borderColor: '#D47456',
                backgroundColor: '#D47456',
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Bat',
                data: filtered.map(d => d.bat),
                borderColor: '#F3BA45',
                backgroundColor: '#F3BA45',
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Other',
                data: filtered.map(d => d.other),
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
                labels: {
                    color: '#000',
                    boxWidth: 20,
                },
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
                max: Math.max(5, ...chartData.datasets.flatMap(d => d.data)) + 1,
                grid: { color: '#e0e0e0' },
                ticks: { color: '#000', precision: 0 },
                title: {
                    display: true,
                    text: 'Visitors (by quantity)',
                },
            },
        },
    }

    return (
        <div className="mt-12 w-full p-4 rounded-md">
            {/* Month navigation */}
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