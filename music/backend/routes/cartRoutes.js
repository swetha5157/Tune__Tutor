const express = require('express')
const cartController=require('../controllers/cartController')
const router=express.Router();
const auth=require("../middlewares/auth")

router.post("/",auth,cartController.createCart)
module.exports=router