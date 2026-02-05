'use client'

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
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: 'Kestrel',
                data: data.map(d => d.kestrel),
                borderColor: '#D47456',
                backgroundColor: '#D47456',
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Bat',
                data: data.map(d => d.bat),
                borderColor: '#F3BA45',
                backgroundColor: '#F3BA45',
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Other',
                data: data.map(d => d.other),
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
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    color: '#000',
                },
            },
            y: {
                beginAtZero: true,
                max: 5,
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    color: '#000',
                    precision: 0,
                },
                title: {
                    display: true,
                    text: 'Visitors (by quantity)'
                }
            },
        },
    }

    return (
        <div className="mt-12 h-[350px] w-full p-4 rounded-md">
            <Line data={chartData} options={options} />
        </div>
    )
}
