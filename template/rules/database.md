---
paths:
  - "**/prisma/**"
  - "**/drizzle/**"
  - "**/migrations/**"
  - "**/*.schema.*"
  - "**/models/**"
  - "**/entities/**"
---

# Database Rules

When editing database files, automatically load:
- Agent: `.claude/agents/database-architect.md`
- Skills: `.claude/skills/database-design/SKILL.md`

## Standards
- Always use migrations for schema changes. Never modify production DB directly.
- Index foreign keys and frequently queried columns.
- Use transactions for multi-step operations.
- Add created_at/updated_at timestamps to all tables.
- Use soft deletes (deleted_at) for user-facing data.
- Parameterized queries only. No raw string interpolation.
