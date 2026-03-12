---
description: Add or update features in existing application. Used for iterative development.
---

# /enhance - Update Application

$ARGUMENTS

---

## Task

This command adds features or makes updates to existing application.

### Steps:

1. **Understand Current State**
   - Explore codebase to understand existing features and tech stack
   - Read `CODEBASE.md` if it exists for file dependencies

2. **Plan Changes**
   - For major changes: Enter Plan mode, create task breakdown, get approval
   - For minor changes: Proceed directly
   - Detect affected files and dependencies

3. **Apply with Domain Expertise**
   - Auto-load relevant agent(s) from `.claude/agents/` based on the domain
   - Load associated skills from `.claude/skills/`
   - For multi-domain changes, spawn parallel subagents via Agent tool
   - Make changes following agent expertise

4. **Validate**
   - Run `python .claude/scripts/checklist.py .`
   - Fix any issues

5. **Update Preview**
   - Hot reload or restart

---

## Usage Examples

```
/enhance add dark mode
/enhance build admin panel
/enhance integrate payment system
/enhance add search feature
/enhance edit profile page
/enhance make responsive
```

---

## Caution

- Get approval for major changes
- Warn on conflicting requests (e.g., "use Firebase" when project uses PostgreSQL)
- Commit each change with git
