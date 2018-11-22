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
    allForCohort: sql('lists/allForCohort.sql'),
    one: sql('lists/one.sql'),
    delete: sql('lists/delete.sql'),
    deleteJoin: sql('lists/deleteJoin.sql'),
    create: sql('lists/create.sql'),
    createJoin: sql('lists/createJoin.sql')
  }
}
