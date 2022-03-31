import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getDogBreedById, eliminateDogBreedById } from "../../redux/actions"
import "./dogBreedDetail.css"

export default function DogBreedDetail(){
const dispatch = useDispatch()
const { dogBreedById } = useSelector(state => state)
const { dogBreedId }  = useParams()
useEffect(() => {dispatch(getDogBreedById(dogBreedId))
return dispatch(eliminateDogBreedById())}
, [dispatch,dogBreedId])

    return (
        <div className="detail">
          <div >
            <header className="header">
              <Link to="/home" className="headerTitle">Dog breeds <br/>App</Link>
            </header>
          {dogBreedById.hasOwnProperty("dog_breed")?
          <div>
            <h5 className="title">Dog breed: {dogBreedById.dog_breed}</h5>
            <section className="infoContainer">
              <div className="temperament">
                <div className="temperamentTitle">
                  Temperament
                </div>
                <ul className="temperamentUl">
                  {dogBreedById.temperament?.map(t =>{ return(
                  <li key={t + dogBreedById.id} className="temperamentLi" >{t}</li>
                  )})}
                </ul>
              </div>
              <div className="characteristicsContainer">
                <div className="characteristicsTitle">
                  Characteristics
                </div>
                <div className="numberContainer">
                  <p className="characteristic">Weight</p>
                  <p className="number">Max:{dogBreedById.weight_max? `${dogBreedById.weight_max}kg`: "unknown"} </p>
                  <p className="number">Min:{dogBreedById.weight_min? `${dogBreedById.weight_max}kg`: "unknown"} </p>
                </div>
                <div className="numberContainer">
                  <p className="characteristic">Height</p>
                  <p className="number">Max:{dogBreedById.height_max? `${dogBreedById.height_max}cm` : "unkown"}</p>
                  <p className="number">Min:{dogBreedById.height_min? `${dogBreedById.height_max}cm` : "unkown"}</p>
                </div>
                <div className="numberContainer">
                  <p className="characteristic">Life span</p>
                  <p className="number">{dogBreedById.life_span}</p>
                </div>
              </div>
              <div className="imgContainer">
                <img className="img" alt="" src={dogBreedById.image}/>
              </div>
            </section>
            </div>
            : <div className="loading"></div>}
          </div>
        </div>
    )
}