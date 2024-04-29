const parseQuery = require("./queryParser");
const readCSV = require("./csvReader");

async function executeSELECTQuery(query) {
  try {
    const { fields, table, whereClauses } = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    if (!data) {
      throw new Error("Table not found or empty");
    }

    const filteredData =
      whereClauses.length > 0
        ? data.filter((row) =>
            whereClauses.every((clause) => {
              return row[clause.field] === clause.value;
            })
          )
        : data;

    const selectedData = filteredData.map((row) => {
      const selectedRow = {};
      fields.forEach((field) => {
        if (row.hasOwnProperty(field)) {
          selectedRow[field] = row[field];
        } else {
          console.warn(`Field '${field}' does not exist in the table.`);
          selectedRow[field] = null;
        }
      });
      return selectedRow;
    });

    return selectedData;
  } catch (error) {
    return Promise.reject(
      new Error("Error executing SELECT query: Invalid where clause format")
    );
  }
}


module.exports = executeSELECTQuery;
