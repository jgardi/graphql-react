import reservationResolvers from './reservation'
import flashcardResolvers from './flashcard'
import { GraphQLDateTime } from 'graphql-iso-date'

const customScalarResolver = { Date: GraphQLDateTime }

export default [
  customScalarResolver,
  flashcardResolvers,
  reservationResolvers,
]
