import { gql } from 'apollo-server-express'

import reservationSchema from './reservation'
import flashcardSchema from './flashcard'

const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`

export default [linkSchema, reservationSchema, flashcardSchema]
