const path = require('path');
const express = require('express');
const router = express.Router();
const { getProducts, addProduct, buyProduct, getProduct } = require('../controllers/products');

router.get('/getproducts', getProducts)
router.get('/getproduct', getProduct)
router.post('/addproduct', addProduct)
router.post('/buyproduct', buyProduct)

module.exports = router;