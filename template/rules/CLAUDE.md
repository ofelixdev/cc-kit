# Extended Coding Standards

## Language Handling

When user's prompt is NOT in English:
1. Internally translate for better comprehension
2. Respond in user's language
3. Code comments/variables remain in English

## Clean Code (Always Active)

ALL code MUST follow `.claude/skills/clean-code/SKILL.md`:
- Concise, direct, no over-engineering. Self-documenting.
- Testing: Pyramid (Unit > Integration > E2E) + AAA Pattern.
- Performance: Measure first. Core Web Vitals standards.

## File Dependency Awareness

Before modifying ANY file:
1. Check `CODEBASE.md` for file dependencies (if it exists)
2. Identify dependent files
3. Update ALL affected files together

## Agent & Skill Loading Protocol

### How to Load an Agent
Read `.claude/agents/{name}.md` → Contains: expertise, decision frameworks, anti-patterns, quality checks. Follow its instructions.

### How to Load a Skill
Read `.claude/skills/{name}/SKILL.md` → Contains: content map pointing to sub-files, scripts, references. Follow the content map to load what's needed.

### Loading Rules
- Agent files are the PRIMARY source of domain expertise — always read the full file
- Skill SKILL.md files contain a content map — read sub-files as the map directs
- Scripts inside skills are for EXECUTION, not just reading — run them when applicable

## Project Type Routing

| Project Type | Primary Agent | DO NOT use |
|---|---|---|
| **MOBILE** (iOS, Android, RN, Flutter) | `mobile-developer.md` | frontend-specialist |
| **WEB** (Next.js, React, Vue, web apps) | `frontend-specialist.md` | mobile-developer |
| **BACKEND** (API, server, DB only) | `backend-specialist.md` | — |

## Multi-Agent Spawning Protocol

When spawning subagents via the Agent tool, ALWAYS include in the prompt:
1. **Agent file**: "Read .claude/agents/{name}.md and follow its instructions"
2. **Skill files**: "Load skill: .claude/skills/{name}/SKILL.md"
3. **Full context**: User's original request, all decisions made, prior agent work
4. **Specific subtask**: Clear, scoped task for this agent

Example:
```
Agent tool → subagent_type: "general-purpose"
Prompt: "Read .claude/agents/frontend-specialist.md and follow its instructions.
         Load skills: .claude/skills/frontend-design/SKILL.md, .claude/skills/react-best-practices/SKILL.md
         Context: User wants a dashboard with analytics charts. Tech: Next.js + Tailwind.
         Task: Implement the dashboard layout component with chart placeholders."
```

## Planning Protocol

For planning tasks, use Claude Code's **native Plan mode**:
1. Enter Plan mode (EnterPlanMode tool)
2. Read `.claude/agents/project-planner.md` for methodology
3. Research, analyze, create plan within Plan mode
4. Exit Plan mode (ExitPlanMode tool) when ready to implement

Native Plan mode advantages:
- Plans are visible in Claude Code's UI
- Plans persist across the conversation
- No separate file management needed
- Implementation naturally follows the plan

## Validation Scripts

### Master Scripts

| Script | When to Use |
|---|---|
| `python .claude/scripts/checklist.py .` | After development, pre-commit |
| `python .claude/scripts/verify_all.py . --url <URL>` | Pre-deployment, releases |

### Domain Scripts

| Domain | Command |
|---|---|
| Security | `python .claude/skills/vulnerability-scanner/scripts/security_scan.py .` |
| UX Audit | `python .claude/skills/frontend-design/scripts/ux_audit.py .` |
| Accessibility | `python .claude/skills/frontend-design/scripts/accessibility_checker.py .` |
| API Validation | `python .claude/skills/api-patterns/scripts/api_validator.py .` |
| Mobile Audit | `python .claude/skills/mobile-design/scripts/mobile_audit.py .` |
| Schema | `python .claude/skills/database-design/scripts/schema_validator.py .` |
| SEO | `python .claude/skills/seo-fundamentals/scripts/seo_checker.py .` |
| Lint | `python .claude/skills/lint-and-validate/scripts/lint_runner.py .` |
| Tests | `python .claude/skills/testing-patterns/scripts/test_runner.py .` |
| E2E | `python .claude/skills/webapp-testing/scripts/playwright_runner.py <url>` |
| Performance | `python .claude/skills/performance-profiling/scripts/lighthouse_audit.py <url>` |

### When to Run (Automatic)
- **After implementing features**: Run `checklist.py`
- **After touching security/auth**: Run `security_scan.py`
- **After UI work**: Run `ux_audit.py` + `accessibility_checker.py`
- **Before deployment**: Run `verify_all.py`

## Final Checklist Protocol

When the user says "final checks", "checklist", "verify", or similar:
1. Run `python .claude/scripts/checklist.py .`
2. Priority: Security → Lint → Schema → Tests → UX → SEO → Performance
3. NOT finished until checklist passes
4. Fix critical blockers first (Security/Lint)

## Quick Reference

### Agents
`orchestrator`, `project-planner`, `security-auditor`, `backend-specialist`, `frontend-specialist`, `mobile-developer`, `debugger`, `game-developer`, `test-engineer`, `database-architect`, `devops-engineer`, `performance-optimizer`, `seo-specialist`, `penetration-tester`, `documentation-writer`, `qa-automation-engineer`, `code-archaeologist`, `explorer-agent`, `product-manager`, `product-owner`

### Key Skills
`clean-code`, `brainstorming`, `app-builder`, `frontend-design`, `mobile-design`, `plan-writing`, `behavioral-modes`, `api-patterns`, `database-design`, `testing-patterns`, `vulnerability-scanner`, `react-best-practices`, `tailwind-patterns`, `systematic-debugging`, `performance-profiling`
