## Personal portfolio and CV

This is my personal website which acts as my portfolio and CV / Resumé.

My motivation in creating this was to gain a deeper understanding of modern web development practices. I use it as a testing ground for exploring modern web development practices and technologies.

### What does this project encompass?

- dependency management with [NPM](https://docs.npmjs.com/) and building with [Vite](https://vitejs.dev/).

- [TypeScript](https://www.typescriptlang.org/), which is a superset of JavaScript and includes strict type-checking.

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and [vitest](https://vitest.dev/) which is what is used to unit tests components.

- [Docker / Compose](https://docs.docker.com/compose/) is used to test builds locally before they are uploaded. A self signed ssl cert is needed so follow this [excellent guide](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/).

- A content rendering engine was built that reads in a tree of items from JSON files, then chooses the correct component to render as the JSON is fetched.

- For state management, [Redux Toolkit](https://redux-toolkit.js.org/) is used. This makes managing complex async functionality much easier and readable.

### How to install and run this

To get this running, you should have an up to date stable version of [NodeJS](https://nodejs.org/en/). Version `20.12.2` is used here.

- `$ git@github.com:matfin/personal-website.git` to clone this to your local machine
- `$ cd personal-website/`
- `$ npm install` will install dependencies
- `$ npm run start` will build the server and client and watch for changes
- `$ npm run deploy` will generate the site as a static bundle, which is output to the `/dist` directory.
- `$ npm run checks` will run unit tests with coverage, code lint and style lint.

### Where does this run?

On all modern web browsers both mobile and desktop.

### How is this deployed?

For CI (continuous integration), a very popular and well documented tool called [CircleCI](https://circleci.com/) is used.

There is a script that generates all content and assets, then a CircleCI config that deploys this to a remote server.

### What are the nice to haves?

This is documented in the [Tech Roadmap](ROADMAP.md).
