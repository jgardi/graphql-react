export default {
  Flashcard: {},
  Query: {
    flashcards: async (parent, args, { models }) => {
      try {
        return await models.Flashcard.find()
      } catch (error) {
        return error
      }
    },

    flashcard: async (parent, { id }, { models }) => {
      try {
        return await models.Flashcard.findById({ _id: id })
      } catch (error) {
        return error
      }
    },
  },

  Mutation: {
    createFlashcard: async (
      parent,
      { flashcardInput },
      { models },
    ) => {
      const { category, front, back } = flashcardInput
      if (!category) throw new Error('select a category')
      if (!front) throw new Error('Input front content')
      if (!back) throw new Error('Input back content')

      const update = { category, front, back }

      try {
        return await models.Flashcard.create({ ...update })
      } catch (error) {
        return error
      }
    },
  },
}
