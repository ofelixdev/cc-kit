---
description: Create new application. Triggers planning, then orchestrated implementation with specialist agents.
---

# /create - Create Application

$ARGUMENTS

---

## Protocol

### 1. Understand Request
- Analyze what the user wants
- If information is missing, ask 1-3 clarifying questions

### 2. Plan (Native Plan Mode)
- Enter Plan mode (EnterPlanMode tool)
- Read `.claude/agents/project-planner.md` for methodology
- Read `.claude/skills/app-builder/SKILL.md` for project templates
- Create task breakdown: components, agents, skills, priorities
- Present plan for user approval
- Exit Plan mode

### 3. Build (After Approval)
- Read `.claude/agents/orchestrator.md` for coordination
- Spawn specialist agents via Agent tool:
  - `database-architect` → Schema (if needed)
  - `backend-specialist` → API (if needed)
  - `frontend-specialist` OR `mobile-developer` → UI
  - `test-engineer` → Tests
- Run agents in parallel where possible

### 4. Verify
- Run `python .claude/scripts/checklist.py .`
- Fix any issues found

### 5. Preview
- Start dev server if applicable
- Present result to user

---

## Usage

```
/create blog site
/create e-commerce app with product listing and cart
/create todo app
/create Instagram clone
/create SaaS dashboard with analytics
```

---

## Before Starting

If request is unclear, ask:
- What type of application?
- What are the key features?
- Who will use it?

Use sensible defaults, refine later.
