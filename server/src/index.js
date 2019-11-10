import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import _ from 'lodash'

import schema from './schema'
import resolvers from './resolvers'
import models, { connectDb } from './models'

const app = express()

app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use(cors())

app.use(morgan('dev'))

const isTest = !!process.env.TEST_DATABASE_URL
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 8001

app.use(function(req, res, next) {
  if (
    req.get('X-Forwarded-Proto') == 'https' ||
    req.hostname == 'localhost'
  ) {
    next()
  } else if (
    req.get('X-Forwarded-Proto') != 'https' &&
    req.get('X-Forwarded-Port') != '443'
  ) {
    res.redirect('https://' + req.hostname + req.url)
  }
})

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    return { ...error }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      }
    }

    if (req) {
      return {
        models,
      }
    }
  },
})

server.applyMiddleware({
  app,
  path: '/graphql',
  bodyParserConfig: {
    limit: '10mb',
  },
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

connectDb().then(async () => {
  httpServer.listen({ port }, () => {
    console.log(`🚀 Apollo Server ready at :${port}/graphql`)
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`,
    )
  })
})
