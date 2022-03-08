const mongoose = require('mongoose')
const UserModel = require('../models/Users')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
/**
 * *@desc Login route
 * *@route POST '/api/login'
 * *@access Public
 */
const getLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  //Check for user email
  const user = await UserModel.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = await user.generateAuthToken()
    res.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
    })

    res.json({
      status: 'ok',
      _id: user._id,
      username: user.username,
      email: user.email,
      token: token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})

// const getLogin = asyncHandler(async (req, res) => {
//   const email = req.body.email
//   const password = req.body.password
//   if (!email || !password) {
//     res.status(400)
//     throw new Error('Email and password are required')
//   }
//   const user = await UserModel.findOne({ email: email, password: password })
//   if (user) {
//     const token = jwt.sign(
//       {
//         email: user.email,
//       },
//       SECRET
//     )
//     return res.json({ status: 'ok', user: token })
//   }
//   // else return res.json({ status: 'error', user: false })
// })

const getSignUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  const userExists = await UserModel.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      status: 'ok',
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Data')
  }
})

const getLogout = asyncHandler(async (req, res) => {
  res.clearCookie('token')
  res.json({ status: 'logged out successfully' })
})

/*
 * @desc Register route
 * @route POST '/api/register'
 * @access Public
 */
// const getSignUp = async (req, res) => {
//   //Todo: Install bcrypt for passwor hashing
//   try {
//     const newUser = await new UserModel({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     })
//     await newUser.save()
//     res.json(newUser)
//   } catch (err) {
//     res.send({ status: 'error', error: 'Duplicate email' })
//   }
// }

// const getSignUp = asyncHandler(async (req, res) => {
//   //Todo: Install bcrypt for passwor hashing
//   const username = req.body.username
//   const email = req.body.email
//   const password = req.body.password
//   if (!username && !email && !password) {
//     res.status(400)
//     return new Error('Username, email and password are required')
//   }
//   const user = await UserModel.findOne({ email: email })
//   if (user) {
//     res.status(400)
//     return res.json({ status: 'error', error: 'User already exists' })
//     // return new Error('Username, email and password are required')
//   } else {
//     const newUser = await new UserModel({
//       username: username,
//       email: email,
//       password: password,
//     })
//     await newUser.save()
//     res.json(newUser)
//   }
//   // } catch (err) {
//   //   res.send({ status: 'error', error: 'Duplicate email' })
//   // }
// })

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: '30d' })
}

module.exports = { getLogin, getSignUp, getLogout }
