// ==============================
// DEPENDENCIES
// ==============================
const express  = require('express')
const dotenv   = require('dotenv')
const app      = express()

// ==============================
// CONFIG & DATABASE
// ==============================
const port     = process.env.PORT || 3000
const db       = require('./db/app.js')

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
app.use('/cohorts', db.cohorts)
app.use('/students', db.students)
app.use('/lists', db.lists)

// ==============================
// LISTENER
// ==============================
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
