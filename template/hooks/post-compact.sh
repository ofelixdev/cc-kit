#!/bin/bash
# Re-inject critical context after context compaction
# This prevents loss of important project info when context gets compressed

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0

CONTEXT=""

# Re-inject stack info from CLAUDE.md
if [ -f "CLAUDE.md" ]; then
  STACK=$(sed -n '/## Stack/,/^##/p' CLAUDE.md | head -5)
  [ -n "$STACK" ] && CONTEXT="$CONTEXT\nProject stack: $STACK"
fi

# Re-inject current git branch
BRANCH=$(git branch --show-current 2>/dev/null)
[ -n "$BRANCH" ] && CONTEXT="$CONTEXT\nCurrent branch: $BRANCH"

# Re-inject recent changes reminder
CHANGED=$(git diff --name-only HEAD~3 2>/dev/null | head -10)
[ -n "$CHANGED" ] && CONTEXT="$CONTEXT\nRecently changed files: $CHANGED"

# Output context for Claude to see
if [ -n "$CONTEXT" ]; then
  echo -e "Context restored after compaction:$CONTEXT"
fi

exit 0
