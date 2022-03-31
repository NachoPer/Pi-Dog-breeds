import {  useNavigate } from "react-router-dom"

export default function NotFound(){
const navigate = useNavigate()
const handleOnClick = () => navigate("/")
    return( 
    <div>
        <h2>Page not found</h2>
        <button onClick={(e) => handleOnClick(e)}>Go to landing page</button>
    </div>
    )}