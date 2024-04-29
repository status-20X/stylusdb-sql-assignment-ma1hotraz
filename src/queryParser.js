function parseQuery(queryString) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = queryString.match(selectRegex);

  if (!match) {
    throw new Error("Invalid query format");
  }

  const [, fields, table, whereClause] = match;
  const parsedFields = fields.split(",").map((field) => field.trim());

  let whereClauses = [];
  if (whereClause) {
    whereClauses = parseWhereClause(whereClause);
  }

  return {
    fields: parsedFields,
    table: table.trim(),
    whereClauses: whereClauses,
  };
}

function parseWhereClause(whereString) {
  const conditionRegex = /\s*(\w+)\s*(=|>|<)\s*('(?:[^'\\]|\\.)*'|[^\s]+)/gi;
  const whereClauses = [];
  let match;

  while ((match = conditionRegex.exec(whereString)) !== null) {
    const [, field, operator, value] = match;
    whereClauses.push({ field, operator, value });
  }

  if (whereClauses.length === 0) {
    throw new Error("Invalid where clause format");
  }

  return whereClauses;
}





module.exports = parseQuery;
