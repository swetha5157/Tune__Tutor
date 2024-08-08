const express = require('express')
const cartController=require('../controllers/cartController')
const router=express.Router();
const auth=require("../middlewares/auth")

router.post("/",auth,cartController.createCart)
router.get("/",auth,cartController.getCart);
module.exports=router