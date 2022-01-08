require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");
const Group = require("../../../src/models/Group");

describe("test delete group", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully deletes an existing group", async () => {
    const testGroupId = "6f89d3b6-3826-49bd-bf20-7649a0547de6";
    const resCreate = await request(app)
      .post("/group/")
      .set("x-access-token", token)
      .send({
        name: "testdeleted",
        permissions: ["READ", "UPDATE", "DELETE"],
      });
    expect(resCreate.statusCode).toBe(201);
    const resDelete = await request(app)
      .delete("/group/" + resCreate.body.id)
      .set("x-access-token", token);
    expect(resDelete.statusCode).toBe(202);
  });
  it("fails to delete a group that doesn't exist", async () => {
    const res = await request(app)
      .delete("/group/abrakadabra")
      .set("x-access-token", token);
    expect(res.statusCode).toBe(404);
  });
});
