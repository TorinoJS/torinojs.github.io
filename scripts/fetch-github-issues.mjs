#!/usr/bin/env node

/**
 * Fetch issues from the TorinoJS/discussion GitHub repo
 * and write them to public/github-issues.json.
 *
 * Uses the public GitHub REST API (no auth required for public repos,
 * but a GITHUB_TOKEN can be set to avoid rate limits).
 *
 * Usage:
 *   node scripts/fetch-github-issues.mjs
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '..', 'public', 'github-issues.json')

const REPO_OWNER = 'TorinoJS'
const REPO_NAME = 'discussion'
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`

/**
 * Fetch a URL with optional GitHub token authentication.
 */
async function ghFetch(url) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'TorinoJS-Website-Bot/1.0',
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `token ${token}`
  }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining')
    const resetAt = response.headers.get('x-ratelimit-reset')
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}` +
        (remaining === '0' ? ` (rate limited, resets at ${new Date(resetAt * 1000).toISOString()})` : '')
    )
  }

  return response
}

/**
 * Fetch all pages from a paginated GitHub API endpoint.
 */
async function fetchAllPages(url) {
  const results = []
  let nextUrl = url

  while (nextUrl) {
    const response = await ghFetch(nextUrl)
    const data = await response.json()
    results.push(...data)

    // Parse Link header for pagination
    const linkHeader = response.headers.get('Link')
    nextUrl = null
    if (linkHeader) {
      const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
      if (nextMatch) {
        nextUrl = nextMatch[1]
      }
    }
  }

  return results
}

/**
 * Map a GitHub issue to our simplified structure.
 */
function mapIssue(issue) {
  return {
    id: issue.number,
    title: issue.title,
    body: issue.body || '',
    state: issue.state,
    labels: issue.labels.map((l) => l.name),
    author: {
      login: issue.user.login,
      avatarUrl: issue.user.avatar_url,
      url: issue.user.html_url,
    },
    url: issue.html_url,
    comments: issue.comments,
    reactions: {
      '+1': issue.reactions?.['+1'] ?? 0,
      '-1': issue.reactions?.['-1'] ?? 0,
      heart: issue.reactions?.heart ?? 0,
      hooray: issue.reactions?.hooray ?? 0,
      laugh: issue.reactions?.laugh ?? 0,
      rocket: issue.reactions?.rocket ?? 0,
      eyes: issue.reactions?.eyes ?? 0,
      total: issue.reactions?.total_count ?? 0,
    },
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
  }
}

async function main() {
  console.log(`Fetching issues from ${REPO_OWNER}/${REPO_NAME}...`)

  // Fetch only open issues (closed issues are not displayed on the website)
  const issues = await fetchAllPages(
    `${API_BASE}/issues?state=open&per_page=100&sort=created&direction=desc`
  )

  // Filter out pull requests (GitHub API returns PRs mixed with issues)
  const realIssues = issues.filter((i) => !i.pull_request)

  console.log(`Fetched ${realIssues.length} open issues (excluding PRs).`)

  // Fetch all labels
  const labelsResponse = await ghFetch(`${API_BASE}/labels`)
  const labels = await labelsResponse.json()

  const labelInfo = labels
    .filter((l) => l.name !== 'duplicate') // Exclude 'duplicate' label
    .map((l) => ({
      name: l.name,
      description: l.description || '',
      color: l.color,
    }))

  console.log(`Fetched ${labelInfo.length} labels (excluding 'duplicate').`)

  // Map issues
  const mappedIssues = realIssues.map(mapIssue)

  const output = {
    lastUpdated: new Date().toISOString(),
    repo: `${REPO_OWNER}/${REPO_NAME}`,
    repoUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}`,
    labels: labelInfo,
    issues: mappedIssues,
  }

  const json = JSON.stringify(output, null, 2)

  // Check if content changed (ignore lastUpdated)
  if (existsSync(OUTPUT_PATH)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'))
      if (
        JSON.stringify(existing.issues) === JSON.stringify(output.issues) &&
        JSON.stringify(existing.labels) === JSON.stringify(output.labels)
      ) {
        console.log('No changes detected. File not updated.')
        return
      }
    } catch {
      // File exists but can't be parsed, overwrite it
    }
  }

  writeFileSync(OUTPUT_PATH, json, 'utf-8')
  console.log(`Wrote ${mappedIssues.length} issues to ${OUTPUT_PATH}`)

  // Print summary per label
  for (const label of labelInfo) {
    const count = mappedIssues.filter((i) => i.labels.includes(label.name)).length
    console.log(`  [${label.name}]: ${count} issues`)
  }

  const unlabeled = mappedIssues.filter((i) => i.labels.length === 0).length
  console.log(`  [unlabeled]: ${unlabeled} issues`)
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
