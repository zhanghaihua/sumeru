TESTS = test/*.js
REPORTER = spec
TIMEOUT = 10000
MOCHA_OPTS =
G = 
#JSCOVERAGE = ./node_modules/jscover/bin/jscover
#JSCOVERAGE = ./jscoverage.exe
JSCOVERAGE = ./jscoverage-0.5.1/jscoverage

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) $(MOCHA_OPTS) \
		$(TESTS)

test-g:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) -g "$(G)" \
		$(TESTS)

test-cov: sumeru-cov
	#@SUMERU_COV=1 $(MAKE) test REPORTER=dot
	@SUMERU_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
	#@SUMERU_COV=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	@rm -rf sumeru-cov

sumeru-cov:
	@rm -rf $@
	@$(JSCOVERAGE) sumeru $@ --no-highlight --encoding=UTF-8

.PHONY: test test-g test-cov sumeru-cov 