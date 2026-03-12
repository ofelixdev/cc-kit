#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { downloadTemplate } from 'giget';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = '1.0.0';
const REPO = 'github:ofelixdev/cc-kit/template';
const TARGET_DIR = '.claude';
const ROOT_CLAUDE_MD = 'CLAUDE.md';

const PROTECTED_PATHS = [
  'settings.json',
  'settings.local.json',
  'plans',
  'memory',
  'projects',
];

const MERGE_DIRS = [
  'agents',
  'skills',
  'workflows',
  'scripts',
  'rules',
  'hooks',
  '.shared',
];

const MERGE_FILES = [
  'ARCHITECTURE.md',
  'mcp_config.json',
];

function resolveTarget(optPath) {
  const base = optPath || process.cwd();
  return {
    root: path.resolve(base),
    claude: path.resolve(base, TARGET_DIR),
  };
}

function isProtected(relativePath) {
  return PROTECTED_PATHS.some(
    (p) => relativePath === p || relativePath.startsWith(p + '/')
  );
}

async function mergeDir(src, dest) {
  let copied = 0;
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await fs.ensureDir(destPath);
      copied += await mergeDir(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath, { overwrite: true });
      copied++;
    }
  }

  return copied;
}

async function installTemplate({ force, targetPath, branch, quiet, dryRun }) {
  const { root, claude } = resolveTarget(targetPath);
  const claudeExists = await fs.pathExists(claude);
  const rootMdExists = await fs.pathExists(path.join(root, ROOT_CLAUDE_MD));

  if (!quiet) {
    console.log(chalk.bold('\n  cc-kit') + chalk.dim(' — Claude Code Knowledge Base\n'));
  }

  if (claudeExists && !force) {
    if (!quiet) {
      console.log(chalk.yellow('  .claude/ already exists — merging (protected files untouched)'));
    }
  }

  if (dryRun) {
    console.log(chalk.cyan('\n  Dry run — no files will be written.\n'));
    console.log(chalk.dim('  Would download template from: ') + REPO);
    console.log(chalk.dim('  Would install to: ') + claude);
    if (!rootMdExists || force) {
      console.log(chalk.dim('  Would create: ') + path.join(root, ROOT_CLAUDE_MD));
    }
    return;
  }

  const spinner = quiet ? null : ora('Downloading template...').start();
  let tempDir;

  try {
    const source = branch ? `${REPO}#${branch}` : REPO;
    const result = await downloadTemplate(source, { force: true });
    tempDir = result.dir;

    if (spinner) spinner.text = 'Installing knowledge base...';

    await fs.ensureDir(claude);

    let totalCopied = 0;

    for (const dir of MERGE_DIRS) {
      const src = path.join(tempDir, dir);
      if (await fs.pathExists(src)) {
        const dest = path.join(claude, dir);
        await fs.ensureDir(dest);
        totalCopied += await mergeDir(src, dest);
      }
    }

    for (const file of MERGE_FILES) {
      const src = path.join(tempDir, file);
      if (await fs.pathExists(src)) {
        await fs.copy(src, path.join(claude, file), { overwrite: true });
        totalCopied++;
      }
    }

    if (!rootMdExists || force) {
      const templateMd = path.join(tempDir, ROOT_CLAUDE_MD);
      if (await fs.pathExists(templateMd)) {
        await fs.copy(templateMd, path.join(root, ROOT_CLAUDE_MD), { overwrite: force });
        if (!quiet) {
          console.log(chalk.dim(`  ${force ? 'Overwrote' : 'Created'} ${ROOT_CLAUDE_MD} in project root`));
        }
      }
    } else if (!quiet) {
      console.log(chalk.dim(`  ${ROOT_CLAUDE_MD} already exists — skipped (use --force to overwrite)`));
    }

    // Install settings.json from template if not exists (never overwrite)
    const settingsPath = path.join(claude, 'settings.json');
    const settingsExists = await fs.pathExists(settingsPath);
    if (!settingsExists) {
      const settingsTemplate = path.join(tempDir, 'settings.template.json');
      if (await fs.pathExists(settingsTemplate)) {
        await fs.copy(settingsTemplate, settingsPath);
        totalCopied++;
        if (!quiet) {
          console.log(chalk.dim('  Created settings.json with hooks & permissions'));
        }
      }
    } else if (!quiet) {
      console.log(chalk.dim('  settings.json already exists — skipped'));
    }

    // Make hook scripts executable
    const hooksDir = path.join(claude, 'hooks');
    if (await fs.pathExists(hooksDir)) {
      const hookFiles = await fs.readdir(hooksDir);
      for (const file of hookFiles) {
        if (file.endsWith('.sh')) {
          await fs.chmod(path.join(hooksDir, file), 0o755);
        }
      }
    }

    if (spinner) spinner.succeed(chalk.green(`Installed ${totalCopied} files into ${TARGET_DIR}/`));

    if (!quiet) {
      console.log('');
      console.log(chalk.dim('  Agents:    ') + await countItems(path.join(claude, 'agents')));
      console.log(chalk.dim('  Skills:    ') + await countItems(path.join(claude, 'skills')));
      console.log(chalk.dim('  Workflows: ') + await countItems(path.join(claude, 'workflows')));
      console.log(chalk.dim('  Scripts:   ') + await countItems(path.join(claude, 'scripts')));
      console.log(chalk.dim('  Hooks:     ') + await countItems(path.join(claude, 'hooks')));
      console.log(chalk.dim('  Rules:     ') + await countItems(path.join(claude, 'rules')));
      console.log('');
      console.log(chalk.green('  Done!') + chalk.dim(' Run ') + chalk.cyan('cc-kit status') + chalk.dim(' to verify.'));
      console.log('');
    }
  } catch (err) {
    if (spinner) spinner.fail(chalk.red('Installation failed'));
    console.error(chalk.red(`\n  Error: ${err.message}\n`));
    process.exit(1);
  } finally {
    if (tempDir) {
      await fs.remove(tempDir).catch(() => {});
    }
  }
}

async function countItems(dir) {
  try {
    const entries = await fs.readdir(dir);
    return String(entries.length);
  } catch {
    return '0';
  }
}

async function showStatus(targetPath) {
  const { claude } = resolveTarget(targetPath);

  console.log(chalk.bold('\n  cc-kit status\n'));

  const exists = await fs.pathExists(path.join(claude, 'agents'));

  if (!exists) {
    console.log(chalk.yellow('  Not installed.') + chalk.dim(' Run ') + chalk.cyan('cc-kit init') + chalk.dim(' to install.\n'));
    return;
  }

  console.log(chalk.dim('  Path:      ') + claude);

  try {
    const stat = await fs.stat(path.join(claude, 'agents'));
    console.log(chalk.dim('  Modified:  ') + stat.mtime.toISOString().slice(0, 19).replace('T', ' '));
  } catch {}

  console.log('');
  console.log(chalk.dim('  Agents:    ') + await countItems(path.join(claude, 'agents')));
  console.log(chalk.dim('  Skills:    ') + await countItems(path.join(claude, 'skills')));
  console.log(chalk.dim('  Workflows: ') + await countItems(path.join(claude, 'workflows')));
  console.log(chalk.dim('  Scripts:   ') + await countItems(path.join(claude, 'scripts')));
  console.log(chalk.dim('  Rules:     ') + await countItems(path.join(claude, 'rules')));
  console.log(chalk.dim('  Hooks:     ') + await countItems(path.join(claude, 'hooks')));
  console.log('');
}

const program = new Command();

program
  .name('cc-kit')
  .description('Claude Code knowledge base installer — agents, skills, workflows')
  .version(VERSION);

program
  .command('init')
  .description('Install or merge the Claude Code knowledge base into .claude/')
  .option('-f, --force', 'Overwrite existing files including root CLAUDE.md')
  .option('-p, --path <dir>', 'Target project directory (default: cwd)')
  .option('-b, --branch <name>', 'GitHub branch to download from')
  .option('-q, --quiet', 'Suppress output')
  .option('--dry-run', 'Show what would be done without writing files')
  .action((opts) => installTemplate({
    force: opts.force,
    targetPath: opts.path,
    branch: opts.branch,
    quiet: opts.quiet,
    dryRun: opts.dryRun,
  }));

program
  .command('update')
  .description('Re-download and overwrite the knowledge base (force merge)')
  .option('-p, --path <dir>', 'Target project directory (default: cwd)')
  .option('-b, --branch <name>', 'GitHub branch to download from')
  .option('-q, --quiet', 'Suppress output')
  .action((opts) => installTemplate({
    force: true,
    targetPath: opts.path,
    branch: opts.branch,
    quiet: opts.quiet,
    dryRun: false,
  }));

program
  .command('status')
  .description('Show installation status and counts')
  .option('-p, --path <dir>', 'Target project directory (default: cwd)')
  .action((opts) => showStatus(opts.path));

program.parse();
