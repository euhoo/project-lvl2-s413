install:
	npm install

lint:
	npx eslint .

start:
	npx babel-node -- src/bin/start.js

gendiff:
	npx babel-node -- src/bin/gendiff.js
	
test:
	npm test
	
publish:
	npm publish
