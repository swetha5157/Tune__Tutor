const express=require('express')
const mongoose=require('mongoose')
const app=express()
//middleware code line
app.use(express.json());
const instrumentRoutes=require("./routes/instrumentRoutes")
const userRoutes=require("./routes/userRoutes")
const cartRoutes=require("./routes/cartRoutes")

//mongo connect
mongoose.connect(
   // "mongodb+srv://swethasuresh799:Swetha@mern-project.bwolsuf.mongodb.net/tune_tutor"
   "mongodb://localhost:27017/e-commerce"
).then(
    ()=>{console.log("Connected to DB")}
).catch((e)=>console.log(e));
//defining routes for all the schemas
app.use('/instruments',instrumentRoutes);
app.use("/users",userRoutes);
app.use("/carts",cartRoutes);
app.listen(4000,()=>{
    console.log('App is running at port 4000');
});