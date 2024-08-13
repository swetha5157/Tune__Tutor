const express=require("express");
const router = express.Router();
const emailController=require( "../controllers/emailController")

router.post('/sendemail', emailController.sendNotification);

module.exports=router