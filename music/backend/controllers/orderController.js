const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Instrument=require("../models/instrumentModel");
const {generateEmailBody} =require("../nodemailer/mailTemplate");
const {sendEmail}=require("../nodemailer/mailer");
exports.createOrder = async (req, res) => {
    console.log("Received order data:", req.body);
    const { user_id } = req.user;
    const { user_email, username, address, phoneno, selectedItems } = req.body;

    try {
        // Ensure selectedItems is provided
        if (!selectedItems || !Array.isArray(selectedItems) || selectedItems.length === 0) {
            return res.status(400).json({ message: "No items selected for checkout" });
        }

        // Check if a cart exists for the user
        const cart = await Cart.findOne({ user_id });

        // Ensure the cart exists and contains products
        if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty or products are missing" });
        }

        // Filter only the selected items
        const products = cart.products
            .filter(item => selectedItems.includes(item.product_id))
            .map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
            }));

        if (products.length === 0) {
            return res.status(400).json({ message: "No items selected for checkout" });
        }

        // Calculate total amount
        let totalAmount = 0;
        const detailedProducts = await Promise.all(
            products.map(async (p) => {
                const productDetails = await Instrument.findOne({ id: p.product_id });
                if (!productDetails) {
                    throw new Error(`Product with ID ${p.product_id} not found`);
                }
                totalAmount += productDetails.pricing * p.quantity;
                return {
                    product_id: productDetails.id,
                    name: productDetails.name,
                    price: productDetails.pricing,
                    quantity: p.quantity,
                };
            })
        );

        // Create a new Order
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

        // Update the cart after removing the selected items
        cart.products = cart.products.filter(item => !selectedItems.includes(item.product_id));
        await cart.save();

        // Send email with all products' details
        const emailContent = generateEmailBody({
            products: detailedProducts,
            totalAmount: totalAmount + 100, // Include additional charges if needed
            deliveryDate: newOrder.deliveryDate.toDateString(),
        }, "CHECKOUT_CONFIRMATION");

        await sendEmail(emailContent, user_email);

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
