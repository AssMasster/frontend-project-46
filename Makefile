install:
	npm ci

publish:
	npm publish --dry-run

link:
	sudo npm link

make lint:
	npx eslint

gendiff:
	node gendiff.js