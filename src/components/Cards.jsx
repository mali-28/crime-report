import { NavLink } from "react-router-dom";
import "./card.css"
const Cards = (props) => {
    return <>
            
        <div className="card-wrap">
            <div className={`card-header ${props.style}`}>
                <i className={props.icon}></i>
            </div>
            <div className="card-content">
                <h1 className="card-title">{props.title}</h1>
                <p className="card-text">{props.des}</p>
                <NavLink to="/case"> <button className={`card-btn  ${props.style}`}>{props.text}</button></NavLink>
            </div>
        </div>
        
    
</>
}
export default Cards;