const User = require('../models/user');
const Product = require('../models/product');

exports.getCart =  async (userRef) => {
    try {
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw {
                message: 'user not found!',
                status: 400
            }
        } else {
            return user.cart;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.addToCart = async (userRef, productRef, quantity) => {
    try {
        if (quantity <= 0) {
            throw {
                message: 'Quantity must be greater than 0',
                status: 400
            }
        }
        const product = await Product.findOne({_id: productRef});
        if (!product) {
            throw {
                message: 'product not found!',
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
            item.quantity += quantity;
        } else {
            user.cart.push({product: productRef, quantity});
        }
        await user.save();
        return user.cart;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.removeFromCart = async (userRef, productRef) => {
    try {
        const product = await Product.findOne({_id: productRef});
        if (!product) {
            throw new Error('product not found!');
        }
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw "user not found!";
        } 
        const item = user.cart.find(item => item.product.toString() === productRef.toString());
        if (item) {
            if (item.quantity > 2) {
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
        return false;
    }
}

exports.resetCart = async (userRef) => {
    try {
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw "user not found!";
        } else {
            user.cart = [];
            await user.save();
            return user.cart;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.checkoutCart = async () => {
    try {
        const user = await User.findOne({_id: userRef});
        if (!user) {
            throw "user not found!";
        } else {
            //  TODO: create a Order object
            user.cart = [];
            await user.save();
            return user.cart;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}