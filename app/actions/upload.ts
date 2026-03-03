'use server'

import db from '@/lib/db'
import { parseCSV } from '@/lib/csv'

export type UploadResult = {
  success: boolean
  eventsAdded: number
  error?: string
}

// Expected CSV format from device SD cards:
// serial_number,timestamp,species,image_url,occupancy,temperature
//
// Example row:
// DEV-001,1739000000,Kestrel,/images/kestrel/k1.jpg,1,23.5
export async function processUpload(csvText: string): Promise<UploadResult> {
  try {
    const rows = parseCSV(csvText) as Record<string, string>[]

    if (rows.length === 0) {
      return { success: false, eventsAdded: 0, error: 'No data found in upload' }
    }

    const getDevice = db.prepare(
      'SELECT device_id, box_id FROM device WHERE serial_number = ?'
    )
    const getSpecies = db.prepare(
      'SELECT species_id FROM species WHERE names = ?'
    )
    const insertEvent = db.prepare(`
      INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    let eventsAdded = 0

    const transaction = db.transaction(() => {
      for (const row of rows) {
        const device = getDevice.get(row['serial_number']) as {
          device_id: number
          box_id: number
        } | undefined
        if (!device) continue

        const speciesRow = getSpecies.get(row['species']) as {
          species_id: number
        } | undefined
        if (!speciesRow) continue

        const timestamp = Number(row['timestamp'])
        if (!timestamp) continue

        insertEvent.run(
          device.device_id,
          device.box_id,
          speciesRow.species_id,
          timestamp,
          row['image_url'] || null,
          Number(row['occupancy']) || 0,
          row['temperature'] ? Number(row['temperature']) : null
        )
        eventsAdded++
      }
    })

    transaction()

    return { success: true, eventsAdded }
  } catch {
    return { success: false, eventsAdded: 0, error: 'Failed to process upload data' }
  }
}
