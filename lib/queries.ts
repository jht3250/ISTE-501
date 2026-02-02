import db from './db'
import { EventRow } from './types'

export function getEvents(): EventRow[] {
  const rows = db
    .prepare(`
      SELECT
        e.event_id,
        e.timestamp,
        e.common_name,
        b.name AS box_name,
        e.image_url
      FROM event e
      JOIN bird_box b ON e.box_id = b.box_id
      ORDER BY e.timestamp DESC
    `)
    .all()

  // Type assertion
  return rows as EventRow[]
}
