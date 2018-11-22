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
  cohorts: {
    all: sql('cohorts/all.sql'),
    one: sql('cohorts/one.sql'),
    delete: sql('cohorts/delete.sql'),
    deleteStudents: sql('cohorts/deleteStudents.sql'),
    deleteLists: sql('cohorts/deleteLists.sql'),
    deleteJoins: sql('cohorts/deleteJoins.sql')
  },
  lists: {
    all: sql('lists/all.sql'),
    allForCohort: sql('lists/allForCohort.sql'),
    one: sql('lists/one.sql'),
    delete: sql('lists/delete.sql'),
    deleteJoin: sql('lists/deleteJoin.sql'),
    create: sql('lists/create.sql'),
    createJoin: sql('lists/createJoin.sql')
  }
}
