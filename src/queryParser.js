function parseQuery(queryString) {
  const selectRegex = /SELECT (.+) FROM (.+)/i;

  const match = queryString.match(selectRegex);

  if (!match) {
    throw new Error("Invalid query format");
  }

  const [, fields, table] = match;
  const parsedFields = fields.split(",").map((field) => field.trim());

  return {
    fields: parsedFields,
    table: table.trim(),
  };
}

module.exports = parseQuery;
