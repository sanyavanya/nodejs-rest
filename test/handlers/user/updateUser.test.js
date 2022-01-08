require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const User = require("../../../src/models/User");
const getToken = require("../../getToken");

describe("test update user", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully updates an existing user", async () => {
    const newPasswordPostfix = Math.floor(Math.random() * 100000);
    const res = await request(app)
      .put("/user")
      .set("x-access-token", token)
      .send({
        id: "fb0db6bb-660c-4e29-9791-961d5bbd7808",
        login: "testupdated",
        password: "aBcDe" + newPasswordPostfix,
        age: 20,
      });
    expect(res.statusCode).toBe(204);
  });
  it("fails to update a non-existent user", async () => {
    const newPasswordPostfix = Math.floor(Math.random() * 100000);
    const res = await request(app)
      .put("/user")
      .set("x-access-token", token)
      .send({
        id: "abrakadabra",
        login: "testupdated",
        password: "aBcDe12345",
        age: 20,
      });
    expect(res.statusCode).toBe(404);
  });
});
