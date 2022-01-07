const request = require("supertest");
const getToken = async (app) => {
  const response = await request(app)
    .post("/login")
    .send({ login: "test", password: "TThd1hD3" });
  return response.res.text;
};

module.exports = getToken;
