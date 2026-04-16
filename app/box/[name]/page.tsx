// server-side data fetching
export const runtime = 'nodejs'
import { getEventsByBox, getEventById } from '@/lib/queries'
import ViewToggle from './ViewToggle'

type Props = {
  params: Promise<{ name: string }>
  searchParams: Promise<{ event?: string }>
}

export default async function EventsPage({ params, searchParams }: Props) {
  const { name } = await params
  const boxName = decodeURIComponent(name)
  const { event: eventParam } = await searchParams

  const events = getEventsByBox(boxName)

  const eventId = eventParam ? Number(eventParam) : undefined
  const initialEvent = eventId ? getEventById(eventId) ?? null : null

  return <ViewToggle events={events} boxName={boxName} initialEvent={initialEvent} />
}
