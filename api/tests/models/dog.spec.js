const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validations", () => {
    beforeEach(async () => await Dog.sync({ force: true }));
    describe("Dog", () => {
      it("Should not create a Dog without values", (done) => {
        Dog.create({})
          .then(() => done(new Error("Should not have been created")))
          .catch(() => done());
      });
      it("Should not create a Dog with only dog_breed value", (done) => {
        Dog.create({ dog_breed: "Pug" })
          .then(() => done("It require all parameters"))
          .catch(() => done());
      });
      it("weight_max should have been a number", (done) => {
        Dog.create({
          dog_breed: "Ignacio",
          weight_max: "hola",
          weight_min: 1,
          height_max: 1,
          height_min: 2,
        })
          .then(() => done("Should not have been created"))
          .catch(() => done());
      });
      it("Should create a dog", (done) => {
        Dog.create({
          dog_breed: "Ignacio",
          weight_max: 50,
          weight_min: 49,
          height_max: 50,
          height_min: 49,
          life_span: "3-5 years",
        })
          .then(() => done())
          .catch(() => done("Dog should have been created"));
      });
    });
  });
});
