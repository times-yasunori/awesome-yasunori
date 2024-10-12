all:

.PHONY: dev
dev:
	clojure -A:fig -M -m figwheel.main --build dev --repl

.PHONY: yasunori
yasunori:
	clojure -A:fig -M -m figwheel.main --optimizations advanced --output-to dist/public/js/compiled.js --build-once dev
	rsync -av resources/ dist
	cat resources/public/index.html | sed s^cljs-out/dev-main.js^js/compiled.js^g > dist/public/index.html

.PHONY: clean
clean:
	rm -rf target dist
