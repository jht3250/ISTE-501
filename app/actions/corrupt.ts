'use server'

import db from '@/lib/db'
import { EventRow } from '@/lib/types'

export async function getCorruptedEventsAction(): Promise<EventRow[]> {
    const rows = db
    .prepare(`
        SELECT
        e.event_id,
        e.timestamp,
        s.names as common_name,
        b.name AS box_name,
        e.image_url,
        e.confidence
        FROM event e
        JOIN species s ON e.species_id = s.species_id
        JOIN bird_box b ON e.box_id = b.box_id
        WHERE
        e.image_url IS NULL
        OR e.image_url = ''
        OR e.timestamp <= 0
        OR s.names NOT IN ('Kestrel', 'Bat', 'Other')
        OR b.name LIKE '%?%'
        OR LOWER(b.name) LIKE '%invalid%'
        OR LOWER(b.name) LIKE '%disconnected%'
        OR LOWER(b.name) LIKE '%not found%'
        ORDER BY e.timestamp DESC
    `)
    .all()

  return rows as EventRow[]
}
