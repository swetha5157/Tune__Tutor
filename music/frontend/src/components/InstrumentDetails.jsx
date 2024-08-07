import {useParams,Link} from "react-router-dom"
import {instruments} from '../data'
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import '../App.css'; 
const InstrumentDetails = () => {
    const {productId}=useParams();
    const item = instruments.find(product => product.id === Number(productId));
    console.log('Item:', item); 
    const dispatch = useDispatch();
    const itemsInCart = useSelector((state) => state.cart.items);
    const addReduxCart = (id) => {
      const instrument = instruments.find((instrument) => instrument.id === id);
      dispatch(addToCart(instrument));
      console.log('Added to cart:', instrument);
    };
  
    const isInCart = (id) => {
      return itemsInCart.some((item) => item.id === id);
    }; 
  return (

    <>
        <div className="pro-det" key={item.id}>
    <div className="pro-img-container">
        <img className="pro-img" src={item.image_url} alt={item.name} />
    </div>
    <div className="pro-abt">
        <h2>{item.name}</h2>
        <h3>{item.category}</h3>
        <p>{item.description}</p>
        <h5>₹ {item.pricing}</h5>
        <div className="rev-rat">
            <h3>🌟: {item.rating}</h3>
            <h3>🔖: {item.review_count}</h3>
        </div>
    </div>
    {isInCart(item.id) ? (
        <Link to="/cart">
            <button className="goto">
                <img src="../assets/bulk-buying.png" height={40} width={40} alt="Cart" />
            </button>
        </Link>
    ) : (
        <button className="redux" onClick={() => addReduxCart(item.id)}>
            <img src="src/assets/shopping-cart.png" height={40} width={40} alt="Add to Cart" />
        </button>
    )}
</div>

       
    </>
  )
}

export default InstrumentDetails
