import { useSelector } from "react-redux";

const Orders = () => {
    const finalOrder = useSelector((state) => state.order.items);
    console.log(finalOrder)

    return (
        <div style={color:}>
            <h1>Order Summary</h1>
            {finalOrder.length > 0 ? (
                <ul>
                    {finalOrder.map((item) => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>Category: {item.category}</p>
                            <p>Price: ₹{item.pricing}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default Orders;
