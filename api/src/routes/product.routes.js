const { Router } = require('express');
const { createProduct, updateProduct, removeProduct, getProduct, getProducts, getMyProducts } = require('../controllers/product.controllers');

const verifyToken = require('./verifyToken')

const router = Router();


router.post('/add', createProduct)

router.patch('/update', verifyToken, updateProduct)

router.delete('/remove/:id', verifyToken, removeProduct)

router.get('/getone/:id', verifyToken, getProduct)

router.get('/getall', verifyToken, getProducts)

router.get('/getmyproducts/:id', verifyToken, getMyProducts)

module.exports = router;