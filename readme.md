# norwegian polar data centre

The fastest [data portal](https://data.npolar.no) on the planet, created with modern web and browser technologies:

* ECMAScript 2015 modules
* Custom elements
* Web and service workers
* CSS grid

## Requirements
There are 0 dependencies, but you need a browser from 2017 or later to run the application

## Development
Install with `yarn install` and run
`yarn dev` to start a live-server on http://localhost:7777
(echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p)

To develop with service workers (careful: cache invalidation is not yet implemented)
`yarn dev-sw`

## Testing
`yarn eslint`
`yarn test`

## Contributing
Please do, but create a git branch
