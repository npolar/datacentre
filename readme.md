# norwegian polar data centre

The fastest [data portal](https://data.npolar.no) on the planet, created with modern web and browser technologies:

* ECMAScript 2015 modules
* Custom elements
* Web and service workers
* CSS grid

## Requirements
There are 0 dependencies, but you need a browser from 2017 or later to run the application,
and <a href="https://nodejs.org/en/">Node.js</a> and <a href="https://yarnpkg.com/lang/en/">yarn</a> to run the optional development tools

## Development
After `git clone`ing the repo, install dev deps with
`yarn` and run
`yarn dev` to start a live-server on http://localhost:7777

To develop with service workers (careful: cache invalidation is not-yet implemented)
`yarn dev-sw`

## Testing
`yarn eslint`
`yarn test`

## Contributing
Please do, but create a git branch for all new features
