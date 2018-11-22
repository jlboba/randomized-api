// ==============================
// DEPENDENCIES
// ==============================
const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

// ==============================
// HELPER
// ==============================
function sql(file) {
    const fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

// ==============================
// EXPORT
// ==============================
module.exports = {
  lists: {
    all: sql('lists/all.sql'),
    listsForCohort: sql('lists/listsForCohort.sql'),
    one: sql('lists/one.sql')
  }
}
