[![Netlify Status](https://api.netlify.com/api/v1/badges/5b3ba1d5-0a07-470c-ad50-d9e847da605b/deploy-status)](https://app.netlify.com/sites/cofd/deploys)

# Code of Design — Website

### Contents
- [What this is](#what-this-is)
- [Contributing](#contributing)
  - [Working locally](#working-locally)
  - [Building and running in production mode](#building-and-running-in-production-mode)

## What this is

A lightweight website built with native web technologies and Svelte.

The most important concepts are:
- Impact before form
- Functionality before flair
- Language-dynamic rather than English-first

This website should avoid piling on unnecessary dependencies and eventual excessive fileweight. It should remain native as much as possible in order to stay as future-proof as possible.

## Contributing

### Working locally

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5555](http://localhost:5555). You should see the app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

### Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in the package.json's `dependencies` so that the app will work when it's deployed to static site hosting platforms (like e.g. Netlify, which Code of Design uses).

