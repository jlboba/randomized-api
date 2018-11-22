// ==============================
// DEPENDENCIES
// ==============================
const express = require('express')
const router  = express.Router()
const db      = require('../config/db')

// ==============================
// ROUTES
// ==============================
// get all cohorts
router.get('/', (req, res) => {
  db.any('SELECT * FROM cohorts')
    .then((foundCohorts) => {
      res.json(foundCohorts)
    })
    .catch(err => console.log(err))
})

// get one cohort by id
router.get('/:id', (req, res) => {
  db.one('SELECT * FROM cohorts WHERE id = $1', req.params.id)
    .then((foundCohort) => {
      res.json(foundCohort)
    })
    .catch(err => res.send(err))
})

// create a cohort
router.post('/', (req, res) => {
  db.none('INSERT INTO cohorts(name) VALUES(${name})', req.body)
    .then((createdCohort) => {
      res.json(req.body)
    })
    .catch(err => res.send(err))
})

// delete a cohort
router.delete('/:id', (req, res) => {
  db.oneOrNone('DELETE FROM cohorts WHERE id = $1', req.params.id)
    .then((deletedCohort) => {
      res.json(deletedCohort)
    })
    .catch(err => res.send(err))
})

// update a cohort
router.put('/:id', (req, res) => {
  db.any('UPDATE cohorts SET name = $1 WHERE id = $2', [req.body.name, req.params.id])
    .then((updatedCohort) => {
      console.log(updatedCohort);
      res.json(updatedCohort)
    })
    .catch(err => res.send(err))
})

// ==============================
// EXPORT
// ==============================
module.exports = router
