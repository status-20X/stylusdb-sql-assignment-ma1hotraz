const readCSV = require("../../src/csvReader");
const parseQuery = require("../../src/queryParser");
const executeSELECTQuery = require("../../src/index");

test("Read CSV File", async () => {
  const data = await readCSV("./student.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(4);
  expect(data[1].name).toBe("Dave");
  expect(data[1].age).toBe("25");
});

test("Parse SQL Query", () => {
  const query = "SELECT id, name FROM student";
  const parsed = parseQuery(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "student",
  });
});

test("Execute SQL Query", async () => {
  const query = "SELECT id, name FROM student";
  const result = await executeSELECTQuery(query);
  expect(result.length).toBeGreaterThan(0);
  expect(result[1]).toHaveProperty("id");
  expect(result[1]).toHaveProperty("name");
  expect(result[1]).not.toHaveProperty("age");
  expect(result[1]).toEqual({ id: "2", name: "Dave" });
});
