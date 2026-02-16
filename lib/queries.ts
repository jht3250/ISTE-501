import db from './db'
import {
  EventRow,
  CorruptedDataNotification,
  UnusedBoxNotification,
  UnidentifiedSpeciesNotification,
  LowBatteryNotification,
  DisconnectedBoxNotification,
  AllNotifications
} from './types'

export function getEvents(): EventRow[] {
  const rows = db
    .prepare(`
      SELECT
        e.event_id,
        e.timestamp,
        s.names as common_name,
        b.name AS box_name,
        e.image_url
      FROM event e
      JOIN species s ON e.species_id = s.species_id
      JOIN bird_box b ON e.box_id = b.box_id
      ORDER BY e.timestamp DESC
    `)
    .all()

  // Type assertion
  return rows as EventRow[]
}

export function getCorruptedDataNotifications(): CorruptedDataNotification[] {
  const rows = db
    .prepare(`
      SELECT
        e.event_id,
        b.name AS box_name,
        e.timestamp,
        s.names AS species_name
      FROM event e
      JOIN bird_box b ON e.box_id = b.box_id
      JOIN species s ON e.species_id = s.species_id
      WHERE e.image_url IS NULL OR e.image_url = ''
      ORDER BY e.timestamp DESC
    `)
    .all()

  return rows as CorruptedDataNotification[]
}

export function getUnusedBoxNotifications(): UnusedBoxNotification[] {
  const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60)

  const rows = db
    .prepare(`
      SELECT
        b.box_id,
        b.name AS box_name,
        MAX(e.timestamp) AS last_event_date,
        CAST((strftime('%s','now') - COALESCE(MAX(e.timestamp), 0)) / 86400 AS INTEGER) AS days_inactive
      FROM bird_box b
      LEFT JOIN event e ON b.box_id = e.box_id
      GROUP BY b.box_id, b.name
      HAVING MAX(e.timestamp) IS NULL OR MAX(e.timestamp) < ?
      ORDER BY days_inactive DESC
    `)
    .all(thirtyDaysAgo)

  return rows as UnusedBoxNotification[]
}

export function getUnidentifiedSpeciesNotifications(): UnidentifiedSpeciesNotification[] {
  const rows = db
    .prepare(`
      SELECT
        e.event_id,
        b.name AS box_name,
        e.timestamp,
        e.image_url
      FROM event e
      JOIN bird_box b ON e.box_id = b.box_id
      JOIN species s ON e.species_id = s.species_id
      WHERE s.names = 'Other'
      ORDER BY e.timestamp DESC
    `)
    .all()

  return rows as UnidentifiedSpeciesNotification[]
}

export function getLowBatteryNotifications(): LowBatteryNotification[] {
  const rows = db
    .prepare(`
      SELECT
        d.device_id,
        b.name AS box_name,
        pl.battery_voltage,
        pl.timestamp,
        d.serial_number
      FROM device d
      JOIN bird_box b ON d.box_id = b.box_id
      JOIN power_log pl ON d.device_id = pl.device_id
      WHERE pl.timestamp = (
        SELECT MAX(timestamp)
        FROM power_log
        WHERE device_id = d.device_id
      )
      AND pl.battery_voltage < 3.5
      ORDER BY pl.battery_voltage ASC
    `)
    .all()

  return rows as LowBatteryNotification[]
}

export function getDisconnectedBoxNotifications(): DisconnectedBoxNotification[] {
  const fortyEightHoursAgo = Math.floor(Date.now() / 1000) - (48 * 60 * 60)

  const rows = db
    .prepare(`
      SELECT
        d.device_id,
        b.name AS box_name,
        d.last_seen_at,
        CAST((strftime('%s','now') - d.last_seen_at) / 3600 AS INTEGER) AS hours_disconnected,
        d.serial_number
      FROM device d
      JOIN bird_box b ON d.box_id = b.box_id
      WHERE d.last_seen_at < ?
      ORDER BY d.last_seen_at ASC
    `)
    .all(fortyEightHoursAgo)

  return rows as DisconnectedBoxNotification[]
}

export function getAllNotifications(): AllNotifications {
  return {
    corruptedData: getCorruptedDataNotifications(),
    unusedBox: getUnusedBoxNotifications(),
    unidentifiedSpecies: getUnidentifiedSpeciesNotifications(),
    lowBattery: getLowBatteryNotifications(),
    disconnectedBox: getDisconnectedBoxNotifications()
  }
}
