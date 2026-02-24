# cc-kit

Claude Code knowledge base installer — agents, skills, workflows.

Installs a curated set of **20 specialist agents**, **37+ skills**, **11 workflows**, and **validation scripts** into any project's `.claude/` directory, supercharging Claude Code with domain expertise.

## Install

```bash
npx @ofelixdev/cc-kit init
```

Or install globally:

```bash
npm i -g @ofelixdev/cc-kit
cc-kit init
```

## What it installs

```
.claude/
├── agents/           # 20 specialist agents (backend, frontend, security, etc.)
├── skills/           # 37+ skills (clean-code, api-patterns, testing, etc.)
├── workflows/        # 11 workflows (brainstorm, debug, deploy, etc.)
├── scripts/          # Python validation scripts
├── rules/CLAUDE.md   # Extended coding standards
├── ARCHITECTURE.md   # Full knowledge base index
└── mcp_config.json   # MCP server config (with placeholder API key)

CLAUDE.md             # Root project rules (created in project root)
```

## Commands

### `cc-kit init`

Downloads and installs the knowledge base into `.claude/`.

- **Merge strategy**: If `.claude/` already exists, files are merged — your existing content is preserved
- **Protected paths**: `settings.json`, `settings.local.json`, `plans/`, `memory/`, `projects/` are **never** touched
- Root `CLAUDE.md` is only created if it doesn't exist (use `--force` to overwrite)

```bash
cc-kit init              # Install/merge into current directory
cc-kit init --force      # Overwrite everything including root CLAUDE.md
cc-kit init --path ./my-project  # Install into a specific directory
cc-kit init --dry-run    # Preview what would happen
cc-kit init --quiet      # Suppress output
cc-kit init --branch dev # Download from a specific branch
```

### `cc-kit update`

Re-downloads and overwrites the knowledge base (equivalent to `init --force`).

```bash
cc-kit update
```

### `cc-kit status`

Shows installation info and file counts.

```bash
cc-kit status
```

## What's included

### Agents (20)
Specialist knowledge files that Claude reads on-demand:

`orchestrator` · `project-planner` · `security-auditor` · `backend-specialist` · `frontend-specialist` · `mobile-developer` · `debugger` · `game-developer` · `test-engineer` · `database-architect` · `devops-engineer` · `performance-optimizer` · `seo-specialist` · `penetration-tester` · `documentation-writer` · `qa-automation-engineer` · `code-archaeologist` · `explorer-agent` · `product-manager` · `product-owner`

### Skills (37+)
Domain-specific knowledge and patterns:

`clean-code` · `api-patterns` · `database-design` · `frontend-design` · `mobile-design` · `testing-patterns` · `vulnerability-scanner` · `brainstorming` · `plan-writing` · `architecture` · `tailwind-patterns` · `nextjs-react-expert` · `nodejs-best-practices` · `python-patterns` · `rust-pro` · `bash-linux` · `game-development` · `seo-fundamentals` · `performance-profiling` · `webapp-testing` · `tdd-workflow` · and more...

### Workflows (11)
Structured task execution patterns:

`brainstorm` · `create` · `debug` · `deploy` · `enhance` · `orchestrate` · `plan` · `preview` · `status` · `test` · `ui-ux-pro-max`

## How it works

1. Downloads the template from GitHub via [giget](https://github.com/unjs/giget)
2. Merges agent, skill, workflow, and script files into `.claude/`
3. Creates a generic `CLAUDE.md` in the project root (if absent)
4. Never touches user-specific config (settings, memory, plans)

## License

MIT
