const WishList = require("../models/wishlistModel");
const Instrument = require("../models/instrumentModel");

exports.toggleWishlist = async (req, res) => {
    const { user_id } = req.user;
    const product_id = req.params.id;

    try {
        let wishlist = await WishList.findOne({ user_id });
        if (!wishlist) {
            // If no wishlist exists, create one and add the product
            wishlist = new WishList({
                user_id,
                products: [{ product_id }]
            });
            await wishlist.save();
            return res.status(200).json({ message: "Product added to wishlist", wishlist });
        } else {
            const productIndex = wishlist.products.findIndex(
                (prod) => prod.product_id === product_id
            );

            if (productIndex !== -1) {
                // If the product exists in the wishlist, remove it
                wishlist.products.splice(productIndex, 1);

                // If the wishlist becomes empty, delete the wishlist document
                if (wishlist.products.length === 0) {
                    await wishlist.deleteOne({ user_id });
                    return res.status(200).json({ message: "Wishlist deleted successfully." });
                } else {
                    await wishlist.save();
                    return res.status(200).json({ message: "Product removed from wishlist", wishlist });
                }
            } else {
                // If the product does not exist in the wishlist, add it
                wishlist.products.push({ product_id });
                await wishlist.save();
                return res.status(200).json({ message: "Product added to wishlist", wishlist });
            }
        }
    } catch (error) {
        console.error('Error in toggleWishlist:', error);
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.getWishList = async (req, res) => {
    const { user_id } = req.user;

    try {
        const wishlist = await WishList.findOne({ user_id });
        if (!wishlist) return res.status(404).json("Wishlist not found");

        const wishItems = await Promise.all(
            wishlist.products.map(async (prod) => {
                const wishlistDetails = await Instrument.findOne({
                    id: prod.product_id
                });
                return {
                    product_id: wishlistDetails.id,
                    name: wishlistDetails.name,
                    description: wishlistDetails.description,
                    price: wishlistDetails.pricing,
                    image: wishlistDetails.image_url,
                    quantity: prod.quantity
                };
            })
        );
        res.status(200).json({ wishItems });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error", error: e });
    }
};

exports.deleteWishlist = async (req, res) => {
    const { user_id } = req.user;
    const product_id = req.params.id;

    try {
        const wishlist = await WishList.findOne({ user_id });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        const productIndex = wishlist.products.findIndex(
            (product) => product.product_id === product_id
        );
        if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

        wishlist.products.splice(productIndex, 1);

        if (wishlist.products.length === 0) {
            await wishlist.deleteOne({ user_id });
            return res.status(200).json({ message: "Wishlist deleted successfully." });
        }

        await wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist successfully" });
    } catch (error) {
        console.error('Error in deleteWishlist:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
