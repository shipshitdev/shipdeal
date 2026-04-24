# Shipdeal

AI contract maker for consulting and freelance deals. Enter the client,
contract type, value, brand details, and boilerplate once; Shipdeal turns that
into a local draft workflow for review, PDF generation, and sending.

## Install

**CLI via npm:**

```bash
npx shipdeal new --client "Northstar Ventures" --type "AI automation retainer"

# Optional global install
npm install -g shipdeal
shipdeal new --client "Northstar Ventures"
```

**CLI via Homebrew:**

```bash
brew tap shipshitdev/tap
brew install shipdeal
```

## Local Development

```bash
bun install
bun run dev:web
bun run dev:cli
```

## Workspace

```txt
apps/
  web/       Marketing site + local workspace routes
  desktop/   Electron + Vite local contract studio
  cli/       CLI package published as `shipdeal`
packages/
  contracts/ Shared contract draft generator
  product/   Shared contract workspace UI and sample data
```

## Scripts

- `bun run dev:web` - starts the Next.js web surface at http://localhost:3000
- `bun run dev:desktop` - starts the Electron desktop app
- `bun run dev:cli` - watches and rebuilds the CLI package
- `bun run build` - builds all packages/apps through Turbo
- `bun run typecheck` - typechecks all packages/apps through Turbo

## Update Dependencies

```bash
bun run deps:update
```

## Agent Workspace

- `.agents/skills` - source of truth for selected dev workflow skills
- `.agents/memory` - source of truth for project memory
- `.claude/skills` and `.claude/memory` - relative symlinks into `.agents`
- `.codex/skills` and `.codex/memory` - relative symlinks into `.agents`
- `skills` - selected repo workflow skills for PRDs, planning, execution, review, and verification

## Scope

Shipdeal is for AI agency consulting contracts: client details in, reusable
terms and boilerplate applied, branded contract draft out. The Electron desktop
app can already generate, preview, copy, and save Markdown drafts. PDF generation
and send-for-signature are the next product steps.
