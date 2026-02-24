# cc-kit

CLI que instala uma knowledge base completa no Claude Code — agents, skills, workflows, scripts de validacao.

Um comando e seu Claude Code ganha **20 agents especialistas**, **37+ skills**, **11 workflows** e **scripts Python de validacao**. Tudo vai pra `.claude/` do seu projeto.

---

## O que e isso?

O Claude Code por padrao nao sabe nada sobre seu projeto. Ele e poderoso, mas generico.

O **cc-kit** resolve isso instalando uma base de conhecimento curada dentro do `.claude/` — agents que funcionam como especialistas (backend, frontend, seguranca, mobile, etc), skills com patterns e boas praticas, workflows pra tarefas estruturadas, e scripts Python pra validacao automatica.

Basicamente: **seu Claude Code vira um time de especialistas**.

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
├── agents/           # 20 agents especialistas (.md)
├── skills/           # 37+ skills com patterns e boas praticas
├── workflows/        # 11 workflows estruturados
├── scripts/          # Scripts Python de validacao (checklist, verify_all, etc)
├── rules/CLAUDE.md   # Regras estendidas de coding standards
├── .shared/          # Dados compartilhados (UI/UX datasets, etc)
├── ARCHITECTURE.md   # Indice completo da knowledge base
└── mcp_config.json   # Config MCP servers (com placeholder API key)

CLAUDE.md             # Regras do projeto na raiz (criado se nao existir)
```

---

## Comandos

### `cc-kit init`

Baixa e instala a knowledge base no `.claude/`.

- **Merge inteligente**: se `.claude/` ja existe, faz merge — seu conteudo existente e preservado
- **Paths protegidos**: `settings.json`, `settings.local.json`, `plans/`, `memory/`, `projects/` **nunca** sao tocados
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

## O que vem dentro

### Agents (20)

Arquivos de conhecimento especialista que o Claude le on-demand:

`orchestrator` · `project-planner` · `security-auditor` · `backend-specialist` · `frontend-specialist` · `mobile-developer` · `debugger` · `game-developer` · `test-engineer` · `database-architect` · `devops-engineer` · `performance-optimizer` · `seo-specialist` · `penetration-tester` · `documentation-writer` · `qa-automation-engineer` · `code-archaeologist` · `explorer-agent` · `product-manager` · `product-owner`

### Skills (37+)

Patterns, boas praticas e conhecimento por dominio:

`clean-code` · `api-patterns` · `database-design` · `frontend-design` · `mobile-design` · `testing-patterns` · `vulnerability-scanner` · `brainstorming` · `plan-writing` · `architecture` · `tailwind-patterns` · `nextjs-react-expert` · `nodejs-best-practices` · `python-patterns` · `rust-pro` · `bash-linux` · `game-development` · `seo-fundamentals` · `performance-profiling` · `webapp-testing` · `tdd-workflow` · `code-review-checklist` · `deployment-procedures` · `mcp-builder` · e mais...

### Workflows (11)

Fluxos estruturados de execucao de tarefas:

`brainstorm` · `create` · `debug` · `deploy` · `enhance` · `orchestrate` · `plan` · `preview` · `status` · `test` · `ui-ux-pro-max`

### Scripts de Validacao

Scripts Python pra rodar checks no seu projeto:

```bash
python .claude/scripts/checklist.py .              # Validacao por prioridade
python .claude/scripts/verify_all.py . --url <URL> # Suite completa pre-deploy
```

---

## Como funciona

1. Baixa o template do GitHub via [giget](https://github.com/unjs/giget)
2. Faz merge dos agents, skills, workflows e scripts no `.claude/`
3. Cria um `CLAUDE.md` generico na raiz do projeto (se nao existir)
4. Nunca toca em configs do usuario (settings, memory, plans)

---

## Pre-requisitos

- **Node.js** 18+ (pra rodar o CLI)
- **Python** 3.10+ (pra rodar os scripts de validacao — opcional)
- **Claude Code** CLI instalado (o que vai consumir a knowledge base)

---

## Creditos

Este projeto foi inspirado no [`@vudovn/ag-kit`](https://www.npmjs.com/package/@vudovn/ag-kit) (Antigravity Kit), que instala agents/skills/workflows pro Gemini CLI no diretorio `.agent/`.

O **cc-kit** adapta esse mesmo conceito pro ecossistema **Claude Code** — todo o conteudo foi reescrito e adaptado pra funcionar com a estrutura `.claude/`, sem nenhuma referencia ao Gemini ou Antigravity.

Obrigado ao [@vudovn](https://github.com/vudovn) pela ideia original e pelo trabalho no ag-kit.

---

## Licenca

MIT
