import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    flashcards: [Flashcard]
    flashcard(id: ID!): Flashcard
  }
  extend type Mutation {
    createFlashcard(flashcardInput: flashcardInput!): Flashcard
  }

  input flashcardInput {
    category: String
    back: String
    front: String
    createdAt: String
  }

  type Flashcard {
    _id: ID
    front: String
    back: String
    category: String
    createdAt: Date
    image: String
  }
`
