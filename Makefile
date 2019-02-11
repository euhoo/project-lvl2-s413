install:
	npm install

lint:
	npx eslint .

start:
	npx babel-node -- src/bin/start.js

test:
	npx babel-node -- src/bin/test.js
	
publish:
	npm publish
