all:

.PHONY: dev
dev:
	clojure -M -m figwheel.main --build dev --repl

.PHONY: yasunori
yasunori:
	clojure -M -m figwheel.main --optimizations advanced --output-to docs/js/compiled.js --build-once dev

.PHONY: clean
clean:
	rm -rf target
