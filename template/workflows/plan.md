---
description: Create project plan using Claude Code's native Plan mode with project-planner expertise. No code writing - planning only.
---

# /plan - Project Planning

$ARGUMENTS

---

## Protocol

1. **Enter Plan Mode** — Use Claude Code's native Plan mode (EnterPlanMode tool)
2. **Load Expertise** — Read `.claude/agents/project-planner.md` and `.claude/skills/plan-writing/SKILL.md`
3. **Socratic Gate** — If request is unclear, ask 1-3 clarifying questions before planning
4. **Create Plan** — Follow the project-planner's framework:
   - **Analysis**: Requirements, constraints, risks, project type (WEB/MOBILE/BACKEND)
   - **Task Breakdown**: Tasks with INPUT → OUTPUT → VERIFY criteria
   - **Agent Assignment**: Map each task to the right agent and skill
   - **Verification**: Define Phase X checklist with validation scripts
5. **Present Plan** — Show the structured plan to the user for review
6. **On Approval** — Exit plan mode (ExitPlanMode) and begin implementation

---

## Rules

- **NO CODE WRITING** during planning — plan only
- Use the **project-planner methodology** from `.claude/agents/project-planner.md`
- Follow **project type routing**: Mobile → mobile-developer, Web → frontend-specialist, API → backend-specialist
- Plans stay in Claude Code's native plan system — visible in the UI, persistent across conversation
- If user explicitly wants a persistent document, write to `docs/PLAN-{task-slug}.md` after approval

---

## Plan Structure (Required Sections)

| Section | Content |
|---|---|
| **Overview** | What & why |
| **Project Type** | WEB / MOBILE / BACKEND (explicit) |
| **Success Criteria** | Measurable outcomes |
| **Tech Stack** | Technologies with rationale |
| **File Structure** | Directory layout |
| **Task Breakdown** | All tasks with Agent + Skill + INPUT → OUTPUT → VERIFY |
| **Phase X** | Final verification checklist with scripts |

---

## After Planning

Tell user:
```
Plan ready for review.

Next steps:
- Review and approve the plan
- I'll begin implementation following the task breakdown
- Or request modifications before starting
```

---

## Usage

```
/plan e-commerce site with cart
/plan mobile app for fitness tracking
/plan SaaS dashboard with analytics
/plan refactor authentication system
```
