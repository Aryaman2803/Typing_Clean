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
const UserModel = require('./models/Users')
const NotesModel = require('./models/Notes')
const PORT = process.env.PORT
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const colors = require('colors')
const notesRoute = require('./routes/notesRoute')
const userRoute = require('./routes/userRoute')
const { errorHandler } = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

//Connect mongoDB
connectDB()

//Middlewares
app.use(express.json())
app.use(cookieParser())
// const whitelist = [
//   'https://typingmernapp.herokuapp.com/api/login',
//   'https://typingmernapp.herokuapp.com/api/dashboard/',
// ]
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) return callback(null, true)

//     callback(new Error('Not allowed by CORS'))
//   },
// }

// app.use(cors(corsOptions))
// app.use(cors())
// expressApp.use(
//   cors({
//     credentials: true,
//     origin: 'https://typingmernapp.herokuapp.com/',
//   })
// )
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });
app.use(cors())
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://clever-feynman-1d6948.netlify.app/');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
//   res.send('hompage')
// })
app.use('/api', userRoute)
app.use('/api/dashboard/', notesRoute)

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'../client/build')))
  
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
