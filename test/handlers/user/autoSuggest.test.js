require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");

describe("get suggested users by username: GET /autosuggest", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully finds two test users", async () => {
    const res = await request(app)
      .get("/autosuggest?loginSubstring=test&limit=2")
      .set("x-access-token", token);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
