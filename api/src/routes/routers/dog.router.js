const { Router } = require("express");
const dogRouter = Router();
const { Dog, Temperament } = require("../../db");

dogRouter.post("/", async (req, res) => {
  const {
    dog_breed,
    weight_max,
    weight_min,
    height_max,
    height_min,
    temperament,
    life_span,
  } = req.body;
  const allTemperaments = temperament?.map((t) => {
    return t.toLowerCase().trim();
  });
  try {
    const dogBreed = await Dog.create({
      dog_breed,
      weight_max,
      weight_min,
      height_max,
      height_min,
      life_span,
    });

    const temperamentsFound = await Temperament.findAll({
      where: {
        name: allTemperaments,
      },
    });

    await dogBreed.addTemperaments(temperamentsFound);

    res.status(200).send("Dog breed created successfully");
  } catch (error) {
    res.status(400).send(error.name + ":" + error.message);
  }
});

module.exports = dogRouter;
