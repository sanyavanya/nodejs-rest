require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");

describe("test read all groups", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully reads all groups", async () => {
    const res = await request(app).get("/groups").set("x-access-token", token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
