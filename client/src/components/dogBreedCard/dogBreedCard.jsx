import React from "react";
import "./dogBreedCard.css"
import { Link } from "react-router-dom";

export default function DogBreedCard({dog_breed,temperament,weight_max,weight_min,img,id}) {
  return (
    <div className="card">
      <div className="cardTitle">
        Dog breed: {dog_breed}
      </div>
      <div className="cardImage">
        <img alt="" src={img}/>
      </div>
      <div>
        <div className="temperamentTitle">
          Temperament
        </div>
        <ul className="temperamentUl">
          {temperament && temperament[0].hasOwnProperty("name")? temperament.map(
            t =>{ return(
              <li className="temperamentLi" key={id + dog_breed + t.name}>{t.name}</li>
              )}) 
              :temperament && temperament.map(
              t =>{ return(
              <li className="temperamentLi" key={id + dog_breed + t}>{t}</li>
          )})}
        </ul>
      </div>
      <div >
        <div className="weightTitle">Weight</div>
        <div className="cardWeight">
          <div className="weightContainer">
            <div className="weight">Min</div>
            <div className="number">{weight_min? `${weight_min}kg` : "unkown"}</div>
          </div>
          <div className="weightContainer">
            <div className="weight">Max</div>
            <div className="number">{weight_max? `${weight_max}kg` : "unkown"}</div>
          </div>
        </div>
      </div>
      <div className="cardMoreInfo">
        <Link to={`/dogBreedDetail/${id}`}>
          <button className="btn">More information</button>
        </Link>
      </div>
    </div>
  );
}