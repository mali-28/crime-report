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
                <button className={`card-btn  ${props.style}`}>{props.text}</button>
            </div>
        </div>
        
    
</>
}
export default Cards;