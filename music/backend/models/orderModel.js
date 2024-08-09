const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique IDs
const Instrument =require("../models/instrumentModel.js")
const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        default: uuidv4, 
        unique: true,
        required: true,
    },
    user_id: String,
    user_email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
    },
    products: [{
        product_id: {
            type: String,
            ref: Instrument
        },
        quantity: {
            type: Number,
        },
    }],
    orderedDate: {
        type: Date,
        default: Date.now,
    },
    deliveryDate: Date,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
