require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");

describe("test update group", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully updates an existing group", async () => {
    const res = await request(app)
      .put("/group")
      .set("x-access-token", token)
      .send({
        id: "2d8ca2e9-bedc-4cf8-a67a-b9b43ee6eaa9",
        name: "testupdated5",
        permissions: ["READ", "UPDATE", "DELETE"],
      });
    expect(res.statusCode).toBe(204);
  });
});
