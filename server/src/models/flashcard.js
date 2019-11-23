import mongoose from 'mongoose'

const flashcardSchema = new mongoose.Schema(
  {
    category: String,
    front: String,
    back: String,
    image: String,
    createdBy: String,
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
    },
  },
  { collection: 'flashcard' },
)

const Flashcard = mongoose.model('Flashcard', flashcardSchema)

export default Flashcard
