'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Chart } from '@/lib/chartSetup'
import { aggregateByDate } from '@/lib/aggregate'
import { buildKestrelDocument } from '@/app/components/KestrelReportPDF'
import type { EventRow } from '@/lib/types'

const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((m) => m.PDFViewer),
    {
        ssr: false,
        loading: () => (
            <div className="h-[700px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400">
                Loading preview…
            </div>
        ),
    }
)

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((m) => m.PDFDownloadLink),
    { ssr: false }
)

interface Props {
    events: EventRow[]
    month: number
    year: number
}

async function buildChartImage(
    labels: string[],
    kestrel: number[],
    bat: number[],
    other: number[]
): Promise<string> {
    const canvas = window.document.createElement('canvas')
    canvas.width = 520
    canvas.height = 200
    const ctx = canvas.getContext('2d')!

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Kestrel',
                    data: kestrel,
                    borderColor: '#D47456',
                    backgroundColor: '#D47456',
                    tension: 0.3,
                    pointRadius: 4,
                },
                {
                    label: 'Bat',
                    data: bat,
                    borderColor: '#F3BA45',
                    backgroundColor: '#F3BA45',
                    tension: 0.3,
                    pointRadius: 4,
                },
                {
                    label: 'Other',
                    data: other,
                    borderColor: '#72B0E5',
                    backgroundColor: '#72B0E5',
                    tension: 0.3,
                    pointRadius: 4,
                },
            ],
        },
        options: {
            animation: false,
            responsive: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: { color: '#000', boxWidth: 20 },
                },
            },
            scales: {
                x: { grid: { color: '#e0e0e0' }, ticks: { color: '#000' } },
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...[...kestrel, ...bat, ...other]) + 2,
                    grid: { color: '#e0e0e0' },
                    ticks: {
                        color: '#000',
                        stepSize: 1,      
                    },
                    title: { display: true, text: 'Visitors (by quantity)' },
                },
            },
        },
    })

    // Wait for the chart to finish rendering to the canvas
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

    const base64 = canvas.toDataURL('image/png')
    chart.destroy()
    return base64
}

export function KestrelReportViewer({ events, month, year }: Props) {
    const [chartImage, setChartImage] = useState<string | null>(null)

    const filtered = events.filter((e) => {
        const d = new Date(e.timestamp * 1000)
        return d.getMonth() === month && d.getFullYear() === year
    })

    const aggregated = aggregateByDate(filtered).sort(
        (a, b) =>
            new Date(`${a.date} ${year}`).getTime() -
            new Date(`${b.date} ${year}`).getTime()
    )

    // Build per-box stats
    const boxMap = new Map<string, { visits: number; lastTimestamp: number }>()
    for (const e of filtered) {
        const existing = boxMap.get(e.box_name)
        if (!existing) {
            boxMap.set(e.box_name, { visits: 1, lastTimestamp: e.timestamp })
        } else {
            existing.visits++
            if (e.timestamp > existing.lastTimestamp) existing.lastTimestamp = e.timestamp
        }
    }

    const locations = Array.from(boxMap.entries())
        .map(([name, { visits, lastTimestamp }]) => ({
            name,
            visits,
            lastVisit: new Date(lastTimestamp * 1000).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }),
        }))
        .sort((a, b) => b.visits - a.visits)
        .map((loc, i) => ({ ...loc, ranking: i + 1 }))

    const reportData = {
        reportDateStart: new Date(year, month, 1).toLocaleDateString('en-US'),
        reportDateEnd: new Date(year, month + 1, 0).toLocaleDateString('en-US'),
        mostUsedBox: locations[0]?.name ?? 'N/A',
        locations,
        graphData: aggregated,
    }

    useEffect(() => {
        if (aggregated.length === 0) {
            setChartImage(null)
            return
        }
        buildChartImage(
            aggregated.map((d) => d.date),
            aggregated.map((d) => d.kestrel),
            aggregated.map((d) => d.bat),
            aggregated.map((d) => d.other)
        ).then(setChartImage)
    }, [month, year])

    const monthLabel = new Date(year, month).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    })

    const doc = chartImage
        ? buildKestrelDocument({ data: reportData, chartImageBase64: chartImage })
        : null

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end">
                {doc ? (
                    <PDFDownloadLink
                        document={doc}
                        fileName={`kestrel-report-${year}-${String(month + 1).padStart(2, '0')}.pdf`}
                        className="px-4 py-2 bg-[#6b9aaa] text-white rounded hover:bg-[#5a8898] transition-colors text-sm font-medium"
                    >
                        {({ loading }: { loading: boolean }) =>
                            loading ? 'Generating…' : '⬇ Download Report'
                        }
                    </PDFDownloadLink>
                ) : (
                    <span className="text-sm text-gray-400">
                        {aggregated.length === 0 ? `No data for ${monthLabel}` : 'Building PDF…'}
                    </span>
                )}
            </div>

            {doc ? (
                <PDFViewer width="100%" height={700} showToolbar={false}>
                    {doc}
                </PDFViewer>
            ) : (
                <div className="h-[700px] bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    {aggregated.length === 0 ? `No data for ${monthLabel}` : 'Building PDF…'}
                </div>
            )}
        </div>
    )
}