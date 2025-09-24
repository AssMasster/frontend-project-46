install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

fix:
	npx eslint --fix

make lint:
	npx eslint

gendiff:
	node gendiff.js

test:
	npx jest

test-coverage:
	npm test -- --coverage

.PHONY: test