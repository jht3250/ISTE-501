// server-side data fetching
export const runtime = 'nodejs'
import { getEvents } from '@/lib/queries'
import ViewToggle from './ViewToggle'

export default function EventsPage() {
  const events = getEvents()

  return <ViewToggle events={events} /> // pass events down
}
