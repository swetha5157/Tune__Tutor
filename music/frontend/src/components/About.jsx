import Carousel from './Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
const About = () => {

  return (
    <>
      <Carousel />
      <div className='about'>
        <center><h1>MUSICAL INSTRUMENTS</h1></center>
        <hr></hr>
        <div className='bait'>
          <Link to="/product">{<div className='mi' id='one' ></div>}</Link>
          <Link to="/product">{<div className='mi'  id='two' ></div>}</Link>
          <Link to="/product">{<div className='mi' id='three' ></div>}</Link>
          <Link to="/product">{<div className='mi' id='four' ></div>}</Link>
          <Link to="/product">{<div className='mi' id='five' ></div>}</Link>
          <Link to="/product">{<div className='mi' id='six' ></div>}</Link>
        </div>
        <hr></hr>
        <center><h1 style={{color:'white'}}>Why scroll here??Visit the store</h1></center>
        <center><h1 style={{color:'white'}}>Explore the genre of instruments!!</h1></center>
        <Link to="/login"><button ><h2>CLICK HERE</h2></button></Link>
      </div>
    </>
  );
}

export default About;
