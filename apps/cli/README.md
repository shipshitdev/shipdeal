# shipdeal

Headless CLI for Shipdeal, an AI contract maker for consultants and agencies.

## Install

```bash
npx shipdeal new --client "Northstar Ventures" --type "AI automation retainer" --value "EUR 8,500/mo"

# Or install globally
npm install -g shipdeal
shipdeal new --client "Northstar Ventures"
```

## Homebrew

```bash
brew tap shipshitdev/tap
brew install shipdeal
```

## Commands

| Command | Description |
| --- | --- |
| `shipdeal new` | Generate a local Markdown contract draft |
| `shipdeal init` | Create the local Shipdeal workspace folders |

Pass `--help` to any command for flags.

Useful flags:

- `--scope`
- `--jurisdiction`
- `--payment-terms`
- `--start-date`
- `--print`
