import axios from "axios";

export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_DOG_BREEDS_FILTERED = "GET_DOG_BREEDS_FILTERED";
export const GET_ALL_DOG_BREEDS = "GET_ALL_DOG_BREEDS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TERMPERAMENTS";
export const GET_DOG_BREED_BY_ID = "GET_DOG_BREED_BY_ID";
export const ELIMINATE_DOG_BREED_BY_ID = "ELIMINATE_DOG_BREED_BY_ID";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_BY_CREATED = "FITLER_BY_CREATED";
export const FILTER_ALPHABETICALLY = "FILTER_ALPHABETICALLY";

export const getAllDogBreeds = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/dogs/")
      .then(({ data }) =>
        dispatch({ type: GET_ALL_DOG_BREEDS, payload: data })
      );
  };
};

export const getAllTemperaments = () => {
  return async (dispatch) => {
    const allTemperaments = await axios.get(
      "http://localhost:3001/temperament"
    );
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: allTemperaments.data,
    });
  };
};

export const getDogBreedsFiltered = (dog_breed) => {
  return async (dispatch) => {
    const dogBreedFiltered = await axios.get(
      `http://localhost:3001/dogs?name=${dog_breed}`
    );
    return dispatch({
      type: GET_DOG_BREEDS_FILTERED,
      payload: dogBreedFiltered.data,
    });
  };
};

export const filterByTemperaments = (selectedTemperament) => {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: selectedTemperament,
  };
};

export const getDogBreedById = (id) => {
  return async (dispatch) => {
    const dogBreedById = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOG_BREED_BY_ID,
      payload: dogBreedById.data,
    });
  };
};

export const eliminateDogBreedById = () => {
  return {
    type: ELIMINATE_DOG_BREED_BY_ID,
  };
};

export const postDogBreed = (createdDogBreed) => {
  return async () => {
    await axios.post("http://localhost:3001/dog", createdDogBreed);
  };
};

export const filterByWeight = (targetName) => {
  return {
    type: FILTER_BY_WEIGHT,
    payload: targetName,
  };
};

export const filterByCreated = (targetName) => {
  return {
    type: FILTER_BY_CREATED,
    payload: targetName,
  };
};

export const filterAlphabetically = () => {
  return {
    type: FILTER_ALPHABETICALLY,
  };
};
