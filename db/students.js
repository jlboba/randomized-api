// ==============================
// DEPENDENCIES
// ==============================
const express = require('express')
const router     = express.Router()

// ==============================
// ROUTES
// ==============================
router.get('/', (req, res) => {
  res.send('students index aye')
})

// ==============================
// EXPORT
// ==============================
module.exports = router
