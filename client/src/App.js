import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import MainPage from "./components/mainPage/mainPage";
import DogBreedDetail from "./components/dogBreedDetail/dogBreedDetail";
import CreateDogBreed from "./components/createDogBreed/createDogBreed";
import NotFound from "./components/notFound/notFound";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<MainPage />} />
        <Route exact path="/home/createDogBreed" element={<CreateDogBreed />} />
        <Route
          path="/dogBreedDetail/:dogBreedId"
          element={<DogBreedDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
