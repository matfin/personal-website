## React and Typescript showcase

This is a simple project that acts as a learning exercise and touches on many topics involed in modern web application development.

#### Any project and the resulting product should aim to be:

- *Fast* so that users can access content quickly and easily, even on slow devices with poor connections.
- *Simple and communicative* so those maintaining the product can do so without friction, and newcomes can easily get up to speed.
- *Easily to test* so problems can be identified and resolved quickly. Code that is easy to test is also be said to be well written.
- *Sticks to industry standard practice* so that maintenance is easier and upgrade paths possible.

#### Maintaing the above is a challenge we aim to solve with the following:

- we aim for 100% test coverage across the board, so that we can identify breaking changes quickly.
- code quality is ensured with ESLint, which forces us to stick writing industry standard clean code.
- we use tools that are very well documented and maintained by their creators and the wider community.
- we follow the advice and approaches of product maintainers to implement certain features, such as our approach to setting up redux for server side rendering. 

### How does this work?
This is a simple web application that has a list and detail view for a collection of stories.

It supports server side rendering, where the basic structure of the HTML for the app is rendered (along with data), then this is passed on to the client. React then takes over, and fills in the blanks (rehydrating) to deliver the rest for what is required of a single page application.

Server side rendered content is delivered with a basic Node server that leverages ExpressJS. With a busy production class application, that has many requests, a different solution should be put in place, but for the sake of this showcase, we will stick with this solution for now.

This is also a progressive web application (PWA), meaning it works offline by caching content and assets. It can be installed on a user's phone and behaves like a native application.

Full unit test coverage is present, with Jest being the test runner and Enzyme used to mount and manipulate the components.

### Installation, running and testing instructions

To install this, do the following:

1) Clone this project with ```$: git clone git@github.com:matfin/react.typescript.showcase.git```
2) Install NPM dependencies with ```$: npm i```
3) Run the application by:
  - building with webpack by running ```$: npm run webpack```
  - running the server with ```$: npm run server```

The web application should be running at `http://localhost:3000`.

To test, run ```$: npm run test``` and to test with coverage, run ```$: npm run coverage```. To check code quality with ESLint run ```$: npm run lint```.

