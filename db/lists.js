// ==============================
// DEPENDENCIES
// ==============================
const express = require('express')
const router  = express.Router()
const db      = require('../config/db')
const sql     = require('../sql/index').lists

// ==============================
// HELPER METHODS
// ==============================
// creates a list
const createList = (data) => {
  return {
    "list_id": data.list_id,
    "list_name": data.list_name,
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
// format list data
const formatListData = (data) => {
  // default vars
  let currentListId = null;
  let lists = []
  // loops through each list
  data.forEach((list) => {
    // creates a  new list for the lists array if one doesn't exist already
    if(list.list_id !== currentListId) {
      lists.push(createList(list))
      currentListId = list.list_id
    }
    // creates students push into each list's student array if student exists
    if(list.student_name !== null) {
      lists[lists.length - 1].students.push(createStudent(list))
    }
  })
  return lists
}

// ==============================
// ROUTES
// ==============================
// get all lists
router.get('/', (req, res) => {
  db.any(sql.all)
    .then((foundLists) => {
      res.json(formatListData(foundLists))
    })
    .catch(err => res.send(err))
})

// get all lists for a cohort
router.get('/cohort/:cohortid', (req, res) => {
  db.any(sql.listsForCohort, req.params.cohortid)
    .then((foundLists) => {
      res.json(formatListData(foundLists))
    })
    .catch(err => res.send(err))
})

// get one list by id
router.get('/:id', (req, res) => {
  db.any(sql.one, req.params.id)
    .then((foundList) => {
      res.json(foundList)
    })
    .catch(err => res.send(err))
})

// create a cohort
router.post('/', (req, res) => {
  db.none('INSERT INTO lists(name) VALUES(${name})', req.body)
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
