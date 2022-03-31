import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getAllTemperaments, postDogBreed } from "../../redux/actions"
import { validate } from "./validate"
import "./createDogBreed.css"

export default function CreateDogBreed() {
const [form,setForm] = useState({
    dog_breed:"",
    weight_max:"",
    weight_min:"",
    height_max:"",
    height_min:"",
    life_span_min:"",
    life_span_max:"",
    life_span:"",
    temperament:[],
})
const [errors,setErrors] = useState({})
const {temperaments} = useSelector(state => state)
const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {
    !temperaments.length && dispatch(getAllTemperaments())},[dispatch,temperaments.length]);


const handleInputChange = (e,t) => {
    if(e.target.name === "life_span_min"){ 
        setForm({
                ...form,
                [e.target.name]: parseInt(e.target.value),
    })
        setErrors(validate({
                [e.target.name]: parseInt(e.target.value),
                life_span_max: form.life_span_max
        }))
    }
    if(e.target.name === "life_span_max"){ 
            setForm({
                ...form,
                [e.target.name]: parseInt(e.target.value),
        })
            setErrors(validate({
                life_span_min: form.life_span_min,
                [e.target.name]: parseInt(e.target.value),
            }))
        }
    if(e.target.name === "dog_breed") {
        const dog_breed = (e.target.value).trim().replace(/\s{2,}/," ")
        setForm({
                ...form,
                dog_breed: dog_breed,
        })
        setErrors(validate({
                dog_breed: dog_breed
        }))}

    if(e.target.name === "temperament" && !form.temperament.includes(e.target.value) && e.target.value !== "Select temperaments..."){
        setForm({
                ...form,
                temperament: [...form.temperament, e.target.value]
        })
        setErrors(validate({
                temperament: [...form.temperament,e.target.value]
        }))}
        
    if(e.target.name === "weight_max" || e.target.name === "weight_min" || e.target.name === "height_min" || e.target.name === "height_max"){
        setForm({
            ...form,
            [e.target.name]: parseInt(e.target.value)
        })
        if(e.target.name === "weight_max" || e.target.name === "weight_min"){
            setErrors(validate({
                weight_max: form.weight_max,
                weight_min: form.weight_min,
                [e.target.name]: parseInt(e.target.value)
        }))}else           
            setErrors(validate({
            height_max: form.height_max,
            height_min: form.height_min,
            [e.target.name]: parseInt(e.target.value)}
        
        ))}

    if(t){
    const temperamentFiltered = form.temperament && form.temperament.filter(temp => temp !== t)
        setForm({
                ...form,
                temperament: temperamentFiltered
        })
        setErrors(validate({
                temperament: temperamentFiltered
        }))}
}

const handleOnBlur = (e) => { setForm({...form,life_span: `${form.life_span_min}-${form.life_span_max} years`})}
const handleSubmit = (e) => {
    e.preventDefault();
    const finalValidation = validate(form,true)
    setErrors(validate(form,true))
    if(!(Object.keys(finalValidation).length)){
    dispatch(postDogBreed(form))
    alert("Dog breed created");
    navigate("/home")
}
    else alert("Please check the errors")
}

    return(
        <div>
             <div className="create">
                 <header className="header">
                    <Link className="goHome" to="/home">Home</Link>
                    <p className="title">Create your dog breed!</p>
                 </header>
            {temperaments.length?
            <form autocomplete="off" className="form" onSubmit={e => handleSubmit(e)}>
                <div className="inputContainer">
                    <label className="label">Dog breed:</label>
                    <input className="input" id="dogBreed" placeholder="Dog breed name..." name="dog_breed" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div>
                    {errors.dog_breed && (<p className="error">{errors.dog_breed}</p>)}
                </div>
                <div className="inputContainer">
                    <label className="label">Min weight:</label>
                    <input className="input" placeholder="40" name="weight_min" onChange={(e) => handleInputChange(e)}></input>
                    <label className="label">kg</label>
                </div>
                <div>
                    {errors.weight_min && (<p className="error">{errors.weight_min}</p>)}
                </div>
                <div className="inputContainer">
                    <label className="label">Max weight:</label>
                    <input className="input" placeholder="45" name="weight_max" onChange={(e) => handleInputChange(e)}></input>
                    <label className="label">kg</label>
                </div>
                <div>
                    {errors.weight_max && (<p className="error">{errors.weight_max}</p>)}
                </div>
                <div className="inputContainer">
                    <label className="label">Min height:</label>
                    <input className="input" placeholder="30" name="height_min" onChange={(e) => handleInputChange(e)}></input>
                    <label className="label">cm</label>
                </div>
                <div>
                    {errors.height_min && (<p className="error">{errors.height_min}</p>)}
                </div>
                <div className="inputContainer">
                    <label className="label">Max height:</label>
                    <input className="input" placeholder="35" name="height_max" onChange={(e) => handleInputChange(e)}></input>
                    <label className="label">cm</label>
                </div>
                <div>
                    {errors.height_max && (<p className="error">{errors.height_max}</p>)}
                </div>
                <div className="inputContainer">
                    <label className="label">Life span min:</label>
                    <input className="input" placeholder="2" name="life_span_min" onBlur={handleOnBlur} onChange={(e) => handleInputChange(e)}></input>
                    <label className="label">years</label>
                </div>
                <div>
                    {errors.life_span_min && (<p className="error">{errors.life_span_min}</p>)}
                </div>
                <div className="inputContainer">
                    <label className="label">Life span max:</label>
                    <input className="input" placeholder="3" name="life_span_max" onBlur={handleOnBlur} onChange={(e) => handleInputChange(e)}></input>
                    <label className="label">years</label>
                </div>
                <div>
                    {errors.life_span_max && (<p className="error">{errors.life_span_max}</p>)}
                </div>
                <div className="selectContainer">
                    <select className="select" name="temperament" onChange={(e) => handleInputChange(e)} >
                        <option>Select temperament...</option>
                        {temperaments && temperaments.map(
                        t => { return (<option value={t.name} key={t.id} >{t.name}</option>)}
                        )}
                    </select>
                </div>
                <div>
                    {errors.temperament && (<p className="error">{errors.temperament}</p>)}
                </div>
                <div className="showTemperament">
                    <ul className="ul">
                        {form.temperament && form.temperament.map(t => {return(<div className="liTemperamentContainer"  key={t}>
                        <li className="liTemperament" >{t}</li>
                        <button className= "btnTemperament"onClick={e => handleInputChange(e,t)}>x</button>
                        </div>) } )}
                    </ul>   
                </div>
                <button className="btn">Create it!</button>
            </form>
             : <div className="loading"></div>}
            </div>

        </div>
    )
}