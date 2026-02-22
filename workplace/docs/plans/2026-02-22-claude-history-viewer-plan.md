# Claude Code History Viewer — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a web application to browse, search, and resume Claude Code chat sessions stored in `~/.claude/`.

**Architecture:** Next.js 14 App Router with server-side API routes that read JSONL files from `~/.claude/projects/`. Client components handle interactive UI with dark theme. Search is server-side exact substring matching for accuracy.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, react-markdown, next/font

---

### Task 1: Project Scaffolding

**Files:**
- Create: `~/workplace/claude-history/` (entire project via create-next-app)

**Step 1: Create Next.js project**

Run:
```bash
cd ~/workplace && npx create-next-app@latest claude-history --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

**Step 2: Install dependencies**

Run:
```bash
cd ~/workplace/claude-history && npm install react-markdown remark-gfm rehype-highlight
```

**Step 3: Verify project starts**

Run:
```bash
cd ~/workplace/claude-history && npm run dev &
sleep 5 && curl -s http://localhost:3000 | head -5
kill %1
```
Expected: HTML output from Next.js

**Step 4: Commit**

```bash
cd ~/workplace/claude-history && git init && git add -A && git commit -m "feat: scaffold Next.js project with Tailwind and dependencies"
```

---

### Task 2: Tailwind Dark Theme Configuration

**Files:**
- Modify: `~/workplace/claude-history/tailwind.config.ts`
- Modify: `~/workplace/claude-history/src/app/globals.css`

**Step 1: Configure Tailwind with custom dark theme colors**

In `tailwind.config.ts`, extend the theme:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#0d1117',
          1: '#161b22',
          2: '#1c2128',
          3: '#21262d',
          4: '#30363d',
        },
        text: {
          primary: '#e6edf3',
          secondary: '#8b949e',
          tertiary: '#6e7681',
        },
        accent: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          muted: 'rgba(245, 158, 11, 0.15)',
        },
        user: {
          bubble: '#1a3a5c',
          border: '#1f4d7a',
        },
        assistant: {
          bubble: '#1c2128',
          border: '#30363d',
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Set up global styles**

Replace `globals.css` with:
```css
@import "tailwindcss";

@theme {
  --color-surface-0: #0d1117;
  --color-surface-1: #161b22;
  --color-surface-2: #1c2128;
  --color-surface-3: #21262d;
  --color-surface-4: #30363d;
  --color-text-primary: #e6edf3;
  --color-text-secondary: #8b949e;
  --color-text-tertiary: #6e7681;
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-accent-muted: rgba(245, 158, 11, 0.15);
  --color-user-bubble: #1a3a5c;
  --color-user-border: #1f4d7a;
  --color-assistant-bubble: #1c2128;
  --color-assistant-border: #30363d;
}

body {
  background-color: var(--color-surface-0);
  color: var(--color-text-primary);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-surface-1);
}
::-webkit-scrollbar-thumb {
  background: var(--color-surface-4);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}

/* Code block styling for markdown */
pre {
  background-color: var(--color-surface-1) !important;
  border: 1px solid var(--color-surface-4);
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
}
code {
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 0.875rem;
}
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: configure dark theme with custom color palette"
```

---

### Task 3: JSONL Parser Library

**Files:**
- Create: `~/workplace/claude-history/src/lib/types.ts`
- Create: `~/workplace/claude-history/src/lib/parser.ts`

**Step 1: Create shared type definitions**

`src/lib/types.ts`:
```typescript
export interface Session {
  id: string;
  project: string;
  projectDir: string;
  title: string;
  startedAt: string;
  lastActiveAt: string;
  messageCount: number;
}

export interface Message {
  type: 'user' | 'assistant' | 'tool_use' | 'tool_result' | 'system';
  content: string;
  timestamp: string;
  uuid?: string;
}

export interface SearchResult {
  sessionId: string;
  project: string;
  title: string;
  messageIndex: number;
  snippet: string;
  matchStart: number;
  matchLength: number;
  timestamp: string;
}

export interface ProjectGroup {
  name: string;
  dir: string;
  sessions: Session[];
}
```

**Step 2: Create JSONL parser**

`src/lib/parser.ts`:
```typescript
import fs from 'fs';
import path from 'path';
import { Session, Message, SearchResult, ProjectGroup } from './types';

const CLAUDE_DIR = path.join(process.env.HOME || '~', '.claude');
const PROJECTS_DIR = path.join(CLAUDE_DIR, 'projects');

function decodeProjectDir(dir: string): string {
  return dir.replace(/^-/, '/').replace(/-/g, '/');
}

function extractTextContent(content: unknown): string {
  if (typeof content === 'string') {
    // Strip XML-like tags for cleaner display
    return content.replace(/<[^>]+>/g, '').trim();
  }
  if (Array.isArray(content)) {
    return content
      .filter((block: Record<string, unknown>) => block.type === 'text')
      .map((block: Record<string, unknown>) => block.text as string)
      .join('\n')
      .trim();
  }
  return '';
}

function classifyMessage(raw: Record<string, unknown>): Message | null {
  const type = raw.type as string;
  const message = raw.message as Record<string, unknown> | undefined;
  if (!message) return null;

  const role = message.role as string;
  const content = message.content;
  const timestamp = (raw.timestamp as string) || '';

  // Skip meta/system messages
  if (raw.isMeta) return null;

  // Handle tool_use and tool_result from content arrays
  if (Array.isArray(content)) {
    const hasToolUse = content.some((b: Record<string, unknown>) => b.type === 'tool_use');
    const hasToolResult = content.some((b: Record<string, unknown>) => b.type === 'tool_result');
    if (hasToolResult) {
      return { type: 'tool_result', content: extractTextContent(content), timestamp, uuid: raw.uuid as string };
    }
    if (hasToolUse && !content.some((b: Record<string, unknown>) => b.type === 'text')) {
      return { type: 'tool_use', content: extractTextContent(content), timestamp, uuid: raw.uuid as string };
    }
  }

  if (role === 'user' && type === 'user') {
    const text = extractTextContent(content);
    if (!text) return null;
    return { type: 'user', content: text, timestamp, uuid: raw.uuid as string };
  }

  if (role === 'assistant' && type === 'assistant') {
    const text = extractTextContent(content);
    if (!text) return null;
    return { type: 'assistant', content: text, timestamp, uuid: raw.uuid as string };
  }

  return null;
}

export function getProjectDirs(): string[] {
  try {
    return fs.readdirSync(PROJECTS_DIR).filter(d => {
      const fullPath = path.join(PROJECTS_DIR, d);
      return fs.statSync(fullPath).isDirectory() && !d.startsWith('.');
    });
  } catch {
    return [];
  }
}

export function getSessionFiles(projectDir: string): string[] {
  const fullPath = path.join(PROJECTS_DIR, projectDir);
  try {
    return fs.readdirSync(fullPath)
      .filter(f => f.endsWith('.jsonl') && !f.startsWith('.'))
      .map(f => f.replace('.jsonl', ''));
  } catch {
    return [];
  }
}

export function parseSessionMessages(projectDir: string, sessionId: string): Message[] {
  const filePath = path.join(PROJECTS_DIR, projectDir, `${sessionId}.jsonl`);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(l => l.trim());
    const messages: Message[] = [];

    for (const line of lines) {
      try {
        const raw = JSON.parse(line);
        const msg = classifyMessage(raw);
        if (msg) messages.push(msg);
      } catch {
        continue;
      }
    }

    return messages;
  } catch {
    return [];
  }
}

export function getSessionMetadata(projectDir: string, sessionId: string): Session | null {
  const messages = parseSessionMessages(projectDir, sessionId);
  if (messages.length === 0) return null;

  const userMessages = messages.filter(m => m.type === 'user');
  const title = userMessages.length > 0
    ? userMessages[0].content.slice(0, 100)
    : 'Empty session';

  const timestamps = messages
    .map(m => m.timestamp)
    .filter(Boolean)
    .sort();

  return {
    id: sessionId,
    project: decodeProjectDir(projectDir),
    projectDir,
    title,
    startedAt: timestamps[0] || '',
    lastActiveAt: timestamps[timestamps.length - 1] || '',
    messageCount: messages.length,
  };
}

export function getAllProjects(): ProjectGroup[] {
  const dirs = getProjectDirs();
  return dirs.map(dir => {
    const sessionIds = getSessionFiles(dir);
    const sessions = sessionIds
      .map(id => getSessionMetadata(dir, id))
      .filter((s): s is Session => s !== null)
      .sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

    return {
      name: decodeProjectDir(dir),
      dir,
      sessions,
    };
  }).filter(p => p.sessions.length > 0)
    .sort((a, b) => {
      const aLatest = a.sessions[0]?.lastActiveAt || '';
      const bLatest = b.sessions[0]?.lastActiveAt || '';
      return new Date(bLatest).getTime() - new Date(aLatest).getTime();
    });
}

export function searchAllSessions(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();
  const dirs = getProjectDirs();

  for (const dir of dirs) {
    const sessionIds = getSessionFiles(dir);

    for (const sessionId of sessionIds) {
      const messages = parseSessionMessages(dir, sessionId);
      const userMessages = messages.filter(m => m.type === 'user');
      const title = userMessages.length > 0 ? userMessages[0].content.slice(0, 100) : 'Empty session';

      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        if (msg.type === 'tool_use' || msg.type === 'tool_result') continue;

        const lowerContent = msg.content.toLowerCase();
        const matchIndex = lowerContent.indexOf(lowerQuery);

        if (matchIndex !== -1) {
          // Build snippet with context
          const snippetStart = Math.max(0, matchIndex - 50);
          const snippetEnd = Math.min(msg.content.length, matchIndex + query.length + 50);
          let snippet = msg.content.slice(snippetStart, snippetEnd);
          if (snippetStart > 0) snippet = '...' + snippet;
          if (snippetEnd < msg.content.length) snippet = snippet + '...';

          const matchStart = matchIndex - snippetStart + (snippetStart > 0 ? 3 : 0);

          results.push({
            sessionId,
            project: decodeProjectDir(dir),
            title,
            messageIndex: i,
            snippet,
            matchStart,
            matchLength: query.length,
            timestamp: msg.timestamp,
          });
        }
      }
    }
  }

  // Sort by recency
  results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return results;
}
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add JSONL parser library with types and search"
```

---

### Task 4: API Routes

**Files:**
- Create: `~/workplace/claude-history/src/app/api/sessions/route.ts`
- Create: `~/workplace/claude-history/src/app/api/sessions/[id]/route.ts`
- Create: `~/workplace/claude-history/src/app/api/search/route.ts`

**Step 1: Create sessions list API**

`src/app/api/sessions/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/parser';

export async function GET() {
  const projects = getAllProjects();
  return NextResponse.json({ projects });
}
```

**Step 2: Create single session API**

`src/app/api/sessions/[id]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { parseSessionMessages, getProjectDirs, getSessionFiles, getSessionMetadata } from '@/lib/parser';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Find which project this session belongs to
  const dirs = getProjectDirs();
  for (const dir of dirs) {
    const sessionIds = getSessionFiles(dir);
    if (sessionIds.includes(id)) {
      const metadata = getSessionMetadata(dir, id);
      const messages = parseSessionMessages(dir, id);
      return NextResponse.json({ session: metadata, messages });
    }
  }

  return NextResponse.json({ error: 'Session not found' }, { status: 404 });
}
```

**Step 3: Create search API**

`src/app/api/search/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { searchAllSessions } from '@/lib/parser';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }
  const results = searchAllSessions(query);
  return NextResponse.json({ results });
}
```

**Step 4: Verify APIs work**

Run:
```bash
cd ~/workplace/claude-history && npm run dev &
sleep 5
curl -s http://localhost:3000/api/sessions | python3 -m json.tool | head -20
curl -s "http://localhost:3000/api/search?q=streamlab" | python3 -m json.tool | head -20
kill %1
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add API routes for sessions, session detail, and search"
```

---

### Task 5: Root Layout and Sidebar Component

**Files:**
- Modify: `~/workplace/claude-history/src/app/layout.tsx`
- Create: `~/workplace/claude-history/src/components/Sidebar.tsx`
- Create: `~/workplace/claude-history/src/components/TimeAgo.tsx`

**Step 1: Create TimeAgo utility component**

`src/components/TimeAgo.tsx`:
```tsx
'use client';

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export default function TimeAgo({ date }: { date: string }) {
  if (!date) return null;
  return <span title={new Date(date).toLocaleString()}>{timeAgo(date)}</span>;
}
```

**Step 2: Create Sidebar component**

`src/components/Sidebar.tsx`:
```tsx
'use client';

import { useState, useEffect } from 'react';
import TimeAgo from './TimeAgo';
import type { ProjectGroup } from '@/lib/types';

interface SidebarProps {
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
}

export default function Sidebar({ activeSessionId, onSelectSession }: SidebarProps) {
  const [projects, setProjects] = useState<ProjectGroup[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sessions')
      .then(r => r.json())
      .then(data => {
        setProjects(data.projects);
        // Expand all projects by default
        setExpandedProjects(new Set(data.projects.map((p: ProjectGroup) => p.dir)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleProject = (dir: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(dir)) next.delete(dir);
      else next.add(dir);
      return next;
    });
  };

  const projectDisplayName = (name: string) => {
    const parts = name.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2] || name;
  };

  if (loading) {
    return (
      <aside className="w-80 bg-surface-1 border-r border-surface-4 flex flex-col h-screen">
        <div className="p-4 border-b border-surface-4">
          <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <span className="text-accent">CC</span> History
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-text-tertiary">Loading sessions...</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-surface-1 border-r border-surface-4 flex flex-col h-screen">
      <div className="p-4 border-b border-surface-4">
        <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <span className="text-accent">CC</span> History
        </h1>
        <p className="text-xs text-text-tertiary mt-1">
          {projects.reduce((acc, p) => acc + p.sessions.length, 0)} sessions across {projects.length} projects
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {projects.map(project => (
          <div key={project.dir}>
            <button
              onClick={() => toggleProject(project.dir)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg
                  className={`w-3 h-3 text-text-tertiary transition-transform ${expandedProjects.has(project.dir) ? 'rotate-90' : ''}`}
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-text-secondary truncate">
                  {projectDisplayName(project.name)}
                </span>
              </div>
              <span className="text-xs bg-surface-3 text-text-tertiary px-1.5 py-0.5 rounded-full">
                {project.sessions.length}
              </span>
            </button>

            {expandedProjects.has(project.dir) && (
              <div className="ml-4">
                {project.sessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => onSelectSession(session.id)}
                    className={`w-full text-left px-4 py-2.5 border-l-2 transition-colors ${
                      activeSessionId === session.id
                        ? 'border-accent bg-accent-muted text-text-primary'
                        : 'border-transparent hover:bg-surface-2 hover:border-surface-4 text-text-secondary'
                    }`}
                  >
                    <div className="text-sm truncate">{session.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-text-tertiary">
                        <TimeAgo date={session.lastActiveAt} />
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {session.messageCount} msgs
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
```

**Step 3: Update root layout**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Code History",
  description: "Browse, search, and resume Claude Code chat sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface-0 text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add root layout, sidebar component, and TimeAgo utility"
```

---

### Task 6: Chat Viewer Component

**Files:**
- Create: `~/workplace/claude-history/src/components/ChatViewer.tsx`
- Create: `~/workplace/claude-history/src/components/MessageBubble.tsx`
- Create: `~/workplace/claude-history/src/components/MarkdownContent.tsx`

**Step 1: Create Markdown renderer**

`src/components/MarkdownContent.tsx`:
```tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => (
          <pre className="bg-surface-0 border border-surface-4 rounded-md p-3 overflow-x-auto my-2 text-sm">
            {children}
          </pre>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-surface-3 text-accent px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          }
          return (
            <code className={`${className} text-sm`} {...props}>
              {children}
            </code>
          );
        },
        a: ({ children, href }) => (
          <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="list-disc ml-4 my-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-4 my-1">{children}</ol>,
        li: ({ children }) => <li className="my-0.5">{children}</li>,
        p: ({ children }) => <p className="my-1.5">{children}</p>,
        h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-1">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-accent pl-3 my-2 text-text-secondary italic">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="border-collapse border border-surface-4 text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-surface-4 px-3 py-1.5 bg-surface-2 text-left font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border border-surface-4 px-3 py-1.5">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

**Step 2: Create MessageBubble component**

`src/components/MessageBubble.tsx`:
```tsx
'use client';

import { useState } from 'react';
import MarkdownContent from './MarkdownContent';
import type { Message } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
  index: number;
  highlightIndex?: number;
}

export default function MessageBubble({ message, index, highlightIndex }: MessageBubbleProps) {
  const [expanded, setExpanded] = useState(false);

  const isHighlighted = highlightIndex === index;

  if (message.type === 'tool_use' || message.type === 'tool_result') {
    return (
      <div className="flex justify-start my-1 px-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-text-tertiary hover:text-text-secondary flex items-center gap-1 transition-colors"
        >
          <svg
            className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {message.type === 'tool_use' ? 'Tool call' : 'Tool result'}
        </button>
        {expanded && (
          <div className="ml-4 mt-1 p-2 bg-surface-0 border border-surface-4 rounded text-xs text-text-secondary font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
            {message.content || '(empty)'}
          </div>
        )}
      </div>
    );
  }

  const isUser = message.type === 'user';

  return (
    <div
      id={`msg-${index}`}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-3 px-4 ${
        isHighlighted ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface-0 rounded-lg' : ''
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-user-bubble border border-user-border text-text-primary'
            : 'bg-assistant-bubble border border-assistant-border text-text-primary'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium ${isUser ? 'text-accent' : 'text-text-tertiary'}`}>
            {isUser ? 'You' : 'Claude'}
          </span>
          {message.timestamp && (
            <span className="text-xs text-text-tertiary">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        {isUser ? (
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="text-sm prose-invert">
            <MarkdownContent content={message.content} />
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 3: Create ChatViewer component**

`src/components/ChatViewer.tsx`:
```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import type { Message, Session } from '@/lib/types';

interface ChatViewerProps {
  sessionId: string;
  highlightIndex?: number;
}

export default function ChatViewer({ sessionId, highlightIndex }: ChatViewerProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/sessions/${sessionId}`)
      .then(r => r.json())
      .then(data => {
        setSession(data.session);
        setMessages(data.messages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  useEffect(() => {
    if (!loading && highlightIndex !== undefined) {
      const el = document.getElementById(`msg-${highlightIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [loading, highlightIndex]);

  const handleResume = async () => {
    const command = `claude --resume ${sessionId}`;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = command;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-0">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-text-tertiary text-sm">Loading conversation...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-0">
        <div className="text-text-tertiary">Session not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-surface-0 h-screen">
      {/* Session header */}
      <div className="flex items-center justify-between px-6 py-3 bg-surface-1 border-b border-surface-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-text-primary truncate">{session.title}</h2>
          <p className="text-xs text-text-tertiary mt-0.5">
            {session.project} &middot; {session.messageCount} messages &middot; {new Date(session.startedAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={handleResume}
          className={`ml-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-green-600/20 text-green-400 border border-green-500/30'
              : 'bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Resume Session
            </>
          )}
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} index={i} highlightIndex={highlightIndex} />
        ))}
      </div>
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add chat viewer with markdown rendering and resume button"
```

---

### Task 7: Global Search Component

**Files:**
- Create: `~/workplace/claude-history/src/components/SearchBar.tsx`

**Step 1: Create SearchBar component**

`src/components/SearchBar.tsx`:
```tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SearchResult } from '@/lib/types';

interface SearchBarProps {
  onSelectResult: (sessionId: string, messageIndex: number) => void;
}

export default function SearchBar({ onSelectResult }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results.slice(0, 20));
      setIsOpen(true);
      setSelectedIndex(0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      const r = results[selectedIndex];
      onSelectResult(r.sessionId, r.messageIndex);
      setIsOpen(false);
      setQuery('');
    }
  };

  const highlightSnippet = (result: SearchResult) => {
    const { snippet, matchStart, matchLength } = result;
    const before = snippet.slice(0, matchStart);
    const match = snippet.slice(matchStart, matchStart + matchLength);
    const after = snippet.slice(matchStart + matchLength);
    return (
      <span className="text-xs text-text-secondary">
        {before}
        <span className="bg-accent/30 text-accent font-medium">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search all conversations... (Cmd+K)"
          className="w-full bg-surface-2 border border-surface-4 rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 left-0 right-0 bg-surface-1 border border-surface-4 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50"
        >
          <div className="p-2 text-xs text-text-tertiary border-b border-surface-4">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </div>
          {results.map((result, i) => (
            <button
              key={`${result.sessionId}-${result.messageIndex}-${i}`}
              onClick={() => {
                onSelectResult(result.sessionId, result.messageIndex);
                setIsOpen(false);
                setQuery('');
              }}
              className={`w-full text-left px-3 py-2.5 transition-colors border-b border-surface-3/50 last:border-0 ${
                i === selectedIndex ? 'bg-accent-muted' : 'hover:bg-surface-2'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary truncate">{result.title}</span>
                <span className="text-xs text-text-tertiary ml-2 whitespace-nowrap">
                  {new Date(result.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="truncate">{highlightSnippet(result)}</div>
              <div className="text-xs text-text-tertiary mt-0.5">{result.project}</div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-surface-1 border border-surface-4 rounded-lg shadow-2xl p-6 text-center z-50">
          <p className="text-text-tertiary text-sm">No results found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add global search with keyboard nav, highlighting, and Cmd+K"
```

---

### Task 8: Main Page — Wire Everything Together

**Files:**
- Modify: `~/workplace/claude-history/src/app/page.tsx`

**Step 1: Create the main page that composes all components**

`src/app/page.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatViewer from '@/components/ChatViewer';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | undefined>(undefined);

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setHighlightIndex(undefined);
  };

  const handleSearchResult = (sessionId: string, messageIndex: number) => {
    setActiveSessionId(sessionId);
    setHighlightIndex(messageIndex);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Search bar - always visible */}
        <div className="px-6 py-3 bg-surface-1 border-b border-surface-4">
          <SearchBar onSelectResult={handleSearchResult} />
        </div>

        {/* Content area */}
        {activeSessionId ? (
          <ChatViewer sessionId={activeSessionId} highlightIndex={highlightIndex} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-surface-0">
            <div className="text-center">
              <div className="text-6xl mb-4 text-accent opacity-20 font-bold">CC</div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Claude Code History</h2>
              <p className="text-text-secondary text-sm max-w-md">
                Select a session from the sidebar or use <kbd className="px-1.5 py-0.5 bg-surface-2 border border-surface-4 rounded text-xs">Cmd+K</kbd> to search across all conversations.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
```

**Step 2: Verify the full app works**

Run:
```bash
cd ~/workplace/claude-history && npm run dev
```

Open http://localhost:3000 in browser. Verify:
- Sidebar shows projects and sessions
- Clicking a session shows the conversation
- Search finds messages across sessions
- Resume button copies command to clipboard

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: wire up main page with sidebar, search, and chat viewer"
```

---

### Task 9: Polish and Final Touches

**Files:**
- Possible tweaks to any component based on visual testing

**Step 1: Run the app and visually verify**

Run:
```bash
cd ~/workplace/claude-history && npm run dev
```

Check for:
- Dark theme applied everywhere (no white flashes)
- Sidebar scrolls properly with many sessions
- Chat messages render markdown correctly
- Search results highlight properly
- Resume button toast appears and disappears
- Responsive behavior when window is resized

**Step 2: Fix any visual issues found**

Address any visual or functional issues discovered during testing.

**Step 3: Final commit**

```bash
git add -A && git commit -m "feat: polish UI and fix visual issues"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Project scaffolding (Next.js + Tailwind + deps) |
| 2 | Dark theme configuration |
| 3 | JSONL parser library with types and search |
| 4 | API routes (sessions list, session detail, search) |
| 5 | Root layout and sidebar component |
| 6 | Chat viewer with markdown and resume button |
| 7 | Global search with keyboard nav and highlighting |
| 8 | Main page wiring all components together |
| 9 | Polish and visual verification |
