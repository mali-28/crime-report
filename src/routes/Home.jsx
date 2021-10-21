import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Cards from '../components/Cards';
import Slider from "../components/Carousel";
const Home = () => {
  const [num, setNum] = useState(1000000);
  const props = useSpring({ val: num, from: { val: 0 } });

  const randomNum = Math.floor(Math.random() * 1000000);

  return (
      <>
      <Slider/>
      <div className="card-main">
      <Cards title="Title1" style="one" icon="fas fa-code" des="Lorem Ipsum is simply dummy text of the printing and typesetting industry." text="complaint"/>
      <Cards title="Title2" style="two" icon="fab fa-css3-alt" des="Lorem Ipsum is simply dummy text of the printing and typesetting industry." text="lost"/>
      <Cards title="Title3" style="three" icon="fab fa-html5" des="Lorem Ipsum is simply dummy text of the printing and typesetting industry." text="crime"/>
      {/* <Cards title="Title4" style="four" icon="fab fa-js-square" des="Lorem Ipsum is simply dummy text of the printing and typesetting industry." text="js"/> */}
      </div>
      
    {/* <div className="App">
      <div className="card">
        <animated.div className="number">
          {props.val.interpolate(val => Math.floor(val))}
        </animated.div>
        <button onClick={() => setNum(randomNum)}>Random Number</button>
      </div>
    </div> */}
    </>
  );
};

export default Home;