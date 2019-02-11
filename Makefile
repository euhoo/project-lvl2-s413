install: 
    npm install

run:
	npx babel-node -- 'src/bin/hexlet.js' 10

build:
	npm run build

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish