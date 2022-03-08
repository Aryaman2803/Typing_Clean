const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const SECRET = process.env.SECRET
const UserModel = require('../models/Users')
const protect = asyncHandler(async (req, res, next) => {
  let token
  let tokin
  try {
    tokin = req.cookies.token
    const verify = jwt.verify(tokin, SECRET)
    const rootUser = await UserModel.findOne({
      _id: verify._id,
      'tokens.token': tokin,
    }).select('-password')
    if (!rootUser) {
      res.status(401)
      throw new Error('User not found')
    }
    req.love = 'love'
    req.token = tokin
    req.user = rootUser
    req.userID = rootUser._id
    next()
  } catch (err) {
    res.status(401)
    throw new Error('Not authorized, no token provided') 
  }

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   try {
  //     //Get token from header
  //     token = req.headers.authorization.split(' ')[1]

  //     //Verify token
  //     const decoded = jwt.verify(token, SECRET)

  //     //Get user from the token and sign it to
  //     req.user = await UserModel.findById(decoded.id).select('-password')
  //     next()
  //   } catch (error) {
  //     console.log(error)
  //     res.status(401)
  //     throw new Error('Not authorized')
  //   }
  // }

  // if (!token) {
  //   res.status(401)
  //   throw new Error('Not authorized, no token')
  // }
})

module.exports = { protect }
