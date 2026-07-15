const express = require('express');
const router = express.Router();

const {createProduct,getProducts,getSingleProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const {protect} = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');

router.post('/',protect,adminOnly,createProduct);
router.put('/:id',protect,adminOnly,updateProduct);
router.delete('/:id',protect,adminOnly,deleteProduct);
router.get('/',getProducts);
router.get('/:id',getSingleProduct);

module.exports = router;