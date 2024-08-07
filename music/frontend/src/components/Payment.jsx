import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToOrder } from "../redux/orderSlice";
import { clearSelectedItems } from "../redux/selectedSlice";
import { removeFromCart } from "../redux/cartSlice";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const payCart = useSelector((state) => state.cart.items);
    const selectedItems = useSelector((state) => state.readytobuy.items);
    const total = parseFloat(localStorage.getItem('totalAmount')) || 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        const orderedItems = payCart.filter(item => selectedItems.includes(item.id));

        // Dispatch actions to add order and clear selected items
        dispatch(addToOrder(orderedItems));
        dispatch(clearSelectedItems()); // Uncomment this if you want to clear selected items
        orderedItems.forEach(item => dispatch(removeFromCart(item)));

        // Navigate to orders page
        navigate('/orders');
    };

    return (
        <div className="payform">
            <form className="pay" onSubmit={handleSubmit}>
                <div className="card">
                    <input type="text" placeholder="Enter name as on Card" required />
                    <input type="number" placeholder="Card number" required />
                    <input type="number" placeholder="CVV" required />
                    <input type="text" placeholder="Expiry" required />
                </div>
                <div className="add">
                    <input type="text" placeholder="State Address" required />
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="State/Province" required />
                    <input type="number" placeholder="PINCODE" required />
                </div>
                <h2>Total Amount: ₹{total}</h2>
                <button type="submit">Pay</button>
            </form>
        </div>
    );
}

export default Payment;
