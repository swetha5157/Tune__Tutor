/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import {useSelector} from "react-redux"
import cartImage from '../assets/shopping-cart.png'; 
const Header = ({cartItem}) => {
  const cartInstruments=useSelector((state)=>state.cart.items);
  const totalInstruments=cartInstruments.reduce((total,item)=>total+item.quantity,0);
  console.log(cartInstruments)
  return (
    <>
      
      <nav className="navi">
        <h3>Logo</h3>
      <div className="items">
      <Link style={{color:"white",textDecoration:"none"}} to="/about"><h3>About</h3></Link>
      <Link style={{color:"white",textDecoration:"none"}} to="/product"><h3>Products</h3></Link>
      <Link style={{color:"white",textDecoration:"none"}} to="/learn"><h3>Learn</h3></Link>
      <Link style={{color:"#66fcf1",textDecoration:"none"}} to="/cart">
      
      <button>
        {/* Cart:{cartItem.length} */}
        {/* Cart: {cartInstruments.length} */}
       <img src={cartImage} height="30px" width="30px"  style={{ filter: 'invert(1)' }} ></img>
        </button>
       <span>{totalInstruments}</span>
     
      </Link>
      </div>
      </nav>
    </>
  )
}

export default Header
