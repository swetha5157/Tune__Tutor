const express = require('express')
const analyticsController=require('../controllers/analyticsController')
const router=express.Router();
const auth=require("../middlewares/auth")
router.get("/daily/",auth,analyticsController.getAnalyticsDaily);
router.get("/weekly",auth,analyticsController.getWeekly);
module.exports=router