---
paths:
  - "src/api/**"
  - "src/server/**"
  - "src/services/**"
  - "src/controllers/**"
  - "src/routes/**"
  - "**/api/**"
  - "**/*.controller.*"
  - "**/*.service.*"
---

# Backend Rules

When editing backend files, automatically load:
- Agent: `.claude/agents/backend-specialist.md`
- Skills: `.claude/skills/api-patterns/SKILL.md`

## Standards
- Validate ALL external input. Never trust user data.
- Use parameterized queries. No string concatenation for SQL.
- Handle errors explicitly. No silent failures.
- Return proper HTTP status codes.
- Log structured data (JSON). Include request IDs for tracing.
- Keep business logic in services, not controllers/routes.
