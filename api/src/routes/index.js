const { Router } = require('express');
const userRoutes = require("./user.routes.js")
const productRoutes = require("./product.routes.js")

const router = Router();


router.use('/user', userRoutes)

router.use('/product', productRoutes)


module.exports = router