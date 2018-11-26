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
  console.log(data);
  return {
    "name": data.student_name,
    "nickname": data.student_nickname,
    "category": data.category
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
  db.any(sql.allForCohort, req.params.cohortid)
    .then((foundLists) => {
      res.json(formatListData(foundLists))
    })
    .catch(err => res.send(err))
})

// get one list by id
router.get('/:id', (req, res) => {
  db.any(sql.one, req.params.id)
    .then((foundLists) => {
      res.json(formatListData(foundLists))
    })
    .catch(err => res.send(err))
})

// delete a list
router.delete('/:id', (req, res) => {
  db.oneOrNone(sql.delete, req.params.id)
    .then((deletedCohort) => {
      // then deletes corresponding join
      db.oneOrNone(sql.deleteJoin, req.params.id)
        .then((deletedJoin) => {
          res.json(deletedJoin)
        })
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
})

// create a list
router.post('/', (req, res) => {
  db.one(sql.create, [req.body.name, req.body.cohort_id])
    .then((createdList) => {
      req.body.students.forEach((student) => {
        db.one(sql.createJoin, [createdList.id, student.id, req.body.cohort_id, student.category])
      })
      res.json(createdList)
    })
    .catch(err => res.send(err))
})

// ==============================
// EXPORT
// ==============================
module.exports = router
