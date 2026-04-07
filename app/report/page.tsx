import { getEvents } from '@/lib/queries'
import ReportClient from '@/app/components/ReportClient'

export default async function ReportPage({
    searchParams,
}: {
    searchParams: Promise<{ month?: string; year?: string }>
}) {
    const { month: monthParam, year: yearParam } = await searchParams
    const events = getEvents()
    const now = new Date()
    const month = monthParam !== undefined ? parseInt(monthParam) : now.getMonth()
    const year = yearParam !== undefined ? parseInt(yearParam) : now.getFullYear()

    return <ReportClient events={events} initialMonth={month} initialYear={year} />
}