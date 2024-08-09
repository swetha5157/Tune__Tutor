const mongoose=require("mongoose")
const wishlistSchema=new mongoose.Schema({
    user_id:String,
    products:[{product_id:String}]

})

const WishList=mongoose.model("WishList",wishlistSchema);
module.exports=WishList;