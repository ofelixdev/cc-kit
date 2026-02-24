# Project Rules

## Stack
<!-- TODO: Describe your tech stack here -->

## Language
- Respond in the user's language
- Code, variables, and comments always in English

## Code Standards
- No over-engineering. Simplest solution that works.
- No unnecessary comments - let code self-document
- Before modifying any file, check what imports it and update dependents together
- Read `CODEBASE.md` for file dependency map if it exists

## Knowledge Base
The `.claude/` directory contains specialist knowledge files:
- **Design/UI**: read `.claude/agents/frontend-specialist.md`
- **Backend/API**: read `.claude/agents/backend-specialist.md`
- **Security**: read `.claude/agents/security-auditor.md`
- **Testing**: read `.claude/agents/test-engineer.md`
- **Full index**: see `.claude/ARCHITECTURE.md`

## Validation Scripts
- `python .claude/scripts/checklist.py .` -- priority-based validation
- `python .claude/scripts/verify_all.py . --url <URL>` -- full pre-deploy suite

## Detailed Rules
See `.claude/rules/CLAUDE.md` for extended coding standards.
