const readCSV = require("../../src/csvReader");

test("Read CSV File", async () => {
  const data = await readCSV("./student.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(4);
  expect(data[1].name).toBe("Dave");
  expect(data[1].age).toBe("25");
});
