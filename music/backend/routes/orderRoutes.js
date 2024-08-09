const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Adjust the path as necessary
const auth=require("../middlewares/auth")
// Create a new order with selected items
router.post('/', auth,orderController.createOrder);
router.get('/:user_id',auth,orderController.getOrder);
module.exports = router;