// ✨ NEW FILE: Server actions for updating events in the database
'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateEvent(eventId: number, data: {
    common_name?: string
    box_name?: string
    timestamp?: number
    image_url?: string | null
}) {
    try {
        // Update species if common_name changed
        if (data.common_name) {
            const species = db.prepare('SELECT species_id FROM species WHERE names = ?').get(data.common_name) as { species_id: number } | undefined
            if (species) {
                db.prepare('UPDATE event SET species_id = ? WHERE event_id = ?').run(species.species_id, eventId)
            }
        }

        // Update timestamp if changed
        if (data.timestamp) {
            db.prepare('UPDATE event SET timestamp = ? WHERE event_id = ?').run(data.timestamp, eventId)
        }

        // Update image_url if changed
        if (data.image_url !== undefined) {
            db.prepare('UPDATE event SET image_url = ? WHERE event_id = ?').run(data.image_url, eventId)
        }

        // Revalidate the page to show updated data
        revalidatePath('/box')
        return { success: true }
    } catch (error) {
        console.error('Failed to update event:', error)
        return { success: false, error: 'Failed to update event' }
    }
}