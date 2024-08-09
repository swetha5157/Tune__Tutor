const express = require('express')
const wishlistController=require('../controllers/wishlistController')
const router=express.Router();
const auth=require("../middlewares/auth")

router.post("/:id",auth,wishlistController.createWishlist)
router.delete("/:id",auth,wishlistController.deleteWishlist);
router.get("/",auth,wishlistController.getWishList);

module.exports=router