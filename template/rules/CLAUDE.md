# Project Rules - Extended

## Language Handling

When user's prompt is NOT in English:
1. Internally translate for better comprehension
2. Respond in user's language
3. Code comments/variables remain in English

## Clean Code (Always Active)

ALL code MUST follow `.claude/skills/clean-code/SKILL.md` rules:
- Concise, direct, no over-engineering. Self-documenting.
- Testing: Pyramid (Unit > Integration > E2E) + AAA Pattern.
- Performance: Measure first. Core Web Vitals standards.

## File Dependency Awareness

**Before modifying ANY file:**
1. Check `CODEBASE.md` for file dependencies (if it exists)
2. Identify dependent files
3. Update ALL affected files together

## Knowledge Base (Read On-Demand)

The `.claude/` directory contains specialist knowledge as reference material. Read these files when working on the relevant domain:

### Project Type Routing

| Project Type                           | Knowledge Reference        | Skills                        |
| -------------------------------------- | -------------------------- | ----------------------------- |
| **MOBILE** (iOS, Android, RN, Flutter) | `agents/mobile-developer.md`    | mobile-design                 |
| **WEB** (Next.js, React web)           | `agents/frontend-specialist.md` | frontend-design               |
| **BACKEND** (API, server, DB)          | `agents/backend-specialist.md`  | api-patterns, database-design |

### Design Rules Reference

| Task         | Read                                 |
| ------------ | ------------------------------------ |
| Web UI/UX    | `.claude/agents/frontend-specialist.md` |
| Mobile UI/UX | `.claude/agents/mobile-developer.md`    |

These files contain design philosophies, anti-patterns, and quality standards.

## Validation Scripts

Scripts are available for quality verification:

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

### Script Mapping

| Domain | Script | Command |
|--------|--------|---------|
| UX Audit | `ux_audit.py` | `python .claude/skills/frontend-design/scripts/ux_audit.py .` |
| Accessibility | `accessibility_checker.py` | `python .claude/skills/frontend-design/scripts/accessibility_checker.py .` |
| API Validation | `api_validator.py` | `python .claude/skills/api-patterns/scripts/api_validator.py .` |
| Mobile Audit | `mobile_audit.py` | `python .claude/skills/mobile-design/scripts/mobile_audit.py .` |
| Schema Validation | `schema_validator.py` | `python .claude/skills/database-design/scripts/schema_validator.py .` |
| Security Scan | `security_scan.py` | `python .claude/skills/vulnerability-scanner/scripts/security_scan.py .` |
| SEO Check | `seo_checker.py` | `python .claude/skills/seo-fundamentals/scripts/seo_checker.py .` |
| Lighthouse | `lighthouse_audit.py` | `python .claude/skills/performance-profiling/scripts/lighthouse_audit.py <url>` |
| Test Runner | `test_runner.py` | `python .claude/skills/testing-patterns/scripts/test_runner.py .` |
| E2E Tests | `playwright_runner.py` | `python .claude/skills/webapp-testing/scripts/playwright_runner.py <url>` |
| Lint Check | `lint_runner.py` | `python .claude/skills/lint-and-validate/scripts/lint_runner.py .` |

## Final Checklist

When the user says "final checks", "son kontrolleri yap", or similar:

1. Run `python .claude/scripts/checklist.py .`
2. Priority order: Security → Lint → Schema → Tests → UX → SEO → Lighthouse/E2E
3. Task is NOT finished until checklist returns success
4. Fix Critical blockers first (Security/Lint)

## Quick Reference

### Agents (Knowledge Files)
`orchestrator`, `project-planner`, `security-auditor`, `backend-specialist`, `frontend-specialist`, `mobile-developer`, `debugger`, `game-developer`, `test-engineer`, `database-architect`, `devops-engineer`, `performance-optimizer`, `seo-specialist`, `penetration-tester`, `documentation-writer`, `qa-automation-engineer`, `code-archaeologist`, `explorer-agent`, `product-manager`, `product-owner`

### Key Skills
`clean-code`, `brainstorming`, `app-builder`, `frontend-design`, `mobile-design`, `plan-writing`, `behavioral-modes`, `api-patterns`, `database-design`, `testing-patterns`, `vulnerability-scanner`
