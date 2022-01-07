require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");

describe("delete user: DELETE /user/{id}", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("soft-deletes a user", () => {
    return request(app)
      .delete("/user/2a66b92f-f74a-4ae3-acb5-5383ed69c6f4")
      .set("x-access-token", token)
      .expect(202);
  });
});
