all:

TARGET := yasunori

.PHONY: test
test:
	clojure -M:test

.PHONY: clean
clean:
	rm -rf target

.PHONY: build
build:
	clojure -T:build uberjar

.PHONY: build.native
build.native: target/${TARGET}

target/$(TARGET): build
	native-image \
		-jar target/$(TARGET)-standalone.jar \
		-H:+ReportExceptionStackTraces \
		--report-unsupported-elements-at-runtime \
		--features=clj_easy.graal_build_time.InitClojureClasses \
		--verbose \
		--no-fallback \
		$@
