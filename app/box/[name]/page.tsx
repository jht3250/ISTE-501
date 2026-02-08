// server-side data fetching
export const runtime = 'nodejs'
import { getEvents } from '@/lib/queries'
import ViewToggle from './ViewToggle'

type Props = {
  params: Promise<{
    name: string
  }>
}

export default async function EventsPage({ params }: Props) {
  const { name } = await params
  const boxName = decodeURIComponent(name)

  // console.log('PAGE boxName:', boxName)

  const events = getEvents()

  return <ViewToggle events={events} boxName={boxName} />
}
