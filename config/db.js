// ==============================
// DB CONNNECTION
// ==============================
const pgp = require('pg-promise')({})

const connection = process.env.DATABSE_URL || {
  host     : process.env.HOST,
  port     : process.env.PORT,
  database : 'randomized',
  user     : process.env.USER,
  password : process.env.DB_PASSWORD
}

const db = pgp(connection)

module.exports = db
