import { parse } from 'csv-parse/sync'

export function parseCSV(text: string) {
  return parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })
}

export function toCSV(rows: Record<string, any>[]) {
  if (rows.length === 0) return ''

  const header = Object.keys(rows[0]).join(',')

  const body = rows.map(row =>
    Object.values(row)
      .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
      .join(',')
  )

  return [header, ...body].join('\n')
}
