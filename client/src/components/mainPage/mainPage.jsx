import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import DogBreedCard from "../dogBreedCard/dogBreedCard";
import { getAllDogBreeds,getDogBreedsFiltered,getAllTemperaments, filterByTemperaments, filterAlphabetically, filterByCreated, filterByWeight } from "../../redux/actions";
import { Link } from "react-router-dom";
import Paginated from "../Paginated/Paginated";
import "./mainPage.css"


export default function MainPage () {
  const checkboxFalse = {
    highestMaxWeight:false,
    lowestMaxWeight:false,
    created:false,
    existing:false,
    alphabetically: false,
  }
  const paginated = (numberPage) =>{
    setCurrentPage(numberPage)
  }
  const [input,setInput] = useState("")
  const [currentPage,setCurrentPage] = useState(1)
  const [selected,setSelected] = useState("Select temperament...")
  const [checkbox,setCheckbox] = useState(checkboxFalse)
  const {dogsShowing, temperaments,allDogBreeds} = useSelector(state => state)
  const dispatch = useDispatch();
  const cardsPerPage = 8
  const lastCard = currentPage * cardsPerPage
  const firstCard = lastCard - cardsPerPage
  const currentDogsShowing = dogsShowing.slice(firstCard,lastCard)

  useEffect(()=>{
    dispatch(getAllDogBreeds())
    dispatch(getAllTemperaments())
  },[dispatch])

  const handleInputChange = (e => {setInput((e.target.value));dispatch(getDogBreedsFiltered(e.target.value)); setCheckbox(checkboxFalse); setSelected("None")} )


  const handleSelectedTemperaments = (e => {
    setSelected(e.target.value)
    setCheckbox(checkboxFalse)
    setCurrentPage(1)
    setInput("")
    dispatch(filterByTemperaments(e.target.value))}
  )

  const handleCheckbox = (e => {
    if(!e.target.checked) return setCheckbox({...checkbox,[e.target.name]: false})
    if(e.target.name === "highestMaxWeight" && e.target.checked) {
      setCheckbox({...checkbox,lowestMaxWeight: false,alphabetically: false, highestMaxWeight: true})
      return dispatch(filterByWeight(e.target.name))
  }
    if(e.target.name === "lowestMaxWeight" && e.target.checked){
      setCheckbox({...checkbox,highestMaxWeight: false,alphabetically: false, lowestMaxWeight: true})
      return dispatch(filterByWeight(e.target.name));
  }
  if(e.target.name === "alphabetically") {
    setCheckbox({...checkbox,lowestMaxWeight: false,highestMaxWeight: false,alphabetically: true})
    return dispatch(filterAlphabetically())
  }
  setInput("");setSelected("None")
    if(e.target.name === "created")  {
      setCurrentPage(1)
      setCheckbox({...checkbox,existing: false, created: true})
      return dispatch(filterByCreated(e.target.name))
  }
    if(e.target.name === "existing") { 
      setCurrentPage(1)
      setCheckbox({...checkbox,created: false, existing: true})
      return dispatch(filterByCreated(e.target.name))
    }
  })


  return (
    <div className="mainPage">
      <header className="header">
        <Link className="link" to="/home/createDogBreed">Create your dog breed</Link>
        <div className="filtersContainer">
          <div className="search">
            <input className="inputSearch" type="text" value={input} placeholder="Search dog breed..." onChange={e => handleInputChange(e)} />
          </div>
          <div className="selectContainer">
            <select value={selected} className="select" onChange={(e) => handleSelectedTemperaments(e)} >
              <option  hidden>Select temperament...</option>
              <option className="deselectSelect">None</option>
              {temperaments && temperaments.map( t => {return(<option key={t.id}>{t.name}</option>)})}
            </select>
          </div>
        </div>
        <p className="title">Dog breeds <br/>App</p>
      </header>
      <section className="cardsAndOrder">
        <div className="order">
          <p className="orderTitle">Order by</p>
          <section className="orderContainer">
              <div className="checkbox">
                <label >Alphabetically</label>
                <input name="alphabetically" type="checkbox" checked={checkbox.alphabetically} onChange={e => handleCheckbox(e)}/>
              </div>
              <div className="checkbox">
                <label >Highest max weight</label>
                <input name="highestMaxWeight"  type="checkbox" checked={checkbox.highestMaxWeight} onChange={e => handleCheckbox(e)} />
              </div>
              <div className="checkbox">
                <label >Lowest max weight</label>
                <input name="lowestMaxWeight" type="checkbox" checked={checkbox.lowestMaxWeight} onChange={e => handleCheckbox(e)} />
              </div>
              <div className="checkbox">
                <label >Created</label>
                <input name="created"  type="checkbox" checked={checkbox.created} onChange={e => handleCheckbox(e)}/>
              </div>
              <div className="checkbox">
                <label >Existing</label>
                <input name="existing" type="checkbox" checked={checkbox.existing} onChange={e => handleCheckbox(e)} /><br />
              </div>
          </section>
        </div>
        <div className="dogBreedsShowing">
          {allDogBreeds?.length? currentDogsShowing?.length? currentDogsShowing.map(
            d =>{return(<div className="dogBreedCard" key={d.id}>
            <DogBreedCard id={d.id} dog_breed={d.dog_breed} temperament={d.temperaments? d.temperaments : d.temperament} img={d.image} weight_max={d.weight_max} weight_min={d.weight_min}/>
            </div>) }) :<div className="notFound">Dog breed not found</div> :<div className="loading"></div>}
        </div>
      </section>
      <section className="paginated">
        <Paginated dogsShowing={dogsShowing.length} paginated={paginated} cardsPerPage={cardsPerPage}></Paginated>
      </section>
    </div>
  );
}

