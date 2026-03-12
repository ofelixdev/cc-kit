#!/bin/bash
# Block writes to sensitive files (.env, secrets, credentials)
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[ -z "$FILE_PATH" ] && exit 0

# Protected patterns
PROTECTED=(
  ".env"
  ".env.local"
  ".env.production"
  ".env.development"
  "credentials"
  "secrets"
  ".pem"
  ".key"
  "id_rsa"
  "id_ed25519"
)

BASENAME=$(basename "$FILE_PATH")

for pattern in "${PROTECTED[@]}"; do
  if [[ "$BASENAME" == *"$pattern"* ]]; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Protected file: '"$BASENAME"'. Use --force or edit manually if intentional."}}'
    exit 0
  fi
done

exit 0
