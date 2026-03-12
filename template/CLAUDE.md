# Project Rules

## Stack
<!-- TODO: Describe your tech stack here -->

## Language
- Respond in the user's language
- Code, variables, and comments always in English

## Code Standards
- No over-engineering. Simplest solution that works.
- Self-documenting code. No unnecessary comments.
- Before modifying any file, check dependencies and update together.
- Read `CODEBASE.md` for file dependency map if it exists.

---

## AUTONOMOUS KNOWLEDGE SYSTEM (ALWAYS ACTIVE - NO EXCEPTIONS)

The `.claude/` directory is your specialist knowledge base: 20 agents, 36+ skills, validation scripts. **You MUST use them automatically for every task.** Do not wait for the user to ask. Do not skip this. No exceptions.

### Protocol: For EVERY User Request

1. **Detect** the domain(s) from the request
2. **Read** the matching agent file(s) from `.claude/agents/` for domain expertise
3. **Load** associated skill(s) from `.claude/skills/{name}/SKILL.md` for patterns and best practices
4. **Apply** the knowledge — do not announce what you loaded, just use it

### Task → Agent → Skills (Auto-Routing)

| If the task involves... | Read agent | Load skills |
|---|---|---|
| Frontend, UI, React, Next.js, CSS, components | `agents/frontend-specialist.md` | frontend-design, react-best-practices, tailwind-patterns |
| Backend, API, Node.js, Python, server logic | `agents/backend-specialist.md` | api-patterns, nodejs-best-practices |
| Database, schema, SQL, migrations, ORM | `agents/database-architect.md` | database-design, prisma-expert |
| Mobile, iOS, Android, React Native, Flutter | `agents/mobile-developer.md` | mobile-design |
| Security, auth, vulnerabilities, OWASP | `agents/security-auditor.md` | vulnerability-scanner, codeql, semgrep, supply-chain-risk-auditor |
| Fuzzing, fuzz testing, harness | `agents/penetration-tester.md` | aflpp, libfuzzer, harness-writing, cargo-fuzz |
| Testing, coverage, TDD, test files | `agents/test-engineer.md` | testing-patterns, webapp-testing, coverage-analysis, property-based-testing |
| Debug, fix, error, bug, crash | `agents/debugger.md` | systematic-debugging, debug-buttercup |
| Performance, speed, Web Vitals, optimization | `agents/performance-optimizer.md` | performance-profiling |
| DevOps, deploy, CI/CD, Docker, infra | `agents/devops-engineer.md` | deployment-procedures, devops |
| Coolify, self-hosted PaaS, Coolify deploy | `agents/devops-engineer.md` | coolify, coolify-cli |
| SEO, meta tags, ranking, visibility | `agents/seo-specialist.md` | seo-fundamentals |
| Games, game logic, physics, mechanics | `agents/game-developer.md` | game-development |
| Codebase analysis, exploration, discovery | `agents/explorer-agent.md` | — |
| New project, scaffold, full app | `agents/orchestrator.md` | app-builder, architecture |

All paths relative to `.claude/`. Also check `~/.claude/skills/` for globally installed skills.

### Multi-Domain Tasks → Parallel Subagents

When a task spans 2+ domains, use the **Agent tool** to spawn parallel subagents:

```
Agent tool → subagent_type: "general-purpose"
Prompt: "Read .claude/agents/{agent}.md and follow its instructions.
         Load skill: .claude/skills/{skill}/SKILL.md
         Task: {specific subtask with full user context}"
```

For complex tasks (3+ domains), read `.claude/agents/orchestrator.md` first for coordination protocol.

### Planning → Claude Code Native Plan Mode

For tasks that need planning (new projects, major features, architecture decisions):
1. **Enter Plan mode** using the EnterPlanMode tool
2. **Read** `.claude/agents/project-planner.md` for planning methodology
3. **Research and plan** using the project-planner's framework (task breakdown, agent assignment, verification criteria)
4. **Exit Plan mode** when ready to implement

Do NOT create separate PLAN-*.md files. Use Claude Code's native plan system.

### Validation → Automatic After Code Changes

After completing significant code changes, run:
```bash
python .claude/scripts/checklist.py .                    # Quick: Security → Lint → Schema → Tests → UX → SEO
python .claude/scripts/verify_all.py . --url <URL>       # Full: + Lighthouse, E2E, Mobile, i18n
```

### Workflow Auto-Detection

Even without explicit `/command` invocations, match the user's intent to the right workflow pattern:

| User intent pattern | Apply workflow from |
|---|---|
| "build", "create", "new app/project" | `.claude/workflows/create.md` |
| "plan", "break down", "how should we" | `.claude/workflows/plan.md` (native Plan mode) |
| "debug", "fix", "error", "not working" | `.claude/workflows/debug.md` |
| "improve", "enhance", "add feature to" | `.claude/workflows/enhance.md` |
| "brainstorm", "options", "how could we" | `.claude/workflows/brainstorm.md` |
| "deploy", "release", "go live" | `.claude/workflows/deploy.md` |
| "test", "coverage", "verify" | `.claude/workflows/test.md` |
| Complex multi-domain task | `.claude/workflows/orchestrate.md` |
| UI/UX design with style exploration | `.claude/workflows/ui-ux-pro-max.md` |

### Hooks (Automatic Automation)

Pre-configured hooks in `.claude/settings.json` handle:
- **Auto-format**: Files are formatted with prettier/eslint after every edit
- **File protection**: `.env` and sensitive files are blocked from writes
- **Notifications**: Desktop notification when Claude finishes a task
- **Context preservation**: Critical project context is re-injected after compaction

### Path-Conditional Rules

Rules in `.claude/rules/` activate automatically based on file paths:
- `rules/frontend.md` — Triggers for `*.tsx`, `components/`, `pages/`
- `rules/backend.md` — Triggers for `api/`, `services/`, `controllers/`
- `rules/testing.md` — Triggers for `*.test.*`, `__tests__/`
- `rules/security.md` — Triggers for `auth/`, `middleware/`, `session*`
- `rules/database.md` — Triggers for `prisma/`, `migrations/`, `models/`

### References
- Full architecture index: `.claude/ARCHITECTURE.md`
- Extended coding standards: `.claude/rules/CLAUDE.md`
