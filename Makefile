SHELL := /bin/bash

.PHONY: check check-guardrails test-guardrails

check: check-guardrails
	@missing=0; \
	for path in package.json package-lock.json next.config.ts tsconfig.json eslint.config.mjs postcss.config.mjs; do \
		if [ ! -f "$$path" ]; then \
			echo "project-state: missing required file: $$path" >&2; \
			missing=1; \
		fi; \
	done; \
	if [ "$$missing" -ne 0 ]; then \
		echo "project-state: frontend checks are blocked; preserve or restore these files only with explicit user authorization." >&2; \
		exit 1; \
	fi
	@npm run check

check-guardrails:
	@bash .git-hooks/check-naming.sh --all

test-guardrails:
	@bash scripts/test-guardrails.sh

