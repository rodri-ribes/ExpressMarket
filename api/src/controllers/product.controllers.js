const Product = require('../models/Product')

const User = require('../models/User')


const createProduct = async (req, res) => {

    // const userIsLoggedIn = await User.findOne({ _id: req.userId })

    const { title, content, image, imageName, isNewProduct, price, category, datos, stock, user } = req.body
    console.log(title, content, image, imageName, isNewProduct, price, category, datos, stock, user)
    if (true) {
        const product = new Product({
            title,
            content,
            image,
            isNewProduct,
            imageName,
            price,
            category,
            datos,
            stock,
            user
        })

        await product.save()
        res.status(201).send('Product published successfully')

    } else {
        res.status(401).send('There was an error, please log in again')
    }
}

const removeProduct = async (req, res) => {

    const userIsLoggedIn = await User.findOne({ _id: req.userId })

    const { id } = req.params

    if (userIsLoggedIn) {

        await Product.deleteOne({ _id: id })

        res.status(201).send('Product deleted successfully')

    } else {
        res.status(401).send('There was an error, please log in again')
    }
}

const updateProduct = async (req, res) => {

    const userIsLoggedIn = await User.findOne({ _id: req.userId })

    const { id, title, content, image, price, category, datos, stock, user, comments } = req.body

    if (userIsLoggedIn) {

        let product = await Product.findOne({ _id: id })

        product = {
            title,
            content,
            image,
            price,
            category,
            datos,
            stock,
            user,
            comments
        }

        await product.save()

        res.status(201).send('Product upgraded successfully')

    } else {
        res.status(401).send('There was an error, please log in again')
    }
}

const getProduct = async (req, res) => {

    const userIsLoggedIn = await User.findOne({ _id: req.userId })

    const { id } = req.params

    if (userIsLoggedIn) {

        let product = await Product.find({ _id: id }).populate('user', {
            password: 0
        })

        res.status(201).json(product)

    } else {
        res.status(401).send('There was an error, please log in again')
    }
}

const getMyProducts = async (req, res) => {

    const userIsLoggedIn = await User.findOne({ _id: req.userId })

    const { id } = req.params

    if (userIsLoggedIn) {

        let products = await Product.find({ user: id })
        console.log(products)
        res.status(201).json(products)

    } else {
        res.status(401).send('There was an error, please log in again')
    }
}

const getProducts = async (req, res) => {

    const userIsLoggedIn = await User.findOne({ _id: req.userId })

    if (userIsLoggedIn) {

        let products = await Product.find({}).populate('user', {
            password: 0
        })

        res.status(201).json(products)

    } else {
        res.status(401).send('There was an error, please log in again')
    }
}


module.exports = {
    createProduct,
    removeProduct,
    updateProduct,
    getProduct,
    getProducts,
    getMyProducts
}