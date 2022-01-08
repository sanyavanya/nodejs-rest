require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../../src/app");
const sequelizeDb = require("../../../src/models/sequelizeDb");
const getToken = require("../../getToken");
const Group = require("../../../src/models/Group");

describe("test create group", () => {
  let token;
  beforeAll(async () => {
    token = await getToken(app);
  });
  afterAll((done) => {
    sequelizeDb.close().then(done());
  });
  it("successfully creates a new group and then deletes it", async () => {
    const testGroupId = "6f89d3b6-3826-49bd-bf20-7649a0547de6";
    const res = await request(app)
      .post("/group/")
      .set("x-access-token", token)
      .send({
        name: "testcreated",
        permissions: ["READ", "UPDATE", "DELETE"],
      });
    expect(res.statusCode).toBe(201);
    try {
      const result = await Group.destroy({
        where: { id: res.body.id },
      });
      expect(result).toBe(1);
    } catch (err) {
      console.log(err);
    }
  });
  it("fails to create a group if the name is already taken", async () => {
    const res = await request(app)
      .post("/group")
      .set("x-access-token", token)
      .send({
        name: "testgroup",
        permissions: ["READ", "UPDATE", "DELETE"],
      });
    expect(res.statusCode).toBe(400);
  });
});
