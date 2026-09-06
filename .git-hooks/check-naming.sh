#!/usr/bin/env bash
set -euo pipefail

script_name="check-naming.sh"
constraints_file="constraints.yaml"

if [[ ! -f "$constraints_file" ]]; then
	echo "$script_name: missing $constraints_file" >&2
	exit 1
fi

read_constraint_list() {
	local key="$1"
	awk -v key="$key" '
		$0 == "  " key ":" { in_list=1; next }
		in_list && $0 ~ /^  [A-Za-z0-9_-]+:/ { exit }
		in_list && $0 ~ /^    - / {
			value=$0
			sub(/^    - /, "", value)
			gsub(/^"/, "", value)
			gsub(/"$/, "", value)
			print value
		}
	' "$constraints_file"
}

patterns="$(read_constraint_list "forbidden_path_patterns")"
scratch_directories="$(read_constraint_list "forbidden_scratch_directories")"
if [[ -z "$patterns" || -z "$scratch_directories" ]]; then
	echo "$script_name: constraints.yaml is missing naming or scratch-path rules" >&2
	exit 1
fi

check_path() {
	local path="$1"
	local name
	local pattern
	local scratch
	local segment
	local violations=0
	name="$(basename "$path")"

	while IFS= read -r pattern; do
		[[ -n "$pattern" ]] || continue
		if [[ "$name" =~ $pattern ]]; then
			echo "$path: forbidden suffix ($pattern)" >&2
			violations=$((violations + 1))
		fi
	done <<< "$patterns"

	while IFS= read -r segment; do
		while IFS= read -r scratch; do
			[[ -n "$scratch" ]] || continue
			if [[ "$segment" == "$scratch" ]]; then
				echo "$path: scratchpad directory is forbidden ($scratch)" >&2
				violations=$((violations + 1))
			fi
		done <<< "$scratch_directories"
	done < <(printf '%s\n' "$path" | tr '/' '\n')

	return "$violations"
}

violations=0
if [[ $# -ge 1 && "$1" == "--all" ]]; then
	while IFS= read -r path; do
		[[ -n "$path" ]] || continue
		if ! check_path "$path"; then
			violations=$((violations + 1))
		fi
	done < <(git ls-files --cached --others --exclude-standard)
elif [[ $# -eq 1 ]]; then
	if ! check_path "$1"; then
		violations=$((violations + 1))
	fi
else
	while IFS= read -r path; do
		[[ -n "$path" ]] || continue
		if ! check_path "$path"; then
			violations=$((violations + 1))
		fi
	done < <(git diff --cached --name-only --diff-filter=AR)
fi

if [[ "$violations" -gt 0 ]]; then
	echo "$script_name: found $violations naming or scratch-path violation(s)" >&2
	exit 1
fi

echo "$script_name: all paths conform"
