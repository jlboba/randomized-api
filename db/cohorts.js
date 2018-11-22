// ==============================
// DEPENDENCIES
// ==============================
const express = require('express')
const router  = express.Router()
const db      = require('../config/db')
const sql     = require('../sql/index').cohorts

// ==============================
// HELPER METHODS
// ==============================
// creates a cohort
const createCohort = (data) => {
  return {
    "cohort_id": data.cohort_id,
    "cohort_name": data.cohort_name,
    "students": []
  }
}
// creates a student
const createStudent = (data) => {
  return {
    "name": data.student_name,
    "nickname": data.student_nickname
  }
}
// format cohort data
const formatCohortData = (data) => {
  // default vars
  let currentCohortId = null;
  let cohorts = []
  // loops through each cohort
  data.forEach((cohort) => {
    // creates a  new cohort for the cohorts array if one doesn't exist already
    if(cohort.cohort_id !== currentCohortId) {
      cohorts.push(createCohort(cohort))
      currentCohortId = cohort.cohort_id
    }
    // creates students push into each cohort's student array if student exists
    if(cohort.student_name !== null) {
      cohorts[cohorts.length - 1].students.push(createStudent(cohort))
    }
  })
  return cohorts
}

// ==============================
// ROUTES
// ==============================
// get all cohorts
router.get('/', (req, res) => {
  db.any(sql.all)
    .then((foundCohorts) => {
      res.json(formatCohortData(foundCohorts))
    })
    .catch(err => console.log(err))
})

// get one cohort by id
router.get('/:id', (req, res) => {
  db.any(sql.one, req.params.id)
    .then((foundCohorts) => {
      res.json(formatCohortData(foundCohorts))
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
  db.oneOrNone(sql.delete, req.params.id)
    .then((deletedCohort) => {
      // then deletes corresponding students
      db.oneOrNone(sql.deleteStudents, req.params.id)
        .then((deletedStudents) => {
          // then deletes corresponding lists
          db.oneOrNone(sql.deleteLists, req.params.id)
            .then((deletedLists) => {
              // then deletes corresponding joins
              db.oneOrNone(sql.deleteJoins, req.params.id)
                .then((deletedJoins) => {
                  res.json(deletedJoins)
                })
                .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
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
