const express=require('express');
const userController=require("../controllers/userController")
const router=express.Router();
router.get("/",userController.getUsers)
router.put("/",userController.updateUser)
router.delete("/",userController.deleteUser)


// login route
router.post("/login",userController.login)
//register
router.post("/register",userController.signup)

module.exports=router