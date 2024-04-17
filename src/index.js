const parseQuery = require("./queryParser");
const readCSV = require("./csvReader");

async function executeSELECTQuery(query) {
  try {
    const { fields, table } = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    if (!data) {
      throw new Error("Table not found or empty");
    }

    const filteredData = data.map((row) => {
      const filteredRow = {};
      fields.forEach((field) => {
        if (row.hasOwnProperty(field)) {
          filteredRow[field] = row[field];
        } else {
          console.warn(`Field '${field}' does not exist in the table.`);
          filteredRow[field] = null;
        }
      });
      return filteredRow;
    });

    return filteredData;
  } catch (error) {
    return Promise.reject("Error executing SELECT query: " + error.message);
  }
}

module.exports = executeSELECTQuery;
