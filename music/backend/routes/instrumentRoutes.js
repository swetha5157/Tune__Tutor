const express = require('express')
const instrumentController=require('../controllers/instrumentController')
const router=express.Router();
const auth=require("../middlewares/auth")

router.get("/",auth,instrumentController.getInstruments)
router.get("/:id",auth,instrumentController.getInstrumentById)
router.post("/",auth,instrumentController.createInstrument)
router.put("/:id",instrumentController.updateInstrument)
router.delete("/:id",instrumentController.deleteInstrument)
module.exports=router