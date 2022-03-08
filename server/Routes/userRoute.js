const express = require('express')
const router = express.Router()
const {
  getLogin,
  getSignUp,
  getLogout,
} = require('../controllers/userController')

router.post('/login', getLogin)
router.post('/register', getSignUp)
router.post('/logout', getLogout)

module.exports = router
