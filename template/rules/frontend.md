---
paths:
  - "src/components/**"
  - "src/app/**"
  - "src/pages/**"
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.css"
  - "**/*.scss"
  - "**/*.vue"
  - "**/*.svelte"
---

# Frontend Rules

When editing frontend files, automatically load:
- Agent: `.claude/agents/frontend-specialist.md`
- Skills: `.claude/skills/frontend-design/SKILL.md`, `.claude/skills/vercel-react-best-practices/SKILL.md`

## Standards
- Components: small, focused, single responsibility
- Accessibility: WCAG 2.1 AA minimum. Use semantic HTML, aria labels, keyboard navigation.
- Performance: Lazy load heavy components. Optimize images. Minimize bundle size.
- Styling: Use the project's design system. No inline styles unless dynamic.
- State: Lift state only when needed. Prefer local state over global.
