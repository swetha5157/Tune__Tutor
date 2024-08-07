import {ToastContainer} from 'react-toastify'
import './App.css';
import Instruments from './components/Instruments';
import Header from './components/Header';
import { useState } from 'react';
import About from './components/About';
import Cart from './components/Cart';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InstrumentDetails from './components/InstrumentDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Orders from './components/Orders'
import Landing from './components/Landing';
import LearnLanding from './components/LearnLanding';
import Payment from './components/Payment';
import MainCourse from './components/MainCourse';
function App() {
  const [cartItem, setCartItem] = useState([]);

  return (
    <BrowserRouter>
    <ToastContainer/>
    
      <>
        <Header cartItem={cartItem} />
        <Routes>
          <Route path="/product" element={<Instruments setCartItem={setCartItem} cartItem={cartItem} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<InstrumentDetails />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Landing/>}/>
          <Route path='/learn' element={<LearnLanding/>}/>
          <Route path='/learn/:learnId' element={<MainCourse/>}/>
          <Route path='/pay' element={<Payment/>}/>
          <Route path='/orders' element={<Orders/>}/>



        </Routes>
      </>
    
    </BrowserRouter>
  );
}

export default App;
