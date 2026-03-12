---
description: Coordinate multiple agents for complex tasks. Use for multi-perspective analysis, comprehensive reviews, or tasks requiring different domain expertise.
---

# Multi-Agent Orchestration

You are now in **ORCHESTRATION MODE**. Your task: coordinate specialized agents to solve this complex problem.

## Task to Orchestrate
$ARGUMENTS

---

## Minimum Agent Requirement

> **ORCHESTRATION = MINIMUM 3 DIFFERENT AGENTS**
>
> If you use fewer than 3 agents, you are NOT orchestrating.
> Single agent = delegation, not orchestration.

### Agent Selection Matrix

| Task Type | Required Agents (minimum) |
|---|---|
| **Web App** | frontend-specialist, backend-specialist, test-engineer |
| **API** | backend-specialist, security-auditor, test-engineer |
| **UI/Design** | frontend-specialist, seo-specialist, performance-optimizer |
| **Database** | database-architect, backend-specialist, security-auditor |
| **Full Stack** | frontend-specialist, backend-specialist, devops-engineer |
| **Debug** | debugger, explorer-agent, test-engineer |
| **Security** | security-auditor, penetration-tester, devops-engineer |

---

## Orchestration Protocol

### Step 1: Analyze Task Domains
```
Identify ALL domains:
[ ] Security      → security-auditor
[ ] Backend/API   → backend-specialist
[ ] Frontend/UI   → frontend-specialist
[ ] Database      → database-architect
[ ] Testing       → test-engineer
[ ] DevOps        → devops-engineer
[ ] Mobile        → mobile-developer
[ ] Performance   → performance-optimizer
[ ] SEO           → seo-specialist
```

### Step 2: Complexity Check

| Situation | Action |
|---|---|
| Task is clear, domains identified | Proceed directly to agent invocation |
| Task is complex/unclear | Enter Plan mode first → Plan with project-planner → Then orchestrate |
| Requirements ambiguous | Ask 1-2 questions → Then proceed |

### Step 3: Execute

**For clear tasks — direct orchestration:**
```
Invoke agents in parallel via Agent tool:
- Agent 1: "Read .claude/agents/{name}.md. Load skill: .claude/skills/{name}/SKILL.md. Task: {subtask}"
- Agent 2: "Read .claude/agents/{name}.md. Load skill: .claude/skills/{name}/SKILL.md. Task: {subtask}"
- Agent 3: "Read .claude/agents/{name}.md. Load skill: .claude/skills/{name}/SKILL.md. Task: {subtask}"
```

**For complex tasks — plan first:**
1. Enter Plan mode (EnterPlanMode)
2. Read `.claude/agents/project-planner.md`
3. Create task breakdown with agent assignments
4. Exit Plan mode
5. Execute agents per plan

### Step 4: Context Passing (Mandatory)

When invoking ANY subagent, include:
1. **Agent file**: "Read .claude/agents/{name}.md"
2. **Skills**: "Load .claude/skills/{name}/SKILL.md"
3. **Original request**: Full text of what user asked
4. **Decisions made**: All user answers
5. **Prior work**: Summary of previous agents' output

### Step 5: Verification (Mandatory)
The LAST step must run verification:
```bash
python .claude/scripts/checklist.py .
```

### Step 6: Synthesize Results
Combine all agent outputs into unified report.

---

## Available Agents

| Agent | Domain |
|---|---|
| `project-planner` | Planning, task breakdown |
| `explorer-agent` | Codebase discovery |
| `frontend-specialist` | React, Vue, CSS, HTML |
| `backend-specialist` | API, Node.js, Python |
| `database-architect` | SQL, NoSQL, Schema |
| `security-auditor` | Vulnerabilities, Auth |
| `penetration-tester` | Active security testing |
| `test-engineer` | Unit, E2E, Coverage |
| `devops-engineer` | CI/CD, Docker, Deploy |
| `mobile-developer` | React Native, Flutter |
| `performance-optimizer` | Lighthouse, Profiling |
| `seo-specialist` | Meta, Schema, Rankings |
| `documentation-writer` | README, API docs |
| `debugger` | Error analysis |
| `game-developer` | Unity, Godot |

---

## Output Format

```markdown
## Orchestration Report

### Task
[Original task summary]

### Agents Invoked (minimum 3)
| # | Agent | Focus Area | Status |
|---|---|---|---|
| 1 | agent-name | task focus | Done |
| 2 | agent-name | task focus | Done |
| 3 | agent-name | task focus | Done |

### Verification
- [ ] checklist.py → Pass/Fail
- [ ] Domain-specific scripts → Pass/Fail

### Key Findings
1. **[Agent 1]**: Finding
2. **[Agent 2]**: Finding
3. **[Agent 3]**: Finding

### Summary
[One paragraph synthesis of all agent work]
```

---

## Exit Gate

Before completing:
1. `invoked_agents >= 3`
2. At least `checklist.py` ran
3. Report generated with all agents listed

---

**Begin orchestration now. Select 3+ agents, execute (parallel when possible), verify, synthesize.**
