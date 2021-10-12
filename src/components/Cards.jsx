import "./card.css"
const Cards = () => {
    return <>

        <div className="card-main">
            <div className="card-wrap">
            <div class="card-header one">
                <i class="fas fa-code"></i>
            </div>
            <div class="card-content">
                <h1 class="card-title">Title</h1>
                <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <button class="card-btn one">code</button>
            </div>
        </div>
        <div className="card-wrap">
            <div className="card-header two">
                <i className="fab fa-css3-alt"></i>
            </div>
            <div className="card-content">
                <h1 className="card-title">Title</h1>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <button className="card-btn two">css3</button>
            </div>
        </div>
        <div className="card-wrap">
            <div className="card-header three">
                <i className="fab fa-html5"></i>
            </div>
            <div className="card-content">
                <h1 className="card-title">Title</h1>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <button className="card-btn three">html5</button>
            </div>
        </div>
        <div className="card-wrap">
            <div className="card-header four">
                <i className="fab fa-js-square"></i>
            </div>
            <div className="card-content">
                <h1 className="card-title">Title</h1>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <button className="card-btn four">js</button>
            </div>
        </div>
        </div>
    
</>
}
export default Cards;