#!/usr/bin/env bash
set -euo pipefail

guard="./.git-hooks/check-naming.sh"
if [[ ! -x "$guard" ]]; then
	echo "test-guardrails: guard is missing or not executable: $guard" >&2
	exit 1
fi

expect_accept() {
	local label="$1"
	local path="$2"
	local output
	if ! output="$("$guard" "$path" 2>&1)"; then
		echo "test-guardrails: $label should pass, got: $output" >&2
		exit 1
	fi
}

expect_reject() {
	local label="$1"
	local path="$2"
	local reason="$3"
	local output
	local status=0
	set +e
	output="$("$guard" "$path" 2>&1)"
	status=$?
	set -e
	if [[ "$status" -eq 0 || "$status" -eq 126 || "$status" -eq 127 ]]; then
		echo "test-guardrails: $label should reject with a normal validation failure" >&2
		exit 1
	fi
	if [[ "$output" != *"$path"* || "$output" != *"$reason"* ]]; then
		echo "test-guardrails: $label did not identify path and reason: $output" >&2
		exit 1
	fi
}

expect_accept "clean path" "src/components/research-card.tsx"
expect_reject "forbidden suffix" "src/components/research-card_v2.tsx" "forbidden suffix"
expect_reject "scratch directory" "scratch/notes.md" "scratchpad directory"

echo "test-guardrails: all cases conform"

