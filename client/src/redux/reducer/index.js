import {
  ELIMINATE_DOG_BREED_BY_ID,
  FILTER_ALPHABETICALLY,
  FILTER_BY_CREATED,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_WEIGHT,
  GET_ALL_DOG_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_DOG_BREEDS_FILTERED,
  GET_DOG_BREED_BY_ID,
} from "../actions";

const initialState = {
  allDogBreeds: [],
  dogsShowing: [],
  temperaments: [],
  dogBreedById: {},
};
const someTrue = (e) => e === true;
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOG_BREEDS:
      return {
        ...state,
        allDogBreeds: action.payload,
        dogsShowing: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DOG_BREEDS_FILTERED:
      return {
        ...state,
        dogsShowing: action.payload,
      };
    case FILTER_BY_TEMPERAMENTS:
      const dogBreedsFilteredByTemperament = state.allDogBreeds.filter(
        (dog_breed) => {
          const isCreated = dog_breed.temperaments?.length;
          if (!isCreated) {
            return dog_breed.temperament?.includes(action.payload);
          }
          const found = dog_breed.find(
            (temperament) => temperament.name === action.payload
          );
          return found ? true : false;
        }
      );
      return {
        ...state,
        dogsShowing:
          action.payload !== "None"
            ? dogBreedsFilteredByTemperament
            : state.allDogBreeds,
      };
    case GET_DOG_BREED_BY_ID:
      return {
        ...state,
        dogBreedById: action.payload,
      };
    case ELIMINATE_DOG_BREED_BY_ID:
      return {
        ...state,
        dogBreedById: {},
      };
    case FILTER_BY_WEIGHT:
      const dogsShowingFilterByWeight =
        action.payload === "lowestMaxWeight"
          ? state.dogsShowing.sort((a, b) => a.weight_max - b.weight_max)
          : state.dogsShowing.sort((a, b) => b.weight_max - a.weight_max);
      return {
        ...state,
        dogsShowing: dogsShowingFilterByWeight,
      };
    case FILTER_BY_CREATED:
      const dogBreedsShowingFilterByCreated = () => {
        if (action.payload === "created")
          return state.allDogBreeds.filter(
            (dog_breed) => dog_breed.temperaments?.length
          );
        return state.allDogBreeds.filter(
          (dogBreed) => dogBreed.temperament?.length > 0
        );
      };
      const dogBreedsToShow = dogBreedsShowingFilterByCreated();
      return {
        ...state,
        dogsShowing: dogBreedsToShow,
      };
    case FILTER_ALPHABETICALLY:
      const dogsShowingAlphabetically = state.dogsShowing.sort((a, b) =>
        a.dog_breed.toUpperCase().localeCompare(b.dog_breed.toUpperCase())
      );
      return {
        ...state,
        dogsShowing: dogsShowingAlphabetically,
      };
    default:
      return state;
  }
};
export default rootReducer;
