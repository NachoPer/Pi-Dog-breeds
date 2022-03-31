const { default: axios } = require("axios");
const { Router } = require("express");
const temperamentRouter = Router();
const { Temperament } = require("../../db");
const { API_KEY } = process.env;

temperamentRouter.get("/", async (req, res) => {
  const apiData = await axios.get(
    "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY
  );
  const apiTemperaments = apiData.data.map((dog_breed) => {
    dog_breed.temperament &&
      dog_breed.temperament.split(",").forEach((temperament) => {
        Temperament.findOrCreate({
          where: {
            name: temperament.toLowerCase().trim(),
          },
        });
      });
  });
  const allTemperaments = await Temperament.findAll({
    order: [["name", "ASC"]],
  });
  return allTemperaments
    ? res.status(200).send(allTemperaments)
    : res.status(404).send("Temperaments not found");
});

temperamentRouter.get("/hola", (req, res) => {
  axios
    .get("https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY)
    .then(({ data }) =>
      data.map((dog_breed) => {
        dog_breed.temperament &&
          dog_breed.temperament.split(",").forEach((temperament) => {
            Temperament.findOrCreate({
              where: { name: temperament.toLowerCase().trim() },
            });
          });
      })
    )
    .then(() =>
      Temperament.findAll({
        order: [["name", "ASC"]],
      })
    )
    .then((allTemperaments) =>
      allTemperaments
        ? res.status(200).send(allTemperaments)
        : res.status(404).send("Temperaments not found")
    );
});

module.exports = temperamentRouter;
