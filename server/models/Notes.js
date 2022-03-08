const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    title: String,
    body: String,
  },
  { timestamps: true }
)

const NotesModel = mongoose.model('Notes', NotesSchema)
module.exports = NotesModel
