/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  dog_breed: "Ignacio",
  weight_max: 50,
  weight_min: 49,
  height_max: 50,
  height_min: 49,
  life_span: "3-5 years",
};
describe("Dog route", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
    it("should get Ignacio", () =>
      agent
        .get("/dogs?name=Ignacio")
        .expect(200)
        .expect(function (res) {
          expect(res.body[0]).to.have.property("dog_breed", "Ignacio");
        }));
  });
});
