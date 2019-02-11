install:
	npm install

lint:
	npx eslint .

start:
	npx babel-node -- src/bin/start.js

test:
	npm test
	
publish:
	npm publish
