const readCSV = require("../../src/csvReader");
const parseQuery = require("../../src/queryParser");

test("Read CSV File", async () => {
  const data = await readCSV("./student.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(4);
  expect(data[1].name).toBe("Dave");
  expect(data[1].age).toBe("25");
});

test("Parsed Query", () => {
  const queryString = "SELECT id, name FROM student";
  const parsedQuery = parseQuery(queryString);
  expect(parsedQuery).toEqual({
    fields: ["id", "name"],
    table: "student",
  });
});
