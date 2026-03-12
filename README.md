# cc-kit

CLI que instala uma knowledge base completa no Claude Code — agents, skills, workflows, hooks, rules e scripts de validacao.

Um comando e seu Claude Code ganha **20 agents especialistas**, **108 skills**, **11 workflows**, **4 hooks de automacao**, **6 rules contextuais** e **scripts Python de validacao**. Tudo vai pra `.claude/` do seu projeto.

---

## O que e isso?

O Claude Code por padrao nao sabe nada sobre seu projeto. Ele e poderoso, mas generico.

O **cc-kit** resolve isso instalando uma base de conhecimento curada dentro do `.claude/` — agents que funcionam como especialistas (backend, frontend, seguranca, mobile, etc), skills com patterns e boas praticas, workflows pra tarefas estruturadas, hooks que automatizam formatacao e protecao, rules que ativam automaticamente por contexto, e scripts Python pra validacao.

Basicamente: **seu Claude Code vira um time de especialistas que age automaticamente**.

---

## Instalacao

```bash
npx @ofelixdev/cc-kit init
```

Ou global:

```bash
npm i -g @ofelixdev/cc-kit
cc-kit init
```

---

## O que instala

```
.claude/
├── agents/              # 20 agents especialistas
├── skills/              # 108 skills (cc-kit + trailofbits + vercel + community)
├── workflows/           # 11 workflows estruturados
├── hooks/               # 4 hooks de automacao (format, protect, notify, compact)
├── rules/               # 6 rules (1 global + 5 path-conditional)
├── scripts/             # Scripts Python de validacao
├── settings.template.json → settings.json (criado na primeira instalacao)
├── ARCHITECTURE.md      # Indice completo da knowledge base
└── mcp_config.json      # Config MCP servers

CLAUDE.md                # Regras do projeto na raiz (criado se nao existir)
```

---

## Comandos

### `cc-kit init`

Baixa e instala a knowledge base no `.claude/`.

- **Merge inteligente**: se `.claude/` ja existe, faz merge — seu conteudo existente e preservado
- **Paths protegidos**: `settings.json`, `settings.local.json`, `plans/`, `memory/`, `projects/` **nunca** sao sobrescritos
- `CLAUDE.md` da raiz so e criado se nao existir (use `--force` pra sobrescrever)

```bash
cc-kit init                        # Instala no diretorio atual
cc-kit init --force                # Sobrescreve tudo, incluindo CLAUDE.md da raiz
cc-kit init --path ./meu-projeto   # Instala em outro diretorio
cc-kit init --dry-run              # Mostra o que seria feito sem escrever nada
cc-kit init --quiet                # Sem output
cc-kit init --branch dev           # Baixa de uma branch especifica
```

### `cc-kit update`

Re-baixa e sobrescreve a knowledge base (equivalente a `init --force`).

```bash
cc-kit update
```

### `cc-kit status`

Mostra info da instalacao e contagem de arquivos.

```bash
cc-kit status
```

---

## Principais Features

### Sistema Autonomo de Agents

O `CLAUDE.md` instalado na raiz funciona como diretiva — o Claude Code automaticamente detecta o dominio da tarefa e carrega o agent + skills correspondentes. Sem precisar pedir nada.

| Dominio | Agent | Skills |
|---|---|---|
| Frontend, React, UI | `frontend-specialist` | frontend-design, react-best-practices, tailwind-patterns |
| Backend, API, Node | `backend-specialist` | api-patterns, nodejs-best-practices |
| Database, Schema | `database-architect` | database-design |
| Seguranca, Auth | `security-auditor` | vulnerability-scanner, codeql, semgrep |
| Testes, Coverage | `test-engineer` | testing-patterns, webapp-testing, coverage-analysis |
| Debug, Bugs | `debugger` | systematic-debugging |
| DevOps, Deploy | `devops-engineer` | deployment-procedures, devops, coolify |
| Mobile | `mobile-developer` | mobile-design |
| Games | `game-developer` | game-development |
| Performance | `performance-optimizer` | performance-profiling |
| SEO | `seo-specialist` | seo-fundamentals |
| Novo projeto | `orchestrator` | app-builder, architecture |

### Hooks de Automacao (4)

Hooks pre-configurados em `settings.json`:

| Hook | Evento | O que faz |
|---|---|---|
| `auto-format.sh` | Apos editar arquivos | Formata com prettier/eslint automaticamente |
| `protect-files.sh` | Antes de editar | Bloqueia escrita em `.env`, secrets, credentials |
| `notify-done.sh` | Ao terminar | Notificacao desktop (macOS/Linux) |
| `post-compact.sh` | Apos compactacao | Re-injeta contexto do projeto |

### Rules Path-Conditional (5)

Rules em `.claude/rules/` que ativam automaticamente baseado no arquivo sendo editado:

| Rule | Ativa para | O que aplica |
|---|---|---|
| `frontend.md` | `*.tsx`, `*.jsx`, `components/`, `pages/` | Acessibilidade, performance, component patterns |
| `backend.md` | `api/`, `services/`, `controllers/` | Input validation, error handling, seguranca |
| `testing.md` | `*.test.*`, `__tests__/` | Padrao AAA, isolamento, testes por comportamento |
| `security.md` | `auth/`, `middleware/`, `session*` | Sem hardcoded secrets, hashing, CSRF, rate limiting |
| `database.md` | `prisma/`, `migrations/`, `models/` | Migrations, indexes, transactions, soft deletes |

### Settings Template

Na primeira instalacao, cria um `settings.json` com:
- Permissoes deny para `.env` e secrets
- Hooks pre-configurados (format, protect, notify, compact)
- Nunca sobrescreve se ja existir

---

## Skills (108)

### Por Fonte

| Fonte | Qtd | Foco |
|---|---|---|
| **cc-kit** | 36 | Full-stack development |
| **trailofbits/skills** | 60 | Seguranca, fuzzing, auditoria |
| **vercel-labs** | 2 | Web design, skill discovery |
| **obra/superpowers** | 1 | Brainstorming colaborativo |
| **evolv3-ai/vibe-skills** | 3 | Coolify, DevOps, cloud infra |
| **addyosmani/web-quality** | 6 | Acessibilidade, performance, SEO |

### Por Categoria

**Frontend & UI**: react-best-practices, web-design-guidelines, tailwind-patterns, frontend-design, ui-ux-pro-max, nextjs-react-expert

**Backend & API**: api-patterns, nodejs-best-practices, python-patterns, modern-python

**Database**: database-design

**Cloud & Infra**: deployment-procedures, server-management, devcontainer-setup, coolify, coolify-cli, devops

**Testing & Quality**: testing-patterns, webapp-testing, tdd-workflow, code-review-checklist, lint-and-validate, coverage-analysis, property-based-testing, debug-buttercup, differential-review

**Seguranca**: vulnerability-scanner, red-team-tactics, codeql, semgrep, entry-point-analyzer, supply-chain-risk-auditor, e 30+ mais

**Fuzzing**: aflpp, libfuzzer, cargo-fuzz, atheris, harness-writing, libafl, ossfuzz, e mais

**Blockchain**: algorand, cairo, cosmos, solana, substrate, ton vulnerability scanners

**Arquitetura**: app-builder, architecture, plan-writing, brainstorming

---

## Scripts de Validacao

```bash
python .claude/scripts/checklist.py .              # Quick: Security → Lint → Schema → Tests → UX → SEO
python .claude/scripts/verify_all.py . --url <URL> # Full: + Lighthouse, E2E, Mobile, i18n
```

---

## Como funciona

1. Baixa o template do GitHub via [giget](https://github.com/unjs/giget)
2. Faz merge dos agents, skills, workflows, scripts, hooks e rules no `.claude/`
3. Cria `settings.json` com hooks pre-configurados (se nao existir)
4. Cria `CLAUDE.md` na raiz do projeto (se nao existir)
5. Torna hooks executaveis (`chmod +x`)
6. Nunca toca em configs do usuario (settings existente, memory, plans)

---

## Pre-requisitos

- **Node.js** 18+ (pra rodar o CLI)
- **Python** 3.10+ (pra rodar os scripts de validacao — opcional)
- **Claude Code** CLI instalado (o que vai consumir a knowledge base)

---

## Creditos

Inspirado no [`@vudovn/ag-kit`](https://www.npmjs.com/package/@vudovn/ag-kit) (Antigravity Kit). Obrigado ao [@vudovn](https://github.com/vudovn) pela ideia original.

Skills de seguranca por [Trail of Bits](https://github.com/trailofbits/skills). Skills de web quality por [Addy Osmani](https://github.com/nicepkg/claude-code-awesome-skills). Brainstorming por [obra/superpowers](https://github.com/obra/superpowers). Coolify/DevOps por [evolv3-ai](https://github.com/evolv3-ai/vibe-skills).

---

## Licenca

MIT
