#!/bin/bash
# Send desktop notification when Claude finishes a response
# macOS: native notification, Linux: notify-send

if [[ "$OSTYPE" == "darwin"* ]]; then
  osascript -e 'display notification "Task completed" with title "Claude Code" sound name "Glass"' 2>/dev/null
elif command -v notify-send &>/dev/null; then
  notify-send "Claude Code" "Task completed" 2>/dev/null
fi

exit 0
