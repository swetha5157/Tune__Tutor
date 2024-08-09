const WishList = require("../models/wishlistModel");
const Instrument = require("../models/instrumentModel");

exports.createWishlist = async(req,res) => {
    const {user_id} = req.user;
    const product_id = req.params.id;
    
    try{
    let wishlist = await WishList.findOne({user_id});
    
    if(!wishlist){
        wishlist = new Wishlist({
            user_id,
            products: [{product_id}]
        })
    }
    else{
    const productIndex = wishlist.products.findIndex(
        (prod) => prod.product_id === product_id
    );
    if (productIndex !== -1) {
        return res.status(401).json({ message: 'Product already exists in wishlist' });
    }

    wishlist.products.push({product_id})
}

    await wishlist.save();
    return res.status(200).json({ message: "Product added to wishlist", wishlist});

} catch(error){
	return res.status(500).json({message: "Server Error",error})
}

}

exports.getWishList=async(req,res)=>{
    const {user_id}=req.user;
    const wishlist=await WishList.findOne({user_id});
    if(!wishlist)return res.status(404).json("Wishlist not found")
    try{
     const WishItems=await Promise.all(
        wishlist.products.map(async(prod)=>{
            const wishlistDetails=await Instrument.findOne({
                id:prod.product_id
            });
            return{
                product_id: wishlistDetails.id,
					name: wishlistDetails.name,
					description: wishlistDetails.description,
					price: wishlistDetails.pricing,
					image: wishlistDetails.image_url,
					quantity: prod.quantity
            }
        })
     )
     res.status(200).json({wishItems : WishItems})

}catch(e){
    console.log(e)
}
}

exports.deleteWishlist = async(req,res) => {

    const {user_id} = req.user;
    const product_id = req.params.id;

    try{

        const wishlist = await WishList.findOne({user_id})
        if(!wishlist)
            res.status(404).json({message:"Wishlist not found"})

        const product = wishlist.products.find(
            (product) => product.product_id === product_id)
        if(!product)
            return res.status(404).json({message:"Product not found"})

        if(wishlist.products.length <= 1){
            await wishlist.deleteOne({user_id})
            return res.status(200).json({message: "Wishlist deleted successfully."})
        }
        else{
        const product = wishlist.products.filter(
                (product) => product.product_id !== product_id
            )
        wishlist.products=product
        await wishlist.save();
        res.status(200).json({message: "Product removed from wishlist successfully"})
        }
    } 
    catch(error){
        res.status(500).json({message:"Server error"})
    }
}