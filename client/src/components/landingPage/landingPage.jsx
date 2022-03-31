import { Link } from "react-router-dom";
import "./landingPage.css"
import imagen1 from "./imagen1.png"

export default function LandingPage() {
  return (

  <div className="containerLandingPage">
    <div className="background">
      <div className="containerTitlebtn">
        <p className="title">Dog breeds <br/> App</p>
        <Link className="a" to={"/home"}>
          Let's see some dog breeds!
        </Link>
      </div>
      <img className="img" alt= "" src={imagen1}></img>
    </div>
  </div>

  );
}
