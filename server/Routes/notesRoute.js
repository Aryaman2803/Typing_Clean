const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getNotes,
  setNote,
  updateNote,
  deleteNode,
  getOneNote
} = require('../controllers/notesController')

router
  .get('/', protect, getNotes)
  .get('/:id', protect, getOneNote)
  .post('/notes', protect, setNote)
  .put('/notes/:id', protect, updateNote)
  .delete('/notes/:id', protect, deleteNode)

module.exports = router
