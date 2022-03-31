const { default: axios } = require("axios");
const { Router } = require("express");
const temperamentRouter = Router();
const { Temperament } = require("../../db");
const { API_KEY } = process.env;

temperamentRouter.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

module.exports = temperamentRouter;
