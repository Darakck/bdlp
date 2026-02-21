import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import fs from 'fs'

export type Contact = {
  id: string
  name: string
  lastName?: string
  email: string
  phone?: string
  message?: string
  createdAt: string
}

type Schema = {
  contacts: Contact[]
}

const defaultData: Schema = { contacts: [] }

async function getDb() {
  const file = path.resolve(process.cwd(), 'data', 'contacts.json')
  const dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const adapter = new JSONFile<Schema>(file)
  const db = new Low<Schema>(adapter, defaultData)

  await db.read()
  db.data ||= defaultData

  return db
}

export async function saveContact(contact: Contact) {
  try {
    const db = await getDb()
    db.data!.contacts.push(contact)
    await db.write()
    console.log('[DB] Contact saved:', contact.id)
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err)
    console.error('[DB ERROR] Failed to save contact:', error)
    throw err
  }
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const db = await getDb()
    return db.data!.contacts || []
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err)
    console.error('[DB ERROR] Failed to get contacts:', error)
    return []
  }
}
