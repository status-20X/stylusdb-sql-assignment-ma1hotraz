function parseQuery(queryString) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = queryString.match(selectRegex);

  if (!match) {
    throw new Error("Invalid query format");
  }

  const [, fields, table, whereClause] = match;
  const parsedFields = fields.split(",").map((field) => field.trim());

  return {
    fields: parsedFields,
    table: table.trim(),
    whereClause: whereClause ? whereClause.trim() : null,
  };
}

module.exports = parseQuery;
