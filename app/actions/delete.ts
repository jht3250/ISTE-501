'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteBox(boxId: number) {
    // CASCADE in schema deletes all events + devices for this box
    db.prepare('DELETE FROM bird_box WHERE box_id = ?').run(boxId)
    revalidatePath('/')
}

export async function deleteEvent(eventId: number) {
    // const eventId = Number(formData.get('eventId'))
    db.prepare('DELETE FROM event WHERE event_id = ?').run(eventId)
    revalidatePath('/corrupted')
}

export async function deleteAllCorrupted() {
    db.prepare(`
        DELETE FROM event WHERE
            image_url IS NULL
            OR image_url = ''
            OR timestamp <= 0
            OR species_id NOT IN (SELECT species_id FROM species WHERE names IN ('Kestrel', 'Bat', 'Other'))
            OR box_id IN (
                SELECT box_id FROM bird_box WHERE
                    name LIKE '%?%'
                    OR LOWER(name) LIKE '%invalid%'
                    OR LOWER(name) LIKE '%disconnected%'
                    OR LOWER(name) LIKE '%not found%'
            )
    `).run()
    revalidatePath('/corrupted')
}
