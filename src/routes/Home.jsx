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
      <Cards/>
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