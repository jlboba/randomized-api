// ==============================
// DEPENDENCIES
// ==============================
const express = require('express')
const router  = express.Router()
const db      = require('../config/db')
const sql     = require('../sql/index').students

// ==============================
// ROUTES
// ==============================
// create a student
router.post('/', (req, res) => {
  db.one(sql.create, [req.body.name, req.body.nickname, req.body.cohort_id])
    .then((createdStudent) => {
      res.json(createdStudent)
    })
    .catch(err => res.send(err))
})

// delete a student
router.delete('/:id', (req, res) => {
  db.oneOrNone(sql.delete, req.params.id)
    .then((deletedStudent) => {
      db.oneOrNone(sql.deleteJoins, req.params.id)
        .then((deletedJoins) => {
            res.json(deletedJoins)
        })
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
})

// update a student
router.put('/:id', (req, res) => {
  db.one(sql.update, [req.params.id, req.body.name, req.body.nickname])
    .then((updatedStudent) => {
      res.json(updatedStudent)
    })
    .catch(err => res.send(err))
})

// ==============================
// EXPORT
// ==============================
module.exports = router
