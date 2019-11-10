import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'

import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { createHttpLink } from 'apollo-link-http'

import App from './app'

const httpLink = createPersistedQueryLink().concat(
  createHttpLink({ uri: process.env.REACT_APP_URI }),
)

const token = localStorage.getItem('token')
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WSURI,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
})

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    if (token) {
      headers = { ...headers, authorization: token }
    }

    return { headers }
  })

  return forward(operation)
})

const link = ApolloLink.from([authLink, terminatingLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
