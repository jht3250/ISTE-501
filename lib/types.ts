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
