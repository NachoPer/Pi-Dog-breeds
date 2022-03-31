const axios = require("axios");
const { Router, response } = require("express");
const dogsRouter = Router();
const { Dog, Temperament } = require("../../db");
const { API_KEY } = process.env;

dogsRouter.get("/", async (req, res) => {
  try {
    const dbData = async () => {
      return await Dog.findAll({
        attributes: ["dog_breed", "weight_min", "weight_max", "id"],
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
    };
    const apiData = async () => {
      const apiInfo = await axios.get(
        "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY
      );
      const info = apiInfo.data.map(
        ({ weight, name, id, temperament, image }) => {
          const weight_max = parseInt(weight.metric.split("-")[1]);
          const weight_min = parseInt(weight.metric.split("-")[0]);
          const temperaments =
            typeof temperament === "string" &&
            temperament.split(",").map((t) => {
              return (
                t.trim().charAt(0).toUpperCase() +
                t.toLowerCase().trim().slice(1)
              );
            });
          if (weight_max > 0 || weight_min > 0)
            return {
              id,
              dog_breed: name,
              image: image.url,
              weight_max: weight_max ? weight_max : weight_min + 1,
              weight_min: weight_min ? weight_min : weight_max - 1,
              temperament: temperaments || temperament,
            };
        }
      );
      const infoFiltered = info.filter((e) => e !== undefined);
      return infoFiltered;
    };
    const { name } = req.query;
    const getApiData = await apiData();
    const getDbData = await dbData();
    const getAllDog_breeds = getApiData.concat(getDbData);
    if (name) {
      const getDog_breed = getAllDog_breeds.filter(
        (dog_breed) =>
          dog_breed?.dog_breed.slice(0, name.length).toUpperCase() ===
          name.toUpperCase()
      );
      return getAllDog_breeds
        ? res.status(200).send(getDog_breed)
        : res.status(400).send("Dog breed not found");
    }
    getAllDog_breeds
      ? res.status(200).send(getAllDog_breeds)
      : res.status(400).send("Dog breeds not found");
  } catch (error) {
    console.log(error);
  }
});

dogsRouter.get("/:id", async (req, res) => {
  const dbDataId = async () => {
    return await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };
  const apiDataId = async () => {
    const apiInfo = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY
    );
    const info = apiInfo.data.map(
      ({ weight, height, name, id, temperament, life_span, image }) => {
        const height_max = parseInt(height.metric.split("-")[1]);
        const height_min = parseInt(height.metric.split("-")[0]);
        const weight_max = parseInt(weight.metric.split("-")[1]);
        const weight_min = parseInt(weight.metric.split("-")[0]);
        const temperaments =
          typeof temperament === "string" &&
          temperament.split(",").map((t) => {
            return (
              t.trim().charAt(0).toUpperCase() + t.toLowerCase().trim().slice(1)
            );
          });
        return {
          id,
          dog_breed: name,
          image: image.url,
          weight_max: weight_max ? weight_max : weight_min + 1,
          weight_min: weight_min ? weight_min : weight_max - 1,
          height_max: height_max ? height_max : height_min + 1,
          height_min: height_min ? height_min : height_max - 1,
          temperament: temperaments || temperament,
          life_span,
        };
      }
    );
    return info;
  };
  const { id } = req.params;
  const getApiDataId = await apiDataId();
  const getDbDataId = await dbDataId();
  const getAllDog_breeds = getApiDataId.concat(getDbDataId);
  const getDog_breedById = getAllDog_breeds.find(
    (dogs_breed) => dogs_breed.id == id
  );
  return getDog_breedById
    ? res.status(200).send(getDog_breedById)
    : res.status(400).send("The dog breed don't exist");
});

module.exports = dogsRouter;
// dogsRouter.get("/1/:id", (req, res) => {
//   const { id } = req.params;
//   const dbDataId = new Promise((resolve, reject) => {
//     try {
//       const dogs_breedsFound = () =>
//         Dog.findAll({
//           include: {
//             model: Temperament,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
//         });
//       resolve(dogs_breedsFound);
//     } catch (error) {
//       reject(console.log(error));
//     }
//   });
//   const apiDataId = new Promise((resolve, reject) => {
//     axios
//       .get("https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY)
//       .then(({ data }) =>
//         data.map(
//           ({ weight, height, name, id, temperament, life_span, image }) => {
//             const height_max = parseInt(height.metric.split("-")[1]);
//             const height_min = parseInt(height.metric.split("-")[0]);
//             const weight_max = parseInt(weight.metric.split("-")[1]);
//             const weight_min = parseInt(weight.metric.split("-")[0]);
//             const temperaments =
//               typeof temperament === "string" &&
//               temperament.split(",").map((t) => {
//                 return (
//                   t.trim().charAt(0).toUpperCase() +
//                   t.toLowerCase().trim().slice(1)
//                 );
//               });
//             return {
//               id,
//               dog_breed: name,
//               image: image.url,
//               weight_max: weight_max ? weight_max : weight_min + 1,
//               weight_min: weight_min ? weight_min : weight_max - 1,
//               height_max: height_max ? height_max : height_min + 1,
//               height_min: height_min ? height_min : height_max - 1,
//               temperament: temperaments || temperament,
//               life_span,
//             };
//           }
//         )
//       )
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
//   Promise.all([apiDataId, dbDataId])
//     .then(([apiDataId, dbDataId]) => apiDataId.concat(dbDataId))
//     .then((allData) => allData.find((dog_breed) => dog_breed.id == id))
//     .then((dogBreedFound) =>
//       dogBreedFound
//         ? res.send(dogBreedFound)
//         : res.status(400).send("dog breed not found")
//     );
// });
