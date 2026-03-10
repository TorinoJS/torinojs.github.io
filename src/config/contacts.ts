/**
 * Contact channels loaded from /config/contacts.jsonc.
 *
 * This module reads the JSONC file at build time (via Vite raw import),
 * strips comments, and exports typed contact data that drives the
 * Connect tab, Header socials, and Footer links.
 */

import contactsRaw from '../../config/contacts.jsonc?raw'

export interface Contact {
  id: string
  type: 'github' | 'telegram' | 'meetup' | 'microphone' | 'link'
  url: string
  showInHeader: boolean
  showInFooter: boolean
  showInConnect: boolean
}

interface ContactsFile {
  contacts: Contact[]
}

/**
 * Strip single-line (//) and multi-line comments from JSONC.
 */
function stripJsonComments(jsonc: string): string {
  let result = ''
  let i = 0
  let inString = false
  let escaped = false

  while (i < jsonc.length) {
    const ch = jsonc[i]
    const next = jsonc[i + 1]

    if (inString) {
      result += ch
      if (escaped) {
        escaped = false
      } else if (ch === '\\') {
        escaped = true
      } else if (ch === '"') {
        inString = false
      }
      i++
      continue
    }

    if (ch === '"') {
      inString = true
      result += ch
      i++
      continue
    }

    // Single-line comment
    if (ch === '/' && next === '/') {
      // Skip until end of line
      i += 2
      while (i < jsonc.length && jsonc[i] !== '\n') i++
      continue
    }

    // Multi-line comment
    if (ch === '/' && next === '*') {
      i += 2
      while (i < jsonc.length && !(jsonc[i] === '*' && jsonc[i + 1] === '/')) i++
      i += 2 // skip closing */
      continue
    }

    result += ch
    i++
  }

  return result
}

const parsed: ContactsFile = JSON.parse(stripJsonComments(contactsRaw))

export const contacts: Contact[] = parsed.contacts

/** Get a contact by id */
export function getContact(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id)
}

/** Get contacts visible in the header */
export function getHeaderContacts(): Contact[] {
  return contacts.filter((c) => c.showInHeader)
}

/** Get contacts visible in the footer */
export function getFooterContacts(): Contact[] {
  return contacts.filter((c) => c.showInFooter)
}

/** Get contacts visible in the Connect tab */
export function getConnectContacts(): Contact[] {
  return contacts.filter((c) => c.showInConnect)
}

/** Get the "propose talk" URL (shortcut used in multiple pages) */
export function getProposeTalkUrl(): string {
  return getContact('proposeTalk')?.url ?? 'https://github.com/TorinoJS/discussion/issues'
}
