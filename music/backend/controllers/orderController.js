const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Instrument=require("../models/instrumentModel");
exports.createOrder = async (req, res) => {
    const { user_id } = req.user;
    const { user_email, username, address, phoneno, selectedItems } = req.body;

    try {
        //to check whether a cart is present to select the checkout order items
        const cart = await Cart.findOne({ user_id });

        //if a cart is empty say there is no cart
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        //to filter only the selected items sent throught the body
        const products = cart.products
            .filter(item => selectedItems.includes(item.product_id))
            .map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
            }));

        if(products.length === 0){
            return res.status(400).json({ message: "No items selected for checkout" });
        }

        // else create a new Order with the selected items 
        const newOrder = new Order({
            user_id,
            user_email,
            username,
            address,
            phoneno,
            products,
            orderedDate: new Date(),
            deliveryDate: new Date(new Date().setDate(new Date().getDate() + 10)), 
        });

        const savedOrder = await newOrder.save();

        //save the cart after removing the selected items rom the cart
        cart.products = cart.products.filter(item => !selectedItems.includes(item.product_id));
        await cart.save();

        res.status(201).json({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
};



exports.getOrder = async (req, res) => {
    const { user_id } = req.user;  

    try {
        const orders = await Order.find({ user_id });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        const orderDetails = await Promise.all(
            orders.map(async (order) => {
                const detailedProducts = await Promise.all(
                    order.products.map(async (p) => {
                        const productDetails = await Instrument.findOne({ id: p.product_id });

                        return {
                            product_id: productDetails.id,
                            name: productDetails.name,
                            price: productDetails.pricing,
                            quantity: p.quantity,
                        };
                    })
                );

                return {
                    order_id: order._id,  
                    products: detailedProducts,
                    orderedDate: order.orderedDate,
                    deliveryDate: order.deliveryDate,
                };
            })
        );
        res.status(200).json({
            user: {
                user_id,
                orders: orderDetails,
            },
        });
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
