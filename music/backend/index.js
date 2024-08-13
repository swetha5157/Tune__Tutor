const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const instrumentRoutes = require("./routes/instrumentRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const emailRoutes=require("./routes/emailRoutes");
const courseRoutes=require("./routes/courseRoutes")
const app = express();



// Middleware
app.use(express.json());

//cors middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}))

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/e-commerce")
    .then(() => { console.log("Connected to DB") })
    .catch((e) => console.log(e));

// Defining routes
app.use('/instruments', instrumentRoutes);
app.use("/users", userRoutes);
app.use("/carts", cartRoutes);
app.use("/wish", wishRoutes);
app.use("/order", orderRoutes);
app.use('/email', emailRoutes);
app.use('/courses', courseRoutes);


app.listen(4000, () => {
    console.log('App is running at port 4000');
});
