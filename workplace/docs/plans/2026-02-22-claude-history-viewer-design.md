# Claude Code History Viewer — Design

## Overview

Web application to browse, search, and resume Claude Code chat sessions. Built with Next.js 14 (App Router), Tailwind CSS, and server-side API routes for accurate search.

**Location**: `~/workplace/claude-history`

## Architecture

Hybrid approach: API routes handle data reading and search on the server. Client components handle the interactive UI.

### Data Source

- `~/.claude/history.jsonl` — global log of user prompts with display text, timestamp, project, sessionId
- `~/.claude/projects/<project-dir>/<session-id>.jsonl` — full conversation transcripts per session

### API Routes

- `GET /api/sessions` — list all sessions grouped by project, returns metadata (id, project, title, timestamps)
- `GET /api/sessions/[id]` — full conversation for a session, parsed into clean message objects
- `GET /api/search?q=<query>` — exact substring search across all sessions, returns matched snippets with context

### Data Model

```typescript
interface Session {
  id: string;           // UUID
  project: string;      // decoded project path
  projectDir: string;   // raw directory name
  title: string;        // first user message
  startedAt: string;    // ISO timestamp
  lastActiveAt: string; // ISO timestamp
  messageCount: number;
}

interface Message {
  type: 'user' | 'assistant' | 'tool_use' | 'tool_result' | 'system';
  content: string;
  timestamp: string;
  uuid?: string;
}

interface SearchResult {
  sessionId: string;
  project: string;
  title: string;
  messageIndex: number;
  snippet: string;     // ~100 chars context around match
  matchStart: number;  // offset within snippet for highlighting
  matchLength: number;
  timestamp: string;
}
```

## Pages & Components

### Layout

Sidebar (300px) + Main content area. Responsive — sidebar collapses on mobile.

### Sidebar

- Project groups, expandable
- Sessions listed under each project with title (first user message) and relative timestamp
- Active session highlighted
- Session count badge per project

### Global Search Bar

- Fixed at top of main area
- Debounced input (300ms) triggers `/api/search`
- Results in dropdown overlay showing: session title, matched snippet with highlighted term, timestamp
- Click result navigates to session and scrolls to matched message

### Chat Viewer

- Chat bubble layout: user messages right, assistant left
- Tool use/results collapsed by default with expand toggle
- Markdown rendering for assistant messages (code blocks, lists, etc.)
- Timestamps on hover
- System/meta messages filtered out by default

### Resume Button

- Prominent button in session header
- Copies `claude --resume <session-id>` to clipboard
- Toast notification on copy success
- Uses Clipboard API

## Search Implementation

- Server-side exact substring matching (case-insensitive)
- Scans all `*.jsonl` files in `~/.claude/projects/`
- Extracts text content from messages (handles both string and array content blocks)
- Returns snippet with ~100 chars context around match
- Results sorted by: recency (most recent first)
- Filters out system/meta messages from search

## UI Design

- Dark theme: backgrounds `#0d1117`, `#161b22`, `#1c2128`
- Text: `#e6edf3` primary, `#8b949e` secondary
- Accent: amber/orange (`#f59e0b`) for active states, search highlights
- Typography: system font stack for UI, monospace for code
- Subtle transitions for navigation and loading states
- Scrollable chat area with sticky search bar

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- No database — reads JSONL files directly from disk
