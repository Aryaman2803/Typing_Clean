const path = require('path')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.join(__dirname, '../.env'),
  })
}
// const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')
const PORT = process.env.PORT
const notesRoute = require('./Routes/notesRoute')
const userRoute = require('./Routes/userRoute')
const { errorHandler } = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

//Connect mongoDB
connectDB()

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/api', userRoute)
app.use('/api/dashboard/', notesRoute)


//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  })
} else if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(PORT, (req, res) => {
  console.log(`Listining on port ${PORT}`)
})
