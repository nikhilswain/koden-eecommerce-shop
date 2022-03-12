const { getCart, addToCart, removeFromCart, resetCart, checkoutCart } = require('../services/cart');

//  @route GET api/cart/
//  @desc   Get cart
//  @access Protected
exports.IgetCart = async (req, res) => {
    try {
        const cart = await getCart(req.user._id);
        if (!cart) {
            throw {
                status: 404,
                message: 'User not found!'
            }
        } else {
            res.status(200).json({ cart });
        }
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({ message: error.message });
    }
}

//  @route  POST api/cart/
//  @desc   Add product to cart
//  @access Protected
exports.IaddToCart = async (req, res) => {
    try {
        const userRef = req.user._id;
        const productRef = req.body.product;
        const quantity = req.body.quantity
        if (quantity <= 0) {
            throw {
                status: 400,
                message: 'Quantity must be greater than 0'
            }
        }
        const out = await addToCart(userRef, productRef, quantity);
        if (!out) {
            throw {
                message: 'Action Failed!',
                status: 400
            }
        }
        res.status(200).json({cart: out});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route  DELETE api/cart/
//  @desc   Remove product from cart
//  @access Protected
exports.IremoveFromCart = async (req, res) => {
    try {
        const out = await removeFromCart(req.user._id, req.body.product);
        if (!out) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({cart: out});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route POST api/cart/reset
//  @desc   Reset cart
//  @access Protected
exports.IresetCart = async (req, res) => {
    try {
        const out = await resetCart(req.user._id);
        if (!out) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({cart: out});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route POST api/cart/checkout
//  @desc   Checkout cart
//  @access Protected
exports.Icheckout = async (req, res) => {
    try {
        const out = await checkoutCart(req.user._id);
        if (!out) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({cart: out});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}
