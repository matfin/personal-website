# Tech Roadmap
This is what we need to do to build a nice, simple, well maintained application.

## Very basic set up
We should have the basic files in place before we install any dependencies
- .editorconfig
- .gitignore
- package.json
- tsconfig.json
- .babelrc
- .eslintrc

## Dependencies
We should have a simple set of dependencies that are well supported and adhere to industry standards.

- add packages with NPM for testing development purposes
	- [webpack](https://www.npmjs.com/package/webpack) to package everything
	- [typescript](https://www.npmjs.com/package/typescript) is what this app will be written in
	- [@babel/*](https://www.npmjs.com/package/Babel) will convert Typescript to Javascript for browsers
	- [eslint](https://eslint.org/) will check code quality for Typescript

- add packages with NPM for implemetation
	- [React](https://www.npmjs.com/package/react)
	- [React Redux](https://www.npmjs.com/package/react-redux)
	- [Styled Components](https://styled-components.com/)

- add packages for setting up the REST server
  - [Express](https://expressjs.com/)

## What we have
- full test coverage and reporting
- code splitting and separate bundle configuration for webpack
- code lint tools
- basic REST server to serve assets and content
- better path aliasing for module imports
- implemented server side rendering
- progressive web app with offline capability
- improved Lighthouse audit scores

## Nice to have
- use Redux Saga
- use Storybook for component rendering/documentation
- production bundling and CI flow