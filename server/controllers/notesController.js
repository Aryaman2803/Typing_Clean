const UserModel = require('../models/Users')
const NotesModel = require('../models/Notes')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const asyncHandler = require('express-async-handler')
/**
 * *@des Get all notes for logged in user
 * *@route GET 'api/dashboard/notes'
 * *@access Private
 */

const getNotes = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const notes = await NotesModel.find({ user: _id }).sort({ updatedAt: -1 })
  res.json({ status: 'ok', notes: notes })
})

/**
 * *@des Open a single note with id passed in url
 * *@route get 'api/dashboard/:id'
 * *@access Private
 */

const getOneNote = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { id } = req.params
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400)
    throw new Error('Invalid note id')
  }
  const note = await NotesModel.findOne({ user: _id, _id: id })
  console.log(note)
  res.json({ status: 'ok', note: note })
})
/**
 * *@des Create a new single note
 * *@route POST 'api/dashboard/notes/'
 * *@access Private
 */
const setNote = asyncHandler(async (req, res, next) => {
  const { _id } = req.user
  const title = req.body.title
  const body = req.body.body

  if (!title && !body) {
    res.status(400)
    throw new Error('Title and body are required')
  }
  const newNote = await NotesModel.create({
    user: _id,
    title: title,
    body: body,
  })
  await newNote.save()
  return res.json({ status: 'ok', note: newNote })
})

/**
 * *@des gets a single note id and update it
 * *@route PUT 'api/dashboard/notes/:id'
 * *@access Private
 */
const updateNote = asyncHandler(async (req, res) => {
  const id = req.params.id
  // No, it's not a valid ObjectId,dont proceed with `findById` call.
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400)
    throw new Error('Invalid note id')
  }
  const getNoteToBeDeleted = await NotesModel.findById(id) //* this id is from url params

  if (!getNoteToBeDeleted) {
    res.status(404)
    throw new Error('Note not found')
  }
  const getLoggedInUserData = await UserModel.findById(req.user._id) // *logged in user credentials passed in req.user form auth middleware

  //Making sure we don't update other user's note
  if (
    getNoteToBeDeleted.user.toString() !== getLoggedInUserData._id.toString()
  ) {
    res.status(401)
    throw new Error('User not unauthorized')
  }

  //TODO: If i leave either title or body KEY in postman empty then it works,
  //TODO: But if i deliberately put empty string in title or body then it doesnt work.
  // TODO: figure out during frontend testing

  const updateNote = await NotesModel.updateOne(
    { _id: id },
    { title: req.body.title, body: req.body.body }
  )

  res.json({ status: 'ok', note: updateNote })
})

/**
 * *@des gets a single note id and delete it
 * *@route DELETE 'api/dashboard/notes/:id'
 * *@access Private
 */

//TODO: Delete note handling today!

const deleteNode = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400)
    throw new Error('Invalid note id')
  }
  const getNoteToBeDeleted = await NotesModel.findById(id) //* this id is from url params
  if (!getNoteToBeDeleted) {
    res.status(404)
    throw new Error('Note not found')
  }
  const getLoggedInUserData = await UserModel.findById(req.user._id) // *logged in user credentials passed in req.user form auth middleware

  //Making sure we don't update other user's note
  if (
    getNoteToBeDeleted.user.toString() !== getLoggedInUserData.id.toString()
  ) {
    res.status(401)
    throw new Error('User not unauthorized')
  }

  await getNoteToBeDeleted.remove()
  res.status(200).json({ id: id, body: 'Note deleted' })
})

module.exports = { getNotes, setNote, getOneNote, updateNote, deleteNode }
