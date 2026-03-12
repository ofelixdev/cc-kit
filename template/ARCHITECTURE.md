# Project Agent Architecture

> Autonomous knowledge base: specialist agents, skills, and validation scripts that activate automatically.

---

## Overview

This directory is an **autonomous knowledge system** that activates automatically for every task. It consists of:

- **20 Specialist Agents** — Role-based expertise, decision frameworks, anti-patterns
- **36 Skills** — Domain-specific patterns, references, and validation scripts
- **11 Workflows** — Structured procedures for common task types

### How It Works (Automatic)

```
User Request
    ↓
1. DETECT domain(s) from the request
    ↓
2. READ matching agent file(s) from agents/
    ↓
3. LOAD associated skill(s) from skills/{name}/SKILL.md
    ↓
4. APPLY expertise (single agent or multi-agent orchestration)
    ↓
5. VALIDATE with scripts after code changes
```

- **Single domain** → Read agent + skills, apply directly
- **Multi-domain (2+)** → Spawn parallel subagents via Agent tool
- **Complex (3+)** → Use orchestrator for coordination
- **Planning needed** → Enter Claude Code's native Plan mode with project-planner methodology

This is automatic. No explicit invocation needed. See root `CLAUDE.md` for the full routing table.

---

## Directory Structure

```plaintext
.claude/
├── ARCHITECTURE.md          # This file (index)
├── settings.json            # Hooks, permissions, automation config
├── agents/                  # 20 Specialist Agents
├── skills/                  # 108 Skills (cc-kit + community)
├── workflows/               # 11 Slash Commands
├── rules/                   # Global Rules + Path-Conditional Rules
├── hooks/                   # Automation Scripts (format, protect, notify)
└── scripts/                 # Master Validation Scripts
```

---

## Agents (20)

Specialist knowledge files for different domains.

| Agent                    | Focus                      | Skills Used                                              |
| ------------------------ | -------------------------- | -------------------------------------------------------- |
| `orchestrator`           | Multi-agent coordination   | parallel-agents, behavioral-modes                        |
| `project-planner`        | Discovery, task planning   | brainstorming, plan-writing, architecture                |
| `frontend-specialist`    | Web UI/UX                  | frontend-design, react-best-practices, tailwind-patterns |
| `backend-specialist`     | API, business logic        | api-patterns, nodejs-best-practices, database-design     |
| `database-architect`     | Schema, SQL                | database-design, prisma-expert                           |
| `mobile-developer`       | iOS, Android, RN           | mobile-design                                            |
| `game-developer`         | Game logic, mechanics      | game-development                                         |
| `devops-engineer`        | CI/CD, Docker              | deployment-procedures, docker-expert                     |
| `security-auditor`       | Security compliance        | vulnerability-scanner, red-team-tactics                  |
| `penetration-tester`     | Offensive security         | red-team-tactics                                         |
| `test-engineer`          | Testing strategies         | testing-patterns, tdd-workflow, webapp-testing           |
| `debugger`               | Root cause analysis        | systematic-debugging                                     |
| `performance-optimizer`  | Speed, Web Vitals          | performance-profiling                                    |
| `seo-specialist`         | Ranking, visibility        | seo-fundamentals, geo-fundamentals                       |
| `documentation-writer`   | Manuals, docs              | documentation-templates                                  |
| `product-manager`        | Requirements, user stories | plan-writing, brainstorming                              |
| `product-owner`          | Strategy, backlog, MVP     | plan-writing, brainstorming                              |
| `qa-automation-engineer` | E2E testing, CI pipelines  | webapp-testing, testing-patterns                         |
| `code-archaeologist`     | Legacy code, refactoring   | clean-code, code-review-checklist                        |
| `explorer-agent`         | Codebase analysis          | -                                                        |

---

## Skills (98)

Modular knowledge domains loaded automatically based on task context.

### Frontend & UI

| Skill | Description |
|---|---|
| `react-best-practices` | React & Next.js optimization (Vercel - 57 rules) |
| `web-design-guidelines` | Live Vercel Web Interface Guidelines audit |
| `tailwind-patterns` | Tailwind CSS v4 utilities |
| `frontend-design` | UI/UX patterns, design systems, scripts |
| `ui-ux-pro-max` | 50 styles, 21 palettes, 50 fonts |
| `nextjs-react-expert` | Next.js/React performance checker |

### Backend & API

| Skill | Description |
|---|---|
| `api-patterns` | REST, GraphQL, tRPC |
| `nodejs-best-practices` | Node.js async, modules |
| `python-patterns` | Python standards, FastAPI |
| `modern-python` | Modern Python best practices (trailofbits) |

### Database

| Skill | Description |
|---|---|
| `database-design` | Schema design, optimization |

### Cloud & Infrastructure

| Skill | Description |
|---|---|
| `deployment-procedures` | CI/CD, deploy workflows |
| `server-management` | Infrastructure management |
| `devcontainer-setup` | Dev container configuration (trailofbits) |
| `coolify` | Coolify self-hosted PaaS install & management (evolv3-ai) |
| `coolify-cli` | Coolify CLI deploy, logs, env sync (evolv3-ai) |
| `devops` | Remote infrastructure: OCI, Hetzner, Linode, DO, Contabo (evolv3-ai) |

### Testing & Quality

| Skill | Description |
|---|---|
| `testing-patterns` | Jest, Vitest, strategies |
| `webapp-testing` | E2E, Playwright |
| `tdd-workflow` | Test-driven development |
| `code-review-checklist` | Code review standards |
| `lint-and-validate` | Linting, validation |
| `coverage-analysis` | Test coverage analysis (trailofbits) |
| `debug-buttercup` | Debugging assistant (trailofbits) |
| `differential-review` | Differential code review (trailofbits) |
| `fp-check` | False positive detection (trailofbits) |
| `property-based-testing` | Property-based test generation (trailofbits) |
| `spec-to-code-compliance` | Spec compliance verification (trailofbits) |
| `testing-handbook-generator` | Testing handbook creation (trailofbits) |

### Security — Core

| Skill | Description |
|---|---|
| `vulnerability-scanner` | Security auditing, OWASP |
| `red-team-tactics` | Offensive security |
| `agentic-actions-auditor` | AI agent action auditing (trailofbits) |
| `audit-context-building` | Security audit context builder (trailofbits) |
| `audit-prep-assistant` | Audit preparation (trailofbits) |
| `code-maturity-assessor` | Code maturity assessment (trailofbits) |
| `entry-point-analyzer` | Attack surface analysis (trailofbits) |
| `insecure-defaults` | Insecure default detection (trailofbits) |
| `secure-workflow-guide` | Secure workflow patterns (trailofbits) |
| `sharp-edges` | Dangerous API/pattern detection (trailofbits) |
| `supply-chain-risk-auditor` | Supply chain risk analysis (trailofbits) |
| `guidelines-advisor` | Security guidelines (trailofbits) |

### Security — Static Analysis

| Skill | Description |
|---|---|
| `codeql` | CodeQL query creation & analysis (trailofbits) |
| `semgrep` | Semgrep rule execution (trailofbits) |
| `semgrep-rule-creator` | Custom Semgrep rule authoring (trailofbits) |
| `semgrep-rule-variant-creator` | Semgrep rule variants (trailofbits) |
| `variant-analysis` | Vulnerability variant detection (trailofbits) |
| `sarif-parsing` | SARIF report parsing (trailofbits) |
| `yara-rule-authoring` | YARA rule creation (trailofbits) |

### Security — Fuzzing

| Skill | Description |
|---|---|
| `aflpp` | AFL++ fuzzing (trailofbits) |
| `atheris` | Python fuzzing with Atheris (trailofbits) |
| `cargo-fuzz` | Rust cargo-fuzz (trailofbits) |
| `fuzzing-dictionary` | Fuzzing dictionary creation (trailofbits) |
| `fuzzing-obstacles` | Fuzzing obstacle resolution (trailofbits) |
| `harness-writing` | Fuzz harness creation (trailofbits) |
| `libafl` | LibAFL fuzzing framework (trailofbits) |
| `libfuzzer` | LibFuzzer integration (trailofbits) |
| `ossfuzz` | OSS-Fuzz integration (trailofbits) |
| `ruzzy` | Ruby fuzzing (trailofbits) |
| `wycheproof` | Crypto testing with Wycheproof (trailofbits) |

### Security — Crypto & Low-Level

| Skill | Description |
|---|---|
| `address-sanitizer` | Memory error detection (trailofbits) |
| `constant-time-analysis` | Timing side-channel analysis (trailofbits) |
| `constant-time-testing` | Constant-time verification (trailofbits) |
| `dwarf-expert` | DWARF debug info analysis (trailofbits) |
| `zeroize-audit` | Memory zeroization audit (trailofbits) |
| `seatbelt-sandboxer` | Sandbox analysis (trailofbits) |

### Security — Blockchain

| Skill | Description |
|---|---|
| `algorand-vulnerability-scanner` | Algorand smart contract audit (trailofbits) |
| `cairo-vulnerability-scanner` | Cairo/StarkNet audit (trailofbits) |
| `cosmos-vulnerability-scanner` | Cosmos SDK audit (trailofbits) |
| `solana-vulnerability-scanner` | Solana program audit (trailofbits) |
| `substrate-vulnerability-scanner` | Substrate/Polkadot audit (trailofbits) |
| `ton-vulnerability-scanner` | TON smart contract audit (trailofbits) |
| `token-integration-analyzer` | Token integration risks (trailofbits) |

### Architecture & Planning

| Skill | Description |
|---|---|
| `app-builder` | Full-stack app scaffolding (13 templates) |
| `architecture` | System design patterns |
| `plan-writing` | Task planning, breakdown |
| `brainstorming` | Collaborative design exploration (obra/superpowers) |
| `ask-questions-if-underspecified` | Clarification protocol (trailofbits) |
| `second-opinion` | Alternative perspective analysis (trailofbits) |
| `designing-workflow-skills` | Skill/workflow design (trailofbits) |

### Mobile

| Skill | Description |
|---|---|
| `mobile-design` | Mobile UI/UX patterns |

### Game Development

| Skill | Description |
|---|---|
| `game-development` | Game logic, mechanics |

### SEO & Growth

| Skill | Description |
|---|---|
| `seo-fundamentals` | SEO, E-E-A-T, Core Web Vitals |
| `geo-fundamentals` | GenAI optimization |

### Shell/CLI

| Skill | Description |
|---|---|
| `bash-linux` | Linux commands, scripting |
| `powershell-windows` | Windows PowerShell |

### Other

| Skill | Description |
|---|---|
| `clean-code` | Coding standards (Global) |
| `behavioral-modes` | Agent personas |
| `parallel-agents` | Multi-agent patterns |
| `mcp-builder` | Model Context Protocol |
| `documentation-templates` | Doc formats |
| `i18n-localization` | Internationalization |
| `performance-profiling` | Web Vitals, optimization |
| `systematic-debugging` | Troubleshooting |
| `find-skills` | Discover and install new skills (vercel-labs) |
| `skill-improver` | Improve existing skills (trailofbits) |
| `git-cleanup` | Git repository cleanup (trailofbits) |
| `devcontainer-setup` | Dev container configuration (trailofbits) |
| `let-fate-decide` | Random decision helper (trailofbits) |
| `burpsuite-project-parser` | Burp Suite parsing (trailofbits) |
| `firebase-apk-scanner` | Firebase APK scanning (trailofbits) |
| `claude-in-chrome-troubleshooting` | Chrome extension debug (trailofbits) |
| `interpreting-culture-index` | Culture index interpretation (trailofbits) |
| `rust-pro` | Rust best practices |
| `intelligent-routing` | Request routing patterns |

---

## Hooks (4)

Automation scripts in `hooks/` triggered by `settings.json`:

| Hook | Event | What It Does |
|---|---|---|
| `auto-format.sh` | PostToolUse (Edit/Write) | Auto-formats code with prettier/eslint after edits |
| `protect-files.sh` | PreToolUse (Edit/Write) | Blocks writes to .env, secrets, credentials |
| `notify-done.sh` | Stop | Desktop notification when Claude finishes |
| `post-compact.sh` | SessionStart (compact) | Re-injects project context after compaction |

## Path-Conditional Rules (5)

Rules in `rules/` that activate only when touching matching files:

| Rule | Triggers For | What It Enforces |
|---|---|---|
| `frontend.md` | `*.tsx`, `*.jsx`, `components/`, `pages/` | Accessibility, performance, component patterns |
| `backend.md` | `api/`, `services/`, `controllers/` | Input validation, error handling, security |
| `testing.md` | `*.test.*`, `__tests__/` | AAA pattern, isolation, behavior-focused tests |
| `security.md` | `auth/`, `middleware/`, `session*` | No hardcoded secrets, hashing, CSRF, rate limiting |
| `database.md` | `prisma/`, `migrations/`, `models/` | Migrations, indexes, transactions, soft deletes |

---

## Workflows (11)

Slash command procedures. Invoke with `/command`.

| Command          | Description              |
| ---------------- | ------------------------ |
| `/brainstorm`    | Socratic discovery       |
| `/create`        | Create new features      |
| `/debug`         | Debug issues             |
| `/deploy`        | Deploy application       |
| `/enhance`       | Improve existing code    |
| `/orchestrate`   | Multi-agent coordination |
| `/plan`          | Task breakdown           |
| `/preview`       | Preview changes          |
| `/status`        | Check project status     |
| `/test`          | Run tests                |
| `/ui-ux-pro-max` | Design with 50 styles    |

---

## Skill Loading Protocol (Automatic)

```plaintext
User Request → Domain Detection → Read Agent → Load SKILL.md
                                                    ↓
                                            Follow content map
                                                    ↓
                                            Read references/ + Run scripts/
```

### Skill Structure

```plaintext
skill-name/
├── SKILL.md           # (Required) Metadata & instructions
├── scripts/           # (Optional) Python/Bash scripts
├── references/        # (Optional) Templates, docs
└── assets/            # (Optional) Images, logos
```

### Enhanced Skills (with scripts/references)

| Skill               | Files | Coverage                            |
| ------------------- | ----- | ----------------------------------- |
| `ui-ux-pro-max`     | 27    | 50 styles, 21 palettes, 50 fonts    |
| `app-builder`       | 20    | Full-stack scaffolding              |

---

## Scripts (2)

Master validation scripts that orchestrate skill-level scripts.

### Master Scripts

| Script          | Purpose                                 | When to Use              |
| --------------- | --------------------------------------- | ------------------------ |
| `checklist.py`  | Priority-based validation (Core checks) | Development, pre-commit  |
| `verify_all.py` | Comprehensive verification (All checks) | Pre-deployment, releases |

### Usage

```bash
# Quick validation during development
python .claude/scripts/checklist.py .

# Full verification before deployment
python .claude/scripts/verify_all.py . --url http://localhost:3000
```

### What They Check

**checklist.py** (Core checks):

- Security (vulnerabilities, secrets)
- Code Quality (lint, types)
- Schema Validation
- Test Suite
- UX Audit
- SEO Check

**verify_all.py** (Full suite):

- Everything in checklist.py PLUS:
- Lighthouse (Core Web Vitals)
- Playwright E2E
- Bundle Analysis
- Mobile Audit
- i18n Check

For details, see [scripts/README.md](scripts/README.md)

---

## Statistics

| Metric | Value |
|---|---|
| **Total Agents** | 20 |
| **Total Skills** | 108 |
| **Total Workflows** | 11 |
| **Total Hooks** | 4 (auto-format, protect, notify, post-compact) |
| **Total Rules** | 6 (1 global + 5 path-conditional) |
| **Total Scripts** | 2 (master) + 18 (skill-level) |
| **Coverage** | Web, mobile, backend, security, blockchain, fuzzing, DevOps, performance |

### Skill Sources

| Source | Skills | Focus |
|---|---|---|
| **cc-kit** | 36 | Full-stack development |
| **trailofbits/skills** | 60 | Security, fuzzing, auditing |
| **vercel-labs** | 2 | Web design, skill discovery |
| **obra/superpowers** | 1 | Collaborative brainstorming |
| **evolv3-ai/vibe-skills** | 3 | Coolify, DevOps, cloud infra |

---

## Quick Reference

| Need | Agent | Skills |
|---|---|---|
| Web App | `frontend-specialist` | react-best-practices, frontend-design |
| API | `backend-specialist` | api-patterns, nodejs-best-practices |
| Mobile | `mobile-developer` | mobile-design |
| Database | `database-architect` | database-design |
| Security | `security-auditor` | vulnerability-scanner, codeql, semgrep |
| Fuzzing | `penetration-tester` | aflpp, libfuzzer, harness-writing |
| Testing | `test-engineer` | testing-patterns, coverage-analysis |
| Debug | `debugger` | systematic-debugging, debug-buttercup |
| Plan | `project-planner` | brainstorming, plan-writing |
