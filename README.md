## Personal portfolio and CV
As the title says, this is my personal website which contains my portfolio and cv among other things.

My motivation in creating this was to gain a deeper understanding of modern web development practices, while at the same time refreshing my online presence, which was due an overhaul after almost three years.

Upon the initial release of this project, I now have a better understanding of:

### What did I learn from making this?
- dependency management with [webpack](https://webpack.js.org/), including code splitting and bundling.
- [TypeScript](https://www.typescriptlang.org/), which is a superset of JavaScript and includes type-checking.
- [Progressive Web Apps](https://web.dev/progressive-web-apps/) which allow for caching and offline capabilities, among other things
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) which is what I use to unit tests components. It has a nicer approach to testing components than [Enzyme](https://enzymejs.github.io/enzyme/) and works epsecially well with function components. I also have full test coverage across the board.
- [Server Side Rendering (SSR)](https://www.digitalocean.com/community/tutorials/react-server-side-rendering) is where the server renders most of your content and delivers it to the client, thus improving performance and preventing the client from having to download a big JS bundle before anything at all is rendered. I implemented this and included rendering of styled components, so there is no flash of unstyled content (FOUC). To improve rendering performance on the server side, I use the [renderToNodStream from ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) because this is non-blocking and less expensive than using `rendertoString`. I cache rendered content in memory, so delivery to the client is much faster.
- [Docker / Compose](https://docs.docker.com/compose/) is used to test builds locally before I upload them. I have a self signed SSL cert so I can use HTTPS locally, which I created with the help of this [excellent guide](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/). I *don't* use Docker for local development. I used to, but for a project like this, it can be more trouble than it's worth.
- I implementd a content rendering engine that reads in a tree of items from JSON files, then chooses the correct component to render as the JSON is fetched. I wrote some basic regex parsers to extract links from text content and gained a better understanding of how these work.

These were all topics I had worked with before, but I didn't implement them at the start and so didn't have a good understanding of how they really worked.

Now I do, because I was able to get closer to the metal than I had ever been given a chance to before.

### How to install and run this
To get this running, you should have an up to date stable version of [NodeJS](https://nodejs.org/en/). I am using `12.16`. You should also have the most up to date version of [Yarn](https://yarnpkg.com/) installed globally.

- `$ git@github.com:matfin/personal-website.git` to clone this to your local machine
- `$ cd personal-website/`
- `$ yarn` will install dependencies
- `$ yarn dev` will build the server and client and watch for changes
- `$ yarn server` will start the server, which takes care of asset delivery and server side rendering

This will get the site running at a very basic level. Things like Service Worker caching are disabled for development purposes, because it's not fun needing to clear your application cache all the time!

If you want to turn something like this on for local development, you could use `ENABLE_CACHE=true yarn server` and the service worker will be enabled. Most of these things are configured through the `docker-compose.yml` file for local builds, and `docker-compose.prod.yml` for production builds.

### Where does this run?
This website was built to run on modern desktop and mobile browsers. It is fully responsive, can be added to the user's home screen as an application (for that native-like experience) and it can even be used offline.

I decided to deprecate Internet Explorer, given that it is nearing the end of its life and has been superseded by Microsoft Edge (which can now even run on Windows 7!). Supporting this old beast (released late in 2013) just doesn't make sense anymore.

### What are the nice to haves?
I have documented these in the [Tech Roadmap](ROADMAP.md) and will keep working on them.