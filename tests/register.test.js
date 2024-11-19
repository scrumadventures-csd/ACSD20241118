const app = require("../server");
const supertest = require("supertest");
const { registerGame } = require("../functions/register");

//registering
test("get id for new game", async () => {
  let id = await registerGame();
  expect(typeof id === "string").toBe(true);
});

test("GET /api/mbc/register", async () => {
  await supertest(app)
    .get("/api/mbc/register")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(typeof response.body.id === "string").toBe(true);
    });
});