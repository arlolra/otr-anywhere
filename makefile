all: lint test

.PHONY: lint
lint:
	node_modules/.bin/jshint --verbose --config .jshintrc \
		test/test.*.js src/js/*.js

.PHONY: test
test:
	node_modules/.bin/mocha test