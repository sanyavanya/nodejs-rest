require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");

describe("test read group", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully reads an existing group", async () => {
    const testGroupId = "6f89d3b6-3826-49bd-bf20-7649a0547de6";
    const res = await request(app)
      .get("/group/" + testGroupId)
      .set("x-access-token", token);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(testGroupId);
  });
  it("returns 404 if the group doesn't exist", async () => {
    const res = await request(app)
      .get("/group/abrakadabra")
      .set("x-access-token", token);
    expect(res.statusCode).toBe(404);
  });
});
