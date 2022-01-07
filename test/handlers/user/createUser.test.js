require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const User = require("../../../src/models/User");
const getToken = require("../../getToken");

describe("create user: POST /user/", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully creates a new user and then hard-deletes it", async () => {
    const res = await request(app)
      .post("/user")
      .set("x-access-token", token)
      .send({ login: "testcreated", password: "aBcDe12345", age: 20 });
    expect(res.statusCode).toBe(201);
    try {
      const result = await User.destroy({
        where: { id: res.body.id },
      });
      expect(result).toBe(1);
    } catch (err) {
      console.log(err);
    }
  });
  it("fails to create a user if the login is already taken", async () => {
    const res = await request(app)
      .post("/user")
      .set("x-access-token", token)
      .send({ login: "test", password: "aBcDe12345", age: 20 });
    expect(res.statusCode).toBe(400);
  });
});
