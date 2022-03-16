const mongoose = require('mongoose');
const { deleteProduct, getAllProducts, getLatestProducts, getProductsByCategory, getProduct, postProduct, updateProduc } = require('../services/product');
const { createOrder } = require('../services/order');

//  @route   GET api/product/latest?limit=:limit
//  @desc    Get latest products
//  @access  Public
exports.IgetLatestProducts = async (req, res) => {
    try {
        const limit = req.query.limit;
        const out = await getLatestProducts(limit);
        if (!out) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({ products: out });
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/product/all
//  @desc    Get all products
//  @access  Public
exports.IgetProduct = async (req, res) => {
    try {
        console.log('hit');
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/product/category/:category
//  @desc    Get products by category
//  @access  Public
exports.IgetProductsByCategory = async (req, res) => {
    try {
        const categories = ['electronics', 'clothes', 'cosmetics', 'others'];
        if (!categories.includes(req.params.category)) {
            throw {
                status: 400,
                message: "Invalid category"
            }
        }
        const products = await getProductsByCategory(req.params.category);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/product/:id
//  @desc    Get product by id
//  @access  Public
exports.IgetProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw {
                status: 400,
                message: "Invalid product id"
            }
        }
        const product = await getProduct(productId, 'name price description category orderLimit quantity image');
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   POST api/product
//  @desc    Post product
//  @access  Private
exports.IpostProduct = async (req, res) => {
    try {
        const { name, category, description, price, quantity, orderLimit } = req.body;
        const createdBy = req.user._id;
        const product = await postProduct({
            name, category, description, price, quantity, createdBy, orderLimit
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   PUT api/product/:id
//  @desc    Update product
//  @access  Private
exports.IupdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw {
                status: 400,
                message: "Invalid product id"
            }
        }
        const product = await updateProduct(productId, productData);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   DELETE api/product/:id
//  @desc    Delete product
//  @access  Private
exports.IdeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw {
                status: 400,
                message: "Invalid product id"
            }
        }
        const product = await deleteProduct(productId);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   POST api/product/:id/checkout
//  @desc    place order on product directly
//  @access  Private
exports.IcheckoutProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const addressRef = req.body.address;
        const quantity = req.body.quantity;
        if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(addressRef)) {
            throw {
                status: 400,
                message: "Invalid id"
            }
        }
        if (quantity <= 0) {
            throw {
                status: 400,
                message: "Invalid quantity"
            }
        }
        const product = await getProduct(productId);
        if (quantity > product.orderLimit) {
            throw {
                status: 400,
                message: "Order limit exceeded"
            }
        }
        const order = {
            userRef: req.user._id,
            addressRef,
            products: [{
                product: productId,
                quantity: quantity
            }],
            price: product.price * quantity
        }
        const newOrder = await createOrder(order);
        res.status(200).json({order: newOrder});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}