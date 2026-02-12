export type EventRow = {
  event_id: number
  timestamp: number
  common_name: string
  box_name: string
  image_url?: string | null
}

export type VisitCount = {
  date: string        // '2025-06-01'
  kestrel: number
  bat: number
  other: number
}

export type CorruptedDataNotification = {
  event_id: number
  box_name: string
  timestamp: number
  species_name: string
}

export type UnusedBoxNotification = {
  box_id: number
  box_name: string
  last_event_date: number | null
  days_inactive: number
}

export type UnidentifiedSpeciesNotification = {
  event_id: number
  box_name: string
  timestamp: number
  image_url?: string | null
}

export type LowBatteryNotification = {
  device_id: number
  box_name: string
  battery_voltage: number
  timestamp: number
  serial_number: string
}

export type DisconnectedBoxNotification = {
  device_id: number
  box_name: string
  last_seen_at: number
  hours_disconnected: number
  serial_number: string
}

export type AllNotifications = {
  corruptedData: CorruptedDataNotification[]
  unusedBox: UnusedBoxNotification[]
  unidentifiedSpecies: UnidentifiedSpeciesNotification[]
  lowBattery: LowBatteryNotification[]
  disconnectedBox: DisconnectedBoxNotification[]
}
