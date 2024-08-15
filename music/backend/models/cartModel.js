const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products:[
        {
            product_id:String,
            quantity:Number,
        }
    ]
})

const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;