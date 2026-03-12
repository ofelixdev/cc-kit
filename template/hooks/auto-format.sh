#!/bin/bash
# Auto-format files after Claude edits/writes them
# Runs prettier if available, falls back to eslint --fix
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[ -z "$FILE_PATH" ] && exit 0
[ ! -f "$FILE_PATH" ] && exit 0

# Only format known code file types
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.scss|*.html|*.vue|*.svelte|*.md)
    ;;
  *)
    exit 0
    ;;
esac

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0

# Try prettier first, then eslint
if [ -f "node_modules/.bin/prettier" ]; then
  npx prettier --write "$FILE_PATH" 2>/dev/null
elif [ -f "node_modules/.bin/eslint" ]; then
  npx eslint --fix "$FILE_PATH" 2>/dev/null
fi

exit 0
