const express = require('express');
const router = express.Router();

const {checkOut,getMyOrders,getAllOrders,updateOrderStatus} = require('../controllers/orderController');
const {protect} = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');

router.post('/checkout',protect,checkOut);
router.get('/my-orders',protect,getMyOrders);
router.get('/',protect,adminOnly,getAllOrders);
router.put('/:orderId/status',protect,adminOnly,updateOrderStatus);

module.exports = router;