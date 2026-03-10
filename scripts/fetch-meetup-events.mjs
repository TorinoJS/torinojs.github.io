#!/usr/bin/env node

/**
 * Fetch events from the TorinoJS Meetup iCal feed and MERGE them
 * into public/meetup-events.json, preserving all historical events.
 *
 * The iCal feed is public and requires no authentication:
 * https://www.meetup.com/torino-js/events/ical/
 *
 * New events from the feed are appended; existing events are updated
 * (by matching on event ID). Events already in the JSON that are NOT
 * in the feed are kept as-is (historical preservation).
 *
 * Usage:
 *   node scripts/fetch-meetup-events.mjs
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '..', 'public', 'meetup-events.json')

const ICAL_URL = 'https://www.meetup.com/torino-js/events/ical/'

/**
 * Parse an iCal DTSTART/DTEND value into an ISO 8601 string.
 *
 * Handles both forms:
 *   DTSTART;TZID=Europe/Rome:20260311T190000
 *   DTSTART:20260311T190000Z
 */
function parseICalDate(raw, tzid) {
  // raw is the value after the colon, e.g. "20260311T190000" or "20260311T190000Z"
  const isUtc = raw.endsWith('Z')
  const clean = raw.replace('Z', '')

  const year = clean.slice(0, 4)
  const month = clean.slice(4, 6)
  const day = clean.slice(6, 8)
  const hour = clean.slice(9, 11)
  const minute = clean.slice(11, 13)
  const second = clean.slice(13, 15) || '00'

  if (isUtc) {
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`).toISOString()
  }

  // For TZID-aware dates, construct a date string with the timezone.
  // We use Intl to figure out the UTC offset for this specific moment in that timezone.
  const naive = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)

  if (tzid) {
    try {
      // Get the offset by comparing UTC and local representation
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tzid,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      // We need to find the UTC offset for this timezone at this date.
      // Create a UTC date with the same wall-clock values, then find the difference.
      const utcDate = new Date(
        Date.UTC(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hour),
          parseInt(minute),
          parseInt(second)
        )
      )
      // Format that UTC date *in the target timezone* to see what wall-clock time it maps to
      const parts = formatter.formatToParts(utcDate)
      const get = (type) => parts.find((p) => p.type === type)?.value ?? '00'
      const tzYear = parseInt(get('year'))
      const tzMonth = parseInt(get('month'))
      const tzDay = parseInt(get('day'))
      const tzHour = parseInt(get('hour'))
      const tzMinute = parseInt(get('minute'))

      // The difference between the UTC wall-clock and the TZ wall-clock gives us the offset
      const utcMs = Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      )
      const tzMs = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, parseInt(get('second')))
      const offsetMs = tzMs - utcMs
      // The offset is how much to subtract from local time to get UTC
      // So UTC = localTime - offset => localTime = UTC + offset
      // We want: given wall-clock in TZ, what is UTC?
      // UTC = wall-clock - offset_of_tz
      // offset_of_tz = tzMs - utcMs (what TZ shows when it's that UTC time)
      // If TZ shows +1h ahead, offsetMs is positive
      // To go from wall-clock to UTC: subtract the offset
      const resultUtc = new Date(utcMs - offsetMs)
      return resultUtc.toISOString()
    } catch {
      // Fallback: treat as local time
      return naive.toISOString()
    }
  }

  return naive.toISOString()
}

/**
 * Unfold iCal lines (lines starting with space/tab are continuations).
 */
function unfoldIcal(text) {
  return text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '')
}

/**
 * Parse an iCal string into an array of VEVENT objects.
 */
function parseIcal(icalText) {
  const unfolded = unfoldIcal(icalText)
  const lines = unfolded.split(/\r?\n/)

  const events = []
  let currentEvent = null
  let currentTzid = null

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {}
      continue
    }

    if (line === 'END:VEVENT') {
      if (currentEvent) {
        events.push(currentEvent)
      }
      currentEvent = null
      continue
    }

    if (!currentEvent) continue

    // Parse property;params:value or property:value
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue

    const left = line.slice(0, colonIdx)
    const value = line.slice(colonIdx + 1)

    // Extract property name and params
    const semiIdx = left.indexOf(';')
    const propName = semiIdx === -1 ? left : left.slice(0, semiIdx)
    const params = semiIdx === -1 ? '' : left.slice(semiIdx + 1)

    // Extract TZID if present
    const tzidMatch = params.match(/TZID=([^;:]+)/)
    const tzid = tzidMatch ? tzidMatch[1] : null

    switch (propName) {
      case 'UID':
        currentEvent.uid = value
        break
      case 'SUMMARY':
        currentEvent.title = value.replace(/\\,/g, ',').replace(/\\n/g, '\n').replace(/\\\\/g, '\\')
        break
      case 'DESCRIPTION':
        currentEvent.description = value
          .replace(/\\,/g, ',')
          .replace(/\\n/g, '\n')
          .replace(/\\\\/g, '\\')
          .trim()
        // Remove the group name prefix if present (e.g. "Torino JS\n...")
        if (currentEvent.description.startsWith('Torino JS\n')) {
          currentEvent.description = currentEvent.description.slice('Torino JS\n'.length).trim()
        }
        break
      case 'DTSTART':
        currentEvent.start = parseICalDate(value, tzid)
        break
      case 'DTEND':
        currentEvent.end = parseICalDate(value, tzid)
        break
      case 'URL':
        currentEvent.url = value
        break
      case 'LOCATION':
        currentEvent.location = value.replace(/\\,/g, ',').replace(/\\\\/g, '\\')
        break
      case 'STATUS':
        currentEvent.status = value
        break
      case 'GEO':
        currentEvent.geo = value
        break
    }
  }

  return events
}

/**
 * Extract a Meetup event ID from the URL.
 */
function extractEventId(url) {
  if (!url) return null
  const match = url.match(/events\/(\d+)/)
  return match ? match[1] : null
}

async function main() {
  console.log(`Fetching iCal feed from ${ICAL_URL}...`)

  const response = await fetch(ICAL_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch iCal feed: ${response.status} ${response.statusText}`)
  }

  const icalText = await response.text()
  console.log(`Received ${icalText.length} bytes of iCal data.`)

  const events = parseIcal(icalText)
  console.log(`Parsed ${events.length} VEVENT entries.`)

  // Build structured events from the feed
  const feedEvents = events
    .map((evt) => ({
      id: extractEventId(evt.url) || evt.uid || null,
      title: evt.title || 'TorinoJS Event',
      description: evt.description || '',
      url: evt.url || `https://www.meetup.com/torino-js/events/`,
      start: evt.start || null,
      end: evt.end || null,
      location: evt.location || null,
      status: evt.status || 'CONFIRMED',
    }))
    .filter((evt) => evt.start) // Must have a start date

  // Load existing events from disk (historical archive)
  let existingEvents = []
  if (existsSync(OUTPUT_PATH)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'))
      existingEvents = existing.events || []
      console.log(`Loaded ${existingEvents.length} existing events from archive.`)
    } catch {
      console.log('Could not parse existing file, starting fresh.')
    }
  }

  // Merge: feed events update/add, existing events are preserved
  const eventsById = new Map()

  // First, add all existing (historical) events
  for (const evt of existingEvents) {
    if (evt.id) {
      eventsById.set(evt.id, evt)
    }
  }

  // Then, upsert feed events (overwrites existing entries with fresh data)
  let newCount = 0
  let updatedCount = 0
  for (const evt of feedEvents) {
    if (eventsById.has(evt.id)) {
      updatedCount++
    } else {
      newCount++
    }
    eventsById.set(evt.id, evt)
  }

  // Sort all events chronologically (oldest first)
  const merged = Array.from(eventsById.values()).sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )

  const output = {
    lastUpdated: new Date().toISOString(),
    source: ICAL_URL,
    groupUrl: 'https://www.meetup.com/torino-js/',
    events: merged,
  }

  const json = JSON.stringify(output, null, 2)

  // Check if content actually changed (ignore lastUpdated timestamp)
  if (existsSync(OUTPUT_PATH)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'))
      if (JSON.stringify(existing.events) === JSON.stringify(output.events)) {
        console.log('No changes detected. File not updated.')
        return
      }
    } catch {
      // Can't compare, just write
    }
  }

  writeFileSync(OUTPUT_PATH, json, 'utf-8')
  console.log(`Wrote ${merged.length} events to ${OUTPUT_PATH}`)
  console.log(`  New events: ${newCount}`)
  console.log(`  Updated events: ${updatedCount}`)
  console.log(`  Preserved historical: ${merged.length - newCount}`)

  // Print summary
  const now = new Date()
  const upcoming = merged.filter((e) => new Date(e.start) > now)
  const past = merged.filter((e) => new Date(e.start) <= now)
  console.log(`  Upcoming: ${upcoming.length}`)
  console.log(`  Past: ${past.length}`)

  if (upcoming.length > 0) {
    const next = upcoming[0]
    console.log(`  Next event: "${next.title}" on ${next.start}`)
  }
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
