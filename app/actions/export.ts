'use server'

import db from '@/lib/db'

export async function exportMonthData(year: number, month: number) {
    try {
        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 0, 23, 59, 59)
        const startTimestamp = Math.floor(startDate.getTime() / 1000)
        const endTimestamp = Math.floor(endDate.getTime() / 1000)

        const events = db.prepare(`
            SELECT 
                e.event_id,
                e.timestamp,
                s.names as species,
                b.name as box_name,
                b.location_lat,
                b.location_lng,
                e.image_url,
                e.occupancy_flag,
                e.temperature,
                d.serial_number as device
            FROM event e
            JOIN species s ON e.species_id = s.species_id
            JOIN bird_box b ON e.box_id = b.box_id
            JOIN device d ON e.device_id = d.device_id
            WHERE e.timestamp >= ? AND e.timestamp <= ?
            ORDER BY e.timestamp ASC
        `).all(startTimestamp, endTimestamp)

        // CSV
        const headers = ['Event ID', 'Date', 'Time', 'Species', 'Box Name', 'Latitude', 'Longitude', 'Image URL', 'Occupancy', 'Temperature', 'Device']
        
        const rows = events.map((e: any) => {
            const date = new Date(e.timestamp * 1000)
            return [
                e.event_id,
                date.toLocaleDateString(),
                date.toLocaleTimeString(),
                e.species,
                e.box_name,
                e.location_lat,
                e.location_lng,
                e.image_url || '',
                e.occupancy_flag,
                e.temperature || '',
                e.device
            ]
        })

        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n')

        return { success: true, data: csv }
    } catch (error) {
        console.error('Export failed:', error)
        return { success: false, error: 'Failed to export data' }
    }
}