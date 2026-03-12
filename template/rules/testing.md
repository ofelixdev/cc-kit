---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/__tests__/**"
  - "**/tests/**"
  - "**/test/**"
---

# Testing Rules

When editing test files, automatically load:
- Agent: `.claude/agents/test-engineer.md`
- Skills: `.claude/skills/testing-patterns/SKILL.md`

## Standards
- Pattern: Arrange-Act-Assert (AAA)
- Name: describe WHAT, it SHOULD, WHEN condition
- One logical assertion per test
- Mock external dependencies, not internal modules
- Test behavior, not implementation details
- Edge cases: null, empty, boundary values, error paths
- No test interdependencies. Each test runs in isolation.
