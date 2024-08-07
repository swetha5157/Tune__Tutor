/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';
import { incrementItem, decrementItem, removeFromCart } from '../redux/cartSlice';
import { useMemo } from 'react';
import { toggledItems,clearSelectedItems } from '../redux/selectedSlice';
const Cart = () => {
  const deliveryFee = 100;
  const yourCart = useSelector((state) => state.cart.items);
  const selectedItems=useSelector((state)=>state.readytobuy.items);
  const total = useMemo(() => {
    let sum = 0;
    yourCart.forEach((item) => {
      if(selectedItems.includes(item.id)){
      sum += item.quantity * item.pricing;
      }
    });
    sum = parseFloat(sum.toFixed(2)) +(selectedItems.length > 0 ? deliveryFee : 0);
    localStorage.setItem('totalAmount', sum);
    return sum;
  }, [yourCart,selectedItems]);

  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(incrementItem(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementItem(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
    dispatch(toggledItems(item.id));
  };

  const handleToggleItem=(id)=>{
    dispatch(toggledItems(id));
  }


  return (
    <div className="cartmain">
      {yourCart && yourCart.map((item) => (
        <div className="cardcart" key={item.id}>
          <input 
           type="checkbox"
           checked={selectedItems.includes(item.id)}
           onChange={()=>handleToggleItem(item.id)}
          ></input>
          <img className="cartimg" src={item.image_url} alt={item.name} />
          <div className="cartabt">
            <h2>{item.name}</h2>
            <h3>{item.category}</h3>
            <h3>💰: {item.pricing}</h3>
            <div className="incdec">
              <button onClick={() => handleDecrement(item)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button className="remove" onClick={() => handleRemove(item)}>
              <svg version="1.1" height={50} width={50} id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 108.29 122.88" style={{ }} xmlSpace="preserve">
                <g>
                  <path d="M77.4,49.1h-5.94v56.09h5.94V49.1L77.4,49.1L77.4,49.1z M6.06,9.06h32.16V6.2c0-0.1,0-0.19,0.01-0.29 c0.13-2.85,2.22-5.25,5.01-5.79C43.97-0.02,44.64,0,45.38,0H63.9c0.25,0,0.49-0.01,0.73,0.02c1.58,0.08,3.02,0.76,4.06,1.81 c1.03,1.03,1.69,2.43,1.79,3.98c0.01,0.18,0.02,0.37,0.02,0.55v2.7H103c0.44,0,0.75,0.01,1.19,0.08c2.21,0.36,3.88,2.13,4.07,4.37 c0.02,0.24,0.03,0.47,0.03,0.71v10.54c0,1.47-1.19,2.66-2.67,2.66H2.67C1.19,27.43,0,26.23,0,24.76V24.7v-9.91 C0,10.64,2.04,9.06,6.06,9.06L6.06,9.06z M58.07,49.1h-5.95v56.09h5.95V49.1L58.07,49.1L58.07,49.1z M38.74,49.1H32.8v56.09h5.95 V49.1L38.74,49.1L38.74,49.1z M10.74,31.57h87.09c0.36,0.02,0.66,0.04,1.03,0.1c1.25,0.21,2.4,0.81,3.27,1.66 c1.01,1,1.67,2.34,1.7,3.83c0,0.31-0.03,0.63-0.06,0.95l-7.33,78.66c-0.1,1.03-0.27,1.95-0.79,2.92c-1.01,1.88-2.88,3.19-5.2,3.19 H18.4c-0.55,0-1.05,0-1.59-0.08c-0.22-0.03-0.43-0.08-0.64-0.14c-0.31-0.09-0.62-0.21-0.91-0.35c-0.27-0.13-0.52-0.27-0.78-0.45 c-1.51-1.04-2.51-2.78-2.69-4.72L4.5,37.88c-0.02-0.25-0.04-0.52-0.04-0.77c0.05-1.48,0.7-2.8,1.7-3.79 c0.88-0.86,2.06-1.47,3.33-1.67C9.9,31.59,10.34,31.57,10.74,31.57L10.74,31.57z M97.75,36.9H10.6c-0.57,0-0.84,0.1-0.79,0.7 l7.27,79.05h0l0,0.01c0.03,0.38,0.2,0.69,0.45,0.83l0,0l0.08,0.03l0.06,0.01l0.08,0h72.69c0.6,0,0.67-0.84,0.71-1.28l7.34-78.71 C98.53,37.04,98.23,36.9,97.75,36.9L97.75,36.9z"/>
                </g>
              </svg>
            </button>
          </div>
        </div> 
      ))}
      <div className='checkout'>
        <h3 className='head'>Price Details</h3>
        <h3>Subtotal:₹{total - (selectedItems.length>0?deliveryFee:0)}</h3>
        <h4>{`${yourCart.length} ${yourCart.length === 1 ? 'item' : 'items'}`}</h4>
        <h3>Delivery fees:₹{selectedItems.length>0?deliveryFee:0}</h3>
        <h2>Total:₹{total}</h2>
        <Link to={{ pathname: "/pay", state: { total } }}>
        <button disabled={selectedItems.length===0}>Checkout</button></Link>
      </div>
    </div>
  );
};

export default Cart;
