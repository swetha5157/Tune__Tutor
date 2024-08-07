const Cart=require("../models/cartModel");

exports.createCart=async(req,res)=>{
    const {user_id}=req.user;
    const {product_id,quantity}=req.body;
    try{
    let cart=await Cart.findOne({user_id})

    if(!cart){
        const newCart=new Cart({
            user_id,
            products:[
                {
                    product_id,quantity,
                },
            ],
        });
        await newCart.save();
        return res.status(200).json("Cart added successfully");
    }
  
    const existingProduct=cart.products.find((prod)=>prod.product_id===product_id);
    if(!existingProduct){
        const newProduct=cart.products;
        newProduct.push({product_id,quantity})
        const newCart=new Cart({
            user_id,
            products:newProduct,
        });
        await newCart.save();
       return res.status(200).json("Product added to cart");
    }else{
        existingProduct.quantity = quantity;
        await cart.save();
        return res.status(200).json("Product quantity updated in cart");
    }
}catch(e){
    console.error("Error in createCart:", e);
    return res.status(500).json("Server error");
}
    
}