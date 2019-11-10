# graphql-server

## Features

- Node.js with Express and Apollo Server
- MongoDB Database with Mongoose
- REACT cleint with material-ui and styled-components

## Node

Upgrade node if you don't have at least version 11.8.0
`sudo npm cache clean -f` clear npm cache
`sudo npm install -g n` install "n" (this might take a while)
`sudo n stable`

## Installation

- `git clone git@github.com:jgardi/graphql-react.git`
- `cd graphql-react`
- `touch server/.env`
- `touch client/.env`

## Run server

- `cd server`
- cp the sample.env file to .env file (see below)
- `npm install`
- `npm run test`
- visit `http://localhost:8001/graphql` for GraphQL playground
- After shutdown run this in your terminal `mongo admin --eval 'db.shutdownServer()' > /dev/null` (need to fix this in startup/shutdown)

## Run client

- `cd client`
- cp the sample.env file to .env file (see below)
- `npm install`
- `npm start`

#### server/.env file

You will need a mongo database up and running. Set one up locally or on mlabs

```
DATABASE_URL=mongodb://localhost:27017/graphql-server
```

#### client/.env file

```
REACT_APP_URI=http://localhost:8001/graphql
REACT_APP_WSURI=ws://localhost:8001/graphql
```

#### Testing

- adjust `test:run-server` npm script with `TEST_DATABASE_URL` environment variable in package.json to match your testing database name
- type in one terminal: npm run test:run-server
- then in a second terminal: to run all tests `npm run test:execute-test src/**/*.spec.js` or to run specific test file `npm run test:execute-test src/**/marketplace.spec.js`
- After running tests and stoping the test server, run this in your terminal `mongo admin --eval 'db.shutdownServer()' > /dev/null` (need to fix this in startup/shutdown)
- need to add tests

#### Expo issues

Run this command
`sudo xcode-select -s /Applications/Xcode.app`
`killall -9 com.apple.CoreSimulator.CoreSimulatorService`

#### Heroku deploy from subtree

- git remote add my-server https://git.heroku.com/my-server.git
- git remote add my-client https://git.heroku.com/my-client.git
- git subtree push --prefix server my-server master
- git subtree push --prefix client my-client master
- set env variables on heroku server
  `DATABASE_URL`
  `NODE_ENV`
  `NPM_CONFIG_PRODUCTION`
- set env variables on heroku client
  `REACT-APP_URI`
  `REACT-APP_WSURI`

### Live Demo

- https://hilton-client.herokuapp.com/
