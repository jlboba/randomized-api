// ==============================
// DEPENDENCIES
// ==============================
const express  = require('express')
const dotenv   = require('dotenv')
const cors     = require('cors')
const app      = express()

// ==============================
// CONFIG & DATABASE
// ==============================
const port        = process.env.PORT || 3000
const db          = require('./db/app.js')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

// ==============================
// MIDDLEWARE
// ==============================
dotenv.load()
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

// ==============================
// ROUTES
// ==============================
// main index
app.get('/', (req, res) => {
  res.json({"message": "you're hitting the wrong route!"})
})
// data
app.use('/cohorts', cors(corsOptions), db.cohorts)
app.use('/students', cors(corsOptions), db.students)
app.use('/lists', cors(corsOptions), db.lists)

// ==============================
// LISTENER
// ==============================
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
