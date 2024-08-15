const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Instrument = require("../models/instrumentModel");
const { generateEmailBody } = require("../nodemailer/mailTemplate");
const { sendEmail } = require("../nodemailer/mailer");

exports.createOrder = async (req, res) => {
    const { user_id } = req.user;
    const { user_email, username, address, phoneno, selectedItems } = req.body;
    console.log("---", req.body);
  
    try {
      if (!selectedItems || !Array.isArray(selectedItems) || selectedItems.length === 0) {
        return res.status(400).json({ message: "No items selected for checkout" });
      }
  
      const cart = await Cart.findOne({ user_id });
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
  
      // Extract product IDs from selectedItems to filter the cart products
      const selectedProductIds = selectedItems.map(item => item.product_id);
  
      const products = cart.products
        .filter(item => selectedProductIds.includes(item.product_id))
        .map(item => {
          const selectedItem = selectedItems.find(si => si.product_id === item.product_id);
          return {
            product_id: item.product_id,
            quantity: selectedItem ? selectedItem.quantity : item.quantity,
          };
        });
  
      if (products.length === 0) {
        return res.status(400).json({ message: "No items selected for checkout" });
      }
  
      let totalAmount = 0;
      const detailedProducts = await Promise.all(
        products.map(async (p) => {
          const productDetails = await Instrument.findOne({ id: p.product_id });
          if (!productDetails) throw new Error(`Product with ID ${p.product_id} not found`);
  
          totalAmount += productDetails.pricing * p.quantity;
          return {
            product_id: productDetails.id,
            name: productDetails.name,
            price: productDetails.pricing,
            quantity: p.quantity,
          };
        })
      );
  
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
  
      // Remove only the selected products from the cart
      cart.products = cart.products.filter(item => !selectedProductIds.includes(item.product_id));
      await cart.save();
  
      const emailContent = generateEmailBody({
        products: detailedProducts,
        totalAmount: totalAmount + 100,  // Add any additional charges here
        deliveryDate: newOrder.deliveryDate.toDateString(),
      }, "CHECKOUT_CONFIRMATION");
  
      await sendEmail(emailContent, user_email);
  
      res.status(201).json({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
      console.error("Error creating order:", error.message);
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
    console.log("From Orders BE")
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
