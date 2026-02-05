import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'local.db')
const db = new Database(dbPath)
const dbExists = fs.existsSync(dbPath)

// initialize schema once
if (!dbExists) {
  const schemaPath = path.join(process.cwd(), 'db/schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf8')
  db.exec(schema)

  // temporary for dummy data /seed.sql
  const seedPath = path.join(process.cwd(), 'db/seed.sql')
  if (fs.existsSync(seedPath)) {
    const seed = fs.readFileSync(seedPath, 'utf8')
    db.exec(seed)
  }
}


export default db
