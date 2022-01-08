require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");

describe("test read user", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully reads an existing user", async () => {
    const testUserId = "113eee81-5018-474d-89bd-146569350417";
    const res = await request(app)
      .get("/user/" + testUserId)
      .set("x-access-token", token);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(testUserId);
    expect(res.body.login).toBe("test");
    expect(res.body.age).toBe("19");
  });
  it("doesn't find a deleted user", async () => {
    const testUserDeletedId = "2a66b92f-f74a-4ae3-acb5-5383ed69c6f4";
    const res = await request(app)
      .get("/user/" + testUserDeletedId)
      .set("x-access-token", token);
    expect(res.statusCode).toBe(404);
  });
  it("returns 404 if the user doesn't exist", async () => {
    const nonExistentUserId = "abrakadabra";
    const res = await request(app)
      .get("/user/" + nonExistentUserId)
      .set("x-access-token", token);
    expect(res.statusCode).toBe(404);
  });
});
