const Cart = require("../models/cartModel");
const Instrument = require("../models/instrumentModel");

exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, quantity } = req.body;
  try {
    
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      const newCart = new Cart({
        user_id,
        products: [
          {
            product_id,
            quantity,
          },
        ],
      });
      await newCart.save();
      return res.status(200).json("Cart added successfully");
    }

    const existingProduct = cart.products.find((prod) => prod.product_id === product_id);
    if (!existingProduct) {
      const newProduct = cart.products;
      newProduct.push({ product_id, quantity });
      const newCart = new Cart({
        user_id,
        products: newProduct,
      });
      await newCart.save();
      return res.status(200).json("Product added to cart");
    } else {
      existingProduct.quantity = quantity;
      await cart.save();
      return res.status(200).json("Product quantity updated in cart");
    }
  } catch (e) {
    console.error("Error in createCart:", e);
    return res.status(500).json("Server error");
  }
};

exports.getCart = async (req, res) => {
  const { user_id } = req.user;

  try {
    let subtotal=0;
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    const cartDetails = await Promise.all(
      cart.products.map(async (product) => {
        const productDetails = await Instrument.findOne({ id: product.product_id });
        subtotal+=productDetails.pricing*product.quantity;
        if (!productDetails) {
          throw new Error(`Product not found: ${product.product_id}`);
        }
        return {
          id: String(productDetails.id),
          name: productDetails.name,
          description: productDetails.description,
          image: productDetails.image_url,
          price: productDetails.pricing,
          quantity: product.quantity,
        };
      })
    );

    res.status(200).json({ cartDetails ,subtotal});
  } catch (e) {
    console.error("Error in getCart:", e);
    res.status(500).json("Server error");
  }
};
