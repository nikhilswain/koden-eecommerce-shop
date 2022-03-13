const mongoose = require('mongoose');
const User = require('../models/user');
const { createOrder } = require('./order');
const Product = require('../models/product');
const Address = require('../models/address');

exports.getCart =  async (userRef) => {
    try {
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw {
                message: 'user not found!',
                status: 400
            }
        } else {
            return {
                cart: user.cart,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            message: error.message,
            status: error.status
        }
    }
}

exports.addToCart = async (userRef, productRef, quantity) => {
    try {
        //  check if userRef & productRef are valid mongoose objects
        if (!mongoose.Types.ObjectId.isValid(userRef) && !mongoose.Types.ObjectId.isValid(productRef)) {
            throw {
                message: 'invalid product',
                status: 404
            }
        }
        if (quantity <= 0) {
            throw {
                message: 'Quantity must be greater than 0',
                status: 400
            }
        }
        const product = await Product.findOne({_id: productRef}, 'name price quantity orderLimit');
        if (!product) {
            throw {
                message: 'product not found!',
                status: 404
            }
        } 
        if (product.orderLimit < quantity ) {
            throw {
                message: 'product order limit is ' + product.orderLimit,
                status: 400
            }
        }
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw {
                message: 'User not found!',
                status: 404
            }
        } 
        const item = user.cart.find(item => item.product.toString() === productRef.toString());
        if (item) {
            if (item.quantity + quantity > product.orderLimit) {
                throw {
                    message: 'product order limit is ' + product.orderLimit,
                    status: 400
                }
            } else {
                item.quantity += quantity;
            }
        } else {
            user.cart.push({product: productRef, quantity});
        }
        await user.save();
        return user.cart;
    } catch (error) {
        console.log(error);
        return {
            message: error.message,
            status: error.status
        }
    }
}

exports.removeFromCart = async (userRef, productRef) => {
    try {
        const product = await Product.findOne({_id: productRef});
        if (!product) {
            throw {
                message: 'Product not found!',
                status: 404
            }
        }
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw {
                message: 'user not found!',
                status: 404
            }
        } 
        const item = user.cart.find(item => item.product.toString() === productRef.toString());
        if (item) {
            if (item.quantity >= 2) {
                item.quantity -= 1;
            } else {
                user.cart.splice(user.cart.indexOf(item), 1);
                // user.cart = user.cart.filter(item => item.product.toString() !== productRef.toString());
            }
        }
        await user.save();
        return user.cart;
    } catch (error) {
        console.log(error);
        return {
            message: error.message,
            status: error.status
        }
    }
}

exports.resetCart = async (userRef) => {
    try {
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw {
                message: 'user not found!',
                status: 404
            }
        } else {
            user.cart = [];
            await user.save();
            return user.cart;
        }
    } catch (error) {
        console.log(error);
        return {
            message: error.message,
            status: error.status
        }
    }
}

exports.checkoutCart = async (userRef, addressRef) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(addressRef) || !mongoose.Types.ObjectId.isValid(userRef)) {
            throw {
                message: 'invalid address or user',
                status: 400
            }
        }
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw {
                message: 'user not found!',
                status: 404
            }
        } 
        if (user.cart.length === 0) {
            throw {
                message: 'cart is empty!',
                status: 400
            }
        }
        //  TODO: create a Order object
        const address = await Address.findOne({_id: addressRef});
        if (!address) {
            throw {
                message: 'address not found!',
                status: 404
            }
        }
        if (address.userRef.toString() !== userRef.toString()) {
            throw {
                message: 'address not belong to user!',
                status: 400
            }
        }
        const price = user.cart.reduce((acc, item) => {
            return acc + item.quantity * item.product.price;
        }, 0);
        const order = {
            userRef,
            addressRef,
            products: user.cart,
            price
        }
        const newOrder = await createOrder(order);
        user.cart = [];
        await user.save();
        return newOrder;
    } catch (error) {
        console.log(error);
        return {
            message: error.message,
            status: error.status
        }
    }
}