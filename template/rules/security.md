---
paths:
  - "**/auth/**"
  - "**/middleware/**"
  - "**/security/**"
  - "**/*.middleware.*"
  - "**/login*"
  - "**/register*"
  - "**/password*"
  - "**/token*"
  - "**/session*"
---

# Security Rules

When editing auth/security files, automatically load:
- Agent: `.claude/agents/security-auditor.md`
- Skills: `.claude/skills/vulnerability-scanner/SKILL.md`

## Standards
- NEVER hardcode secrets, tokens, or credentials
- NEVER log sensitive data (passwords, tokens, PII)
- Use bcrypt/argon2 for password hashing, NEVER MD5/SHA for passwords
- Validate and sanitize ALL input at the boundary
- Use CSRF protection on state-changing endpoints
- Set secure cookie flags: HttpOnly, Secure, SameSite
- Rate limit auth endpoints
- Use constant-time comparison for secrets/tokens
